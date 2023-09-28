import { ExtensionContext } from "vscode";
import * as fs from "fs";
import { configs, lumberjack } from "../extension";
import * as vscode from "vscode";
import path from "path";
import { Rated, Settings } from "./Settings";
import { config } from "process";

/**
 * The Warehouse class represents a storage facility for templates and other resources used by the newFile extension and stored in the user's global storage folder.
 */
export class Warehouse {
    ctx: ExtensionContext;
    templatesUser: vscode.Uri;
    templatesEmpty: vscode.Uri;
    templatesValidatorUser: vscode.Uri;
    templatesValidatorOriginal: vscode.Uri;

    // Ex Settings

    settingsPath: vscode.Uri;

    constructor(ctx: ExtensionContext) {
        lumberjack.logInfo("Initializing Warehouse");

        this.ctx = ctx;
        this.templatesUser = vscode.Uri.file(
            path.join(
                ctx.globalStorageUri.fsPath,
                "Templates",
                "Templates.json"
            )
        );
        this.templatesEmpty = vscode.Uri.file(
            path.join(
                ctx.extensionUri.fsPath,
                "src",
                "Templates",
                "TemplatesUser.json"
            )
        );
        this.templatesValidatorUser = vscode.Uri.file(
            path.join(
                ctx.globalStorageUri.fsPath,
                "Templates",
                "Templates.schema.json"
            )
        );
        this.templatesValidatorOriginal = vscode.Uri.file(
            path.join(
                ctx.extensionUri.fsPath,
                "src",
                "Templates",
                "Templates.schema.json"
            )
        );
        this.settingsPath = vscode.Uri.file(
            path.join(ctx.globalStorageUri.fsPath, "Settings.json")
        );
    }
    /**
     * Checks if a file exists at the given URI.
     * @param uri The URI of the file to check.
     * @returns True if the file exists, false otherwise.
     */
    public static fileExists(uri: vscode.Uri): boolean {
        try {
            fs.accessSync(uri.fsPath);
            return true;
        } catch (err) {
            return false;
        }
    }
    /**
     * Writes the original validator schema to the user's global storage folder.
     * Overwrites any existing validator schema file.
     */
    private async writeValidator() {
        await vscode.workspace.fs.copy(
            this.templatesValidatorOriginal,
            this.templatesValidatorUser,
            { overwrite: true }
        );
    }
    /**
     * Deletes the validator schema file from the user's global storage folder.
     */
    private async deleteValidator() {
        await vscode.workspace.fs.delete(this.templatesValidatorUser);
    }

    /**
     * Prompts the user to confirm an action.
     * @param message The message to display to the user.
     * @returns A promise that resolves to the user's response.
     */
    private async askToConfirm(message: string) {
        return await vscode.window.showInformationMessage(message, "Yes", "No");
    }
    /**
     * Opens the user's templates file.
     * If the file does not exist, prompts the user to create it.
     */
    public async openUserTemplates() {
        await this.writeValidator();
        const templatesUserExists = Warehouse.fileExists(this.templatesUser);
        if (templatesUserExists) {
            lumberjack.logInfo(
                `The file ${this.templatesUser} is now being open`
            );
            await vscode.window.showTextDocument(this.templatesUser);
        } else {
            lumberjack.logInfo(
                `The file ${this.templatesUser} does not exist, asking the user to create one`
            );
            const confirm = await this.askToConfirm(
                "Do you want to create user templates file?"
            );
            if (confirm === "Yes") {
                await vscode.workspace.fs.copy(
                    this.templatesEmpty,
                    this.templatesUser
                );
                await vscode.window.showTextDocument(this.templatesUser);
            }
        }
    }
    /**
     * Deletes the user's templates file.
     * If the file does not exist, notifies the user.
     */
    public async deleteUserTemplates() {
        const templatesUserExists = Warehouse.fileExists(this.templatesUser);
        if (templatesUserExists) {
            const confirm = await this.askToConfirm(
                "Do you want to delete user templates file?"
            );
            if (confirm === "Yes") {
                await vscode.workspace.fs.delete(this.templatesUser);
                lumberjack.logInfo("User templates file deleted");
                vscode.window.showWarningMessage("User templates file deleted");
            }
        } else {
            vscode.window.showInformationMessage(
                "User templates file does not exist"
            );
        }
        await this.deleteValidator();
    }
    /**
     * Resets the user's templates file to the default templates.
     * If the file does not exist, creates it.
     */
    public async resetUserTemplates() {
        this.writeValidator();
        const templatesUserExists = Warehouse.fileExists(this.templatesUser);
        if (templatesUserExists) {
            const confirm = await this.askToConfirm(
                "Do you want to reset the user templates file?"
            );
            if (confirm === "Yes") {
                await vscode.workspace.fs.copy(
                    this.templatesEmpty,
                    this.templatesUser,
                    { overwrite: true }
                );
            }
        } else {
            vscode.window.showInformationMessage(
                `User templates file does not exist, creating new one`
            );
            await vscode.workspace.fs.copy(
                this.templatesEmpty,
                this.templatesUser
            );
            vscode.window.showTextDocument(this.templatesUser);
        }
    }
    /**
     * Reads the user's templates file.
     * If the file does not exist, throws an error.
     * @returns A promise that resolves to the contents of the user's templates file as a string.
     */
    public async readUserTemplates(): Promise<string> {
        const templatesUserExists = Warehouse.fileExists(this.templatesUser);
        if (templatesUserExists) {
            const temp = await vscode.workspace.fs.readFile(this.templatesUser);
            const tempString = Buffer.from(temp).toString();
            return tempString;
        } else {
            throw new Error(
                "User templates file does not exist. Please run the command: `Open user templates` and follow the instructions."
            );
        }
    }

    public async getSettings(): Promise<Settings> {
        let settingsExists = Warehouse.fileExists(this.settingsPath);
        if (settingsExists) {
            lumberjack.logInfo(`Reading config file...`);
            let content = await vscode.workspace.fs.readFile(this.settingsPath);
            let settingsAsString = Buffer.from(content).toString();
            let settings = JSON.parse(settingsAsString);
            lumberjack.logInfo(`Done...`);
            return settings as Settings;
        } else {
            lumberjack.logInfo(`No previous config found...`);
            return new Settings();
        }
    }

    public async writeSettings(settings: Settings) {
        lumberjack.logInfo(`Saving config...`);
        await vscode.workspace.fs.writeFile(
            this.settingsPath,
            Buffer.from(JSON.stringify(settings))
        );
        lumberjack.logInfo(`Done...`);
    }
    public async askToRateExtension() {
        if (configs.rated === Rated.later) {
            lumberjack.logInfo("Asking the user to rate the extension");
            const rate = await vscode.window.showInformationMessage(
                "Do you have a minute to rate this extension?",
                "Sure!",
                "Not now",
                "Dot ask again"
            );

            if (rate === "Sure!") {
                lumberjack.logSuccess("Rating!");
            } else {
                lumberjack.logInfo("Not rating:(");
            }
        }
    }
}

export default Warehouse;
