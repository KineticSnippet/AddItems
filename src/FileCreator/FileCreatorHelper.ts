import path from "path";
import { SnippetString, Uri, window, workspace } from "vscode";
import { NormalizationOptions, regex } from "../GlobalConst";
import { configMgr, lumberjack } from "../extension";
import { Language, Template } from "../Templates/TemplateParser";
import { cancelByUser } from "./FileCreator";

/**
 * A helper class for creating files in a workspace folder.
 */
export class FileCreatorHelper {
    static getRootFolder(destinationFolder: Uri, wsFoldersUris: Uri[]) {
        let rootFolder = "";
        const desFolder = destinationFolder.fsPath + path.sep;
        wsFoldersUris.forEach((folder) => {
            const folderPath = folder.fsPath + path.sep;
            if (desFolder.startsWith(folderPath)) {
                rootFolder = folderPath;
            }
        });
        // remove the trailing path separator
        rootFolder = rootFolder.slice(0, -1);
        return rootFolder;
    }
    /**
     * Prompts the user to select a workspace folder from the currently open workspace folders.
     * If there is only one folder open, it will be automatically selected.
     * @returns A Promise that resolves to the URI of the selected workspace folder.
     * @throws An error if there are no workspace folders open or if the user cancels the selection.
     */
    static async selectWorkspaceFolder(des: Uri): Promise<Uri> {
        if (des === undefined) {
            const folders = workspace.workspaceFolders;
            if (folders === undefined || folders.length === 0) {
                window.showErrorMessage("You have no workspace folders open!");
                throw new Error("You have no workspace folders open!");
            } else if (folders.length === 1) {
                return folders[0].uri;
            } else {
                const selectedFolder = await window.showWorkspaceFolderPick({
                    ignoreFocusOut: true,
                    placeHolder: `Select the destination folder for your new item`,
                });
                if (selectedFolder === undefined) {
                    throw new Error(cancelByUser);
                }
                return selectedFolder.uri;
            }
        } else {
            lumberjack.logFileCreatorInfo(
                `Folder already selected: ${des.fsPath}`
            );
            return des;
        }
    }
    /**
     * Prompts the user to select a language from a list of available languages.
     * @param templates An array of Language objects representing the available languages.
     * @returns A Promise that resolves to the selected Language object.
     * @throws An error if the user cancels the selection.
     */
    static async selectLanguage(templates: Language[]): Promise<Language> {
        const userLanguage = await window.showQuickPick(
            templates
                .map((lang) => {
                    return {
                        label: lang.label,
                        // description: must be total count of templates in the language
                        description: `${lang.templates.length.toString()} templates`,
                        detail: lang.description,
                    };
                })
                .sort((a, b) => {
                    return a.label.localeCompare(b.label);
                }),
            {
                placeHolder: `Please select a language`,
                ignoreFocusOut: true,
                canPickMany: false,
                matchOnDescription: true,
                matchOnDetail: true,
                title: "Select a language",
            }
        );
        const selectedLanguage = templates.find(
            (lang) => lang.label === userLanguage?.label
        );
        if (selectedLanguage === undefined) {
            throw new Error(cancelByUser);
        }
        return selectedLanguage;
    }
    /**
     * Prompts the user to select a template from a list of available templates for the given language.
     * @param language A Language object representing the language for which to select a template.
     * @returns A Promise that resolves to the selected Template object.
     * @throws An error if the user cancels the selection.
     */
    static async selectTemplate(language: Language): Promise<Template> {
        // Allow user to select template from the selected language
        const userTemplate = await window.showQuickPick(
            language.templates
                .map((template) => {
                    const ext =
                        template.extensionName === undefined
                            ? language.extensionName
                            : template.extensionName;
                    // remove the period from the extension ext
                    ext.replace(".", "");
                    return {
                        label: template.label,
                        description: ext,
                        detail: template.description,
                    };
                })
                .sort((a, b) => {
                    return a.label.localeCompare(b.label);
                }),
            {
                placeHolder: `Please select a template`,
                ignoreFocusOut: true,
                canPickMany: false,
                matchOnDescription: true,
                matchOnDetail: true,
                title: "Select a template",
            }
        );
        const selectedTemplate = language.templates.find(
            (template) => template.label === userTemplate?.label
        );
        if (selectedTemplate === undefined) {
            throw new Error(cancelByUser);
        }
        return selectedTemplate;
    }
    /**
     * Prompts the user to enter a fancy name for their new file, based on the given template and language.
     * @param userTemplate The Template object representing the selected template.
     * @param userLanguage The Language object representing the selected language.
     * @returns A Promise that resolves to the user-entered file name, with the appropriate extension.
     * @throws An error if the user cancels the selection or enters an invalid file name.
     */
    static async selectFileName(
        userTemplate: Template,
        userLanguage: Language,
        location: string
    ): Promise<string> {
        // Prepare the file extension
        let ext =
            userTemplate.extensionName === undefined
                ? userLanguage.extensionName
                : userTemplate.extensionName;
        if (ext === undefined) {
            ext = "txt";
        }
        if (!ext.startsWith(".")) {
            ext = "." + ext;
        }

        // Remove the path separator from the beginning of the location string
        if (location.startsWith(path.sep)) {
            location = location.slice(1);
        }

        // Get the start and end indices of the filename in the location string
        const startIndex = location.length;
        const endIndex = location.length + userTemplate.filename.length;

        // Allow user to enter a fancy name for their new file
        const fileName = await window.showInputBox({
            prompt: "Please enter a fancy name for your new file",
            ignoreFocusOut: true,
            value: location + userTemplate.filename + ext,
            valueSelection: [startIndex, endIndex],
            validateInput: (input) => {
                if (input === undefined) {
                    return "No file name entered!";
                }
                if (!regex.fileNameValidator.test(input)) {
                    return "Only letters, numbers, periods, hyphens, underscores, and path separators are allowed, and the file name must have an extension!";
                }
                return undefined;
            },
        });
        if (fileName === undefined) {
            throw new Error(cancelByUser);
        }
        // regex to remove multiple periods
        return fileName;
    }
    /**
     * Extracts the path from a given destination folder and filename.
     * @param destinationFolder The destination folder to extract the path from.
     * @param filename The filename to extract the path from.
     * @returns The extracted path as a string, without a trailing path separator.
     */
    static extractPath(destinationFolder: string, filename: string): string {
        let folderPath = path.normalize(destinationFolder);
        let folderName = path.join(folderPath, filename);

        folderName = folderName.normalize();
        folderName = path.dirname(folderName);
        if (folderName.endsWith("/") || folderName.endsWith("\\")) {
            folderName = folderName.slice(0, -1);
        }
        return folderName;
    }
    /**
     * Converts an array of strings into a single string, with each element separated by a newline character.
     * @param stringArray The array of strings to be converted.
     * @returns A single string with each element of the input array separated by a newline character.
     */
    private static convertStringArrayToString(stringArray: string[]): string {
        let string = "";
        stringArray.forEach((element) => {
            string += element + "\n";
        });
        return string;
    }
    /**
     * Replaces all occurrences of the namespace pattern in the given snippet string with the provided namespace.
     * @param snippetString The snippet string to modify.
     * @param namespace The namespace to replace the namespace pattern with.
     * @returns The modified snippet string with the namespace pattern replaced.
     */
    private static placeNamespace(
        snippetSting: string,
        namespace: string
    ): string {
        return snippetSting.replace(regex.namespacePattern, namespace);
    }

