import { ExtensionContext } from "vscode";
import * as fs from "fs";
import { lumberjack } from "../extension";
import * as vscode from "vscode";
import path from "path";

/**
 * The Warehouse class represents a storage facility for templates and other resources used by the newFile extension and stored in the user's global storage folder.
 */
export class Warehouse {
    ctx: ExtensionContext;
    templatesUser: vscode.Uri;
    templatesEmpty: vscode.Uri;
    templatesValidatorUser: vscode.Uri;
    templatesValidatorOriginal: vscode.Uri;
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
        lumberjack.logInfo("Warehouse initialized");
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
            await vscode.window.showTextDocument(this.templatesUser);
        } else {
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
                "Do you want to reset user templates file?"
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
            throw new Error("User templates file does not exist");
        }
    }
}

export default Warehouse;
