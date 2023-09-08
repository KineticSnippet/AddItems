import { Uri, window } from "vscode";
import {
    FileCreatorHelper,
    FileKind,
    SolicitedFile,
} from "./FileCreatorHelper";
import path from "path";
import { lumberjack } from "../extension";
import TemplateParser, {
    Language,
    Template,
} from "../Templates/TemplateParser";
import { Extension } from "../GlobalConst";
import * as vscode from "vscode";

/**
 * The `FileCreator` class provides functionality for creating new files in a specified destination folder.
 */
export class FileCreator {
    /**
     * Creates a new file in the specified destination folder using the provided file kind and template.
     * If no file kind or template is provided, the default file kind and available templates will be used.
     * @param destinationFolder The folder where the new file will be created.
     * @param solicitedFile An optional object containing the language and template labels for the new file.
     * @param item An optional file kind to use for the new file.
     * @returns A Promise that resolves when the new file has been created.
     */
    static async createItem(
        destinationFolder: Uri,
        solicitedFile?: SolicitedFile,
        item?: FileKind
    ) {
        lumberjack.logFileCreatorInfo(`Creating new file`);
        if (item === undefined) {
            item = FileKind.default;
        }
        const wsFolders = vscode.workspace.workspaceFolders;
        if (wsFolders === undefined) {
            throw new Error(`No workspace folders found!`);
        }
        try {
            // If the destination folder is undefined, allow the user to select a folder
            destinationFolder = await FileCreatorHelper.selectWorkspaceFolder(
                destinationFolder
            );
            // All the workspace folders as uris
            const wsFoldersUris = wsFolders.map((folder) => folder.uri);
            // Separate the root folder from the destination folder
            const rootFolder = FileCreatorHelper.getRootFolder(
                destinationFolder,
                wsFoldersUris
            );

            // Remove the rootFolder from the destination folder path
            const localPath =
                destinationFolder.fsPath.replace(rootFolder, "") + path.sep;
            lumberjack.logFileCreatorInfo(`Local path: ${localPath}`);

            // Templates stuff
            let templates: Language[];
            if (item === FileKind.default) {
                templates = await TemplateParser.getTemplates();
            } else {
                templates = await TemplateParser.getTemplatesUser();
            }
            lumberjack.logFileCreatorInfo(`Templates read.`);

            if (templates.length === 0) {
                lumberjack.logFileCreatorError(`No templates found!`);
                throw new Error(`No templates found!`);
            }

            // Language and template selection
            let userSelectedLanguage: Language;
            if (solicitedFile?.languageLabel === undefined) {
                lumberjack.logFileCreatorInfo(
                    `No language selected. Allowing user to select language.`
                );
                userSelectedLanguage = await FileCreatorHelper.selectLanguage(
                    templates
                );
                lumberjack.logFileCreatorInfo(
                    `Language selected: ${userSelectedLanguage.label}`
                );
            } else {
                let solicited = templates.find(
                    (language) => language.label === solicitedFile.languageLabel
                );
                if (solicited) {
                    lumberjack.logFileCreatorInfo(
                        `Language selected: ${solicited.label}, checking if exists in templates.`
                    );
                    userSelectedLanguage = solicited;
                } else {
                    throw new Error(
                        `Unable to find language: ${solicitedFile.languageLabel}`
                    );
                }
            }

            let userSelectedTemplate: Template;
            if (solicitedFile?.templateLabel === undefined) {
                lumberjack.logFileCreatorInfo(
                    `No template selected. Allowing user to select template.`
                );
                userSelectedTemplate = await FileCreatorHelper.selectTemplate(
                    userSelectedLanguage
                );
                lumberjack.logFileCreatorInfo(
                    `Template selected: ${userSelectedTemplate.label}`
                );
            } else {
                lumberjack.logFileCreatorWarning(
                    `Template selected: ${solicitedFile.templateLabel}, checking if exists in templates.`
                );
                let solicited = userSelectedLanguage.templates.find(
                    (template) => template.label === solicitedFile.templateLabel
                );
                if (solicited) {
                    lumberjack.logFileCreatorInfo(
                        `Template selected: ${solicited.label} does exist in templates.`
                    );
                    userSelectedTemplate = solicited;
                } else {
                    throw new Error(
                        `Unable to find template: ${solicitedFile.templateLabel}`
                    );
                }
            }

            // File name selection
            const fileName = await FileCreatorHelper.selectFileName(
                userSelectedTemplate,
                userSelectedLanguage,
                localPath
            );
            lumberjack.logFileCreatorInfo(`File name selected: ${fileName}`);

            /**
             * The user has selected a language, template, and file name.
             * Now we need to create the file.
             */

            lumberjack.logFileCreatorInfo(`Now it's our turn. 😎`);
            let destFolder = FileCreatorHelper.extractPath(
                rootFolder,
                fileName
            );
            lumberjack.logFileCreatorInfo(`Destination folder: ${destFolder}`);
            const baseName = path.basename(fileName);
            lumberjack.logFileCreatorInfo(`Base name: ${baseName}`);
            let filePath = path.join(destFolder, baseName);
            // check if namespace is required
            let nmSpace = "";
            if (
                (userSelectedLanguage.namespace &&
                    userSelectedLanguage.namespace) ||
                userSelectedLanguage.namespace !== false
            ) {
                lumberjack.logFileCreatorInfo(
                    `Namespace is required for this language.`
                );
                nmSpace = await FileCreatorHelper.createNamespace(destFolder);
                lumberjack.logFileCreatorInfo(`Namespace: ${nmSpace}`);
            }
            lumberjack.logFileCreatorInfo(`Creating snippet...`);
            const snippet = FileCreatorHelper.createSnippet(
                userSelectedTemplate.body,
                nmSpace
            );
            lumberjack.logFileCreatorInfo(`Snippet created.`);
            lumberjack.logFileCreatorInfo(`Creating file...`);
            filePath = await FileCreatorHelper.createFile(filePath, snippet);
            /**
             * The file has been created.
             * If the user selected a sibling template, create it.
             */
            if (userSelectedTemplate.siblings) {
                FileCreatorHelper.createSiblingFile(
                    templates,
                    userSelectedTemplate,
                    filePath,
                    nmSpace
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === cancelByUser) {
                    lumberjack.logFileCreatorError(`Cancelled by user.`);
                    lumberjack.logFileCreatorInfo(error.stack!);
                } else if (error.message === `User templates are not valid`) {
                    lumberjack.logFileCreatorError(error.message);
                    lumberjack.logFileCreatorError(
                        `User templates are not valid, please make sure they follow the correct format.`
                    );
                    lumberjack.logFileCreatorWarning(
                        `Running the command "${Extension.id}: Open User Templates" to open the user templates file, please note, this command will restore the JSON validator file, this will remove any customizations you have made to the file. \n Run the command "${Extension.id}: Restore user templates" to restore the file to it's original state. \n If you have made any customizations to the file, please make sure to back them up before running the command.`
                    );
                    window
                        .showErrorMessage(
                            `Error creating file, please see the output channel for more details.`,
                            `Open Output Channel`
                        )
                        .then((value) => {
                            if (value === `Open Output Channel`) {
                                lumberjack.showConsole();
                            }
                        });
                } else {
                    if (error instanceof Error) {
                        lumberjack.logFileCreatorError(error.message);
                    }
                    window
                        .showErrorMessage(
                            `Error creating file, please see the output channel for more details.`,
                            `Open Output Channel`
                        )
                        .then((value) => {
                            if (value === `Open Output Channel`) {
                                lumberjack.showConsole();
                            }
                        });
                }
            }
        }
    }
}

export default FileCreator;

export const cancelByUser = `Cancelled by user`;