    /**
     * Creates a SnippetString object from an array of strings and a namespace string.
     * @param body An array of strings representing the body of the snippet.
     * @param namespaceString A string representing the namespace to be inserted into the snippet.
     * @returns A SnippetString object with the body of the snippet and the namespace inserted.
     */
    static createSnippet(
        body: string[],
        namespaceString: string
    ): SnippetString {
        const bodyString = this.convertStringArrayToString(body);
        let snippetString = this.placeNamespace(bodyString, namespaceString);
        snippetString = this.placeAdditionalLines(snippetString);
        return new SnippetString(snippetString);
    }
    /**
     * Insert additional lines to the top of the file, in case the user specified at least one
     * @param snippetString the original snippet, as a string.
     * @returns A modified snippet, with all the requested usings, or top lines
     */
    static placeAdditionalLines(snippetString: string): string {
        let usings = configMgr.csharpUsings; // User usings,
        if (usings.length === 0) {
            return snippetString;
        } else {
            let usingString = ""; // hold all the lines, in the snippet format
            usings.forEach((us) => {
                usingString += us + "\n";
            });
            return usingString + snippetString;
        }
    }
    /**
     * Creates a namespace directory string from a given target path.
     * @param target The target path to create the namespace directory from.
     * @returns The namespace directory string derived from the target path.
     */
    private static async createNamespaceDir(target: string): Promise<string> {
        target = path.normalize(target);
        // add a path separator to the end of the target if it doesn't have one
        if (!target.endsWith(path.sep)) {
            target += path.sep;
        }
        // we ensure that the target is normalized and ends with a path separator
        let parentPath = "";
        let parentName = "";
        let foundProject = false;

        let projectsPaths = await workspace
            .findFiles("**/*.csproj" || "**/*.fsproj")
            .then((uris) => {
                return uris.map((uri) => {
                    return path.dirname(uri.fsPath) + path.sep;
                });
            });
        projectsPaths.forEach((project) => {
            if (target.startsWith(project)) {
                parentPath = project;
                parentName = path.basename(project);
                foundProject = true;
                return;
            }
        });
        if (foundProject === false) {
            let workspaceFolders = workspace.workspaceFolders;
            if (workspaceFolders === undefined) {
                throw new Error("No workspace folders open!");
            }
            let foldersPaths = workspaceFolders.map((folder) => {
                return path.normalize(folder.uri.fsPath);
            });
            foldersPaths.forEach((folder) => {
                if (!folder.endsWith(path.sep)) {
                    folder += path.sep;
                }
            });
            foldersPaths.forEach((folder) => {
                if (target.startsWith(folder)) {
                    parentPath = folder;
                    foundProject = true;
                    parentName = path.basename(folder);
                    return;
                }
            });
        }
        let namespaceDir = target.replace(parentPath, "");
        namespaceDir = path.join(parentName, namespaceDir);
        return namespaceDir;
    }

    /**
     * Converts a directory path to a namespace string.
     * @param dir The directory path to convert.
     * @returns The namespace string derived from the directory path.
     */
    private static dirToNamespace(dir: string): string {
        dir = path.normalize(dir); // normalize the path
        dir = dir.replace(/\s/g, ""); // remove all whitespace
        if (dir.startsWith(`\\`) || dir.startsWith(`/`)) {
            dir = dir.slice(1); // remove the first character if it is a path separator
        }
        if (dir.endsWith(`\\`) || dir.endsWith(`/`)) {
            dir = dir.slice(0, -1); // remove the last character if it is a path separator
        }
        dir = this.normalizePath(dir);
        dir = dir.replace(regex.pathSepRegex, ".");
        return dir;
    }
    private static normalizePath(path: string): string {
        const normalization = configMgr.normalizeNamespaces;
        let normalizedPath = path;
        if (
            normalization === NormalizationOptions.none ||
            normalization === undefined
        ) {
            normalizedPath = path;
        } else if (normalization === NormalizationOptions.remove) {
            normalizedPath = path.replace(regex.namespaceValidator, "");
        } else if (normalization === NormalizationOptions.replace) {
            normalizedPath = path.replace(regex.namespaceValidator, "_");
        }
        return normalizedPath;
    }

    /**
     * Creates a namespace string from the given directory path.
     * @param dir The directory path to create the namespace from.
     * @returns A Promise that resolves to the namespace string.
     */
    static async createNamespace(dir: string): Promise<string> {
        const nameSp = await this.createNamespaceDir(dir);
        const namespace = this.dirToNamespace(nameSp);
        return namespace;
    }
    /**
     * Checks if a file exists at the given directory path.
     * @param dir The directory path to check for the existence of a file.
     * @returns A Promise that resolves to a boolean indicating whether a file exists at the given directory path.
     */
    static async checkFileExists(dir: string): Promise<boolean> {
        try {
            const stat = await workspace.fs.stat(Uri.file(dir));
            if (stat.type === 1) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    /**
     * Creates a new file with the given base name and snippet content in the specified destination folder.
     * @param filePath The destination folder where the file will be created.
     * @param baseName The base name of the file to be created.
     * @param snippet The snippet content to be inserted into the new file.
     */
    static async createFile(
        filePath: string,
        snippet: SnippetString
    ): Promise<string> {
        // check if file exists, if so, add a number to the end
        let index = 0;
        filePath = path.normalize(filePath);
        // if the path contains multiple periods, replace them with a single period
        filePath = filePath.replace(/\.{2,}/g, ".");
        let fileExists = await FileCreatorHelper.checkFileExists(filePath);
        let destFolder = path.dirname(filePath);
        let extName = path.extname(filePath);
        let baseName = path.basename(filePath, extName);
        while (fileExists) {
            lumberjack.logWarning(
                `File ${filePath} already exists, trying with a different name.`
            );
            index++;
            filePath = path.join(destFolder, baseName + index + extName);
            // we don't want to get stuck in an infinite loop
            if (index > 10) {
                throw new Error(`Unable to create file, too many attempts.`);
            }
            lumberjack.logWarning(`Trying ${filePath}`);
            fileExists = await FileCreatorHelper.checkFileExists(filePath);
        }
        lumberjack.logInfo(`Creating file: ${filePath}`);
        await workspace.fs.writeFile(
            Uri.file(filePath),
            new Uint8Array(Buffer.from(``))
        );
        let doc = await window.showTextDocument(Uri.file(filePath));
        doc.insertSnippet(snippet);
        return filePath;
    }
    /**
     * Creates a secondary file for the given template and namespace.
     * @param languageArray The array of Language objects representing the available languages.
     * @param userSelectedTemplate The Template object representing the selected template.
     * @param parentPath The path of the parent file.
     * @param nmSpace The namespace string to be inserted into the new file, if applicable.
     */
    static createSiblingFile(
        languageArray: Language[],
        userSelectedTemplate: Template,
        parentPath: string,
        nmSpace: string
    ) {
        lumberjack.logFileCreatorWarning(
            `Sibling template found. Creating sibling file.`
        );
        const siblingLang = languageArray.find(
            (languages) =>
                languages.label === userSelectedTemplate.siblings?.languageLabel
        );
        if (siblingLang) {
            const siblingTemplate = siblingLang.templates.find(
                (template) =>
                    template.label ===
                    userSelectedTemplate.siblings?.templateLabel
            );
            if (siblingTemplate) {
                lumberjack.logFileCreatorInfo(
                    `Creating sibling file: ${siblingTemplate.label}`
                );
                // the parent path is the path of the file that was just created
                let siblingPath = path.dirname(parentPath);
                // the the name of the file that was just created, without the extension
                let siblingBaseName = "";
                if (userSelectedTemplate.siblings?.overrideName === true) {
                    siblingBaseName = siblingTemplate.filename;
                } else {
                    siblingBaseName = path.basename(parentPath); // remove the extension
                    // Remove the extension from the siblingBaseName
                    let currentExt = path.extname(siblingBaseName);
                    siblingBaseName = siblingBaseName.split(currentExt)[0];
                }
                // the extension of the sibling file
                let siblingFileExtension = siblingTemplate.extensionName
                    ? siblingTemplate.extensionName
                    : siblingLang.extensionName;
                if (siblingFileExtension === undefined) {
                    siblingFileExtension = path.extname(parentPath);
                }
                // the full path of the sibling file
                let additionalPath = "";
                if (userSelectedTemplate.siblings?.parentUri !== undefined) {
                    additionalPath = userSelectedTemplate.siblings.parentUri;
                }
                let siblingFilePath = path.join(
                    siblingPath,
                    additionalPath,
                    siblingBaseName + `.` + siblingFileExtension
                );
                siblingFilePath = path.normalize(siblingFilePath);
                lumberjack.logFileCreatorInfo(
                    `Creating snippet for sibling file: ${siblingTemplate.label}`
                );
                const siblingSnippet = FileCreatorHelper.createSnippet(
                    siblingTemplate.body,
                    nmSpace
                );

                lumberjack.logFileCreatorInfo(
                    `Creating sibling file: ${siblingFilePath}`
                );
                FileCreatorHelper.createFile(siblingFilePath, siblingSnippet);
                lumberjack.logFileCreatorSuccess(
                    `Sibling file created: ${siblingFilePath}`
                );
            } else {
                throw new Error(
                    `Unable to find sibling template: ${userSelectedTemplate.siblings?.templateLabel}`
                );
            }
        } else {
            throw new Error(
                `Unable to find sibling template: ${userSelectedTemplate.siblings?.languageLabel}`
            );
        }
    }
}
/**
 * Represents a file that is being solicited from the user, including the language and template labels.
 */
export interface SolicitedFile {
    /**
     * The label of the language for the file.
     */
    languageLabel: string;
    /**
     * The optional label of the template for the file.
     */
    templateLabel?: string;
}

/**
 * Represents the kind of file being created.
 */
export const enum FileKind {
    /**
     * The default file kind.
     */
    default,
    /**
     * A file created by the user.
     */
    user,
}
