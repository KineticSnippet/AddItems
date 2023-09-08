import * as vscode from "vscode";

/**
 * A class that handles logging to a VSCode output channel.
 * @param projectName The name of the project that the Lumberjack is logging for.
 * @param language The language of the project that the Lumberjack is logging for, defaults to markdown.
 */
export class Lumberjack {
    logCommandFinished(arg0: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.commandSuccess} Command: ${arg0} finished`
        );
    }
    showConsole() {
        this.consoleChannel.show();
    }
    private consoleChannel: vscode.OutputChannel;

    constructor(projectName: string, language: string = "markdown") {
        this.consoleChannel = vscode.window.createOutputChannel(
            projectName,
            language
        );
        this.logInfo(`Lumberjack initialized for ${projectName}`);
    }
    logCommand(command: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.command} Command: ${command} was called`
        );
    }
    logError(error: Error | string) {
        if (error instanceof Error) {
            this.consoleChannel.appendLine(
                `${jackPrefixes.infoError} ${error}`
            );
            this.consoleChannel.appendLine(`Stack trace:`);
            this.consoleChannel.appendLine(error.stack ?? "");
        } else {
            this.consoleChannel.appendLine(
                `${jackPrefixes.infoError} ${error}`
            );
        }
    }
    logInfo(info: string) {
        this.consoleChannel.appendLine(`${jackPrefixes.infoOk} ${info}`);
    }
    logWarning(warning: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.infoWarning} ${warning}`
        );
    }
    logConfig(config: string) {
        this.consoleChannel.appendLine(`${jackPrefixes.configOk} ${config}`);
    }
    logConfigError(error: Error | string) {
        this.consoleChannel.appendLine(`${jackPrefixes.configError} ${error}`);
        this.consoleChannel.appendLine(``);
    }
    logConfigSuccess(message: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.infoSuccess} ${message}`
        );
        this.consoleChannel.appendLine(``);
    }
    logWatcher(watcher: string) {
        this.consoleChannel.appendLine(`${jackPrefixes.watcher} ${watcher}`);
    }
    logWatcherError(error: Error | string) {
        this.consoleChannel.appendLine(`${jackPrefixes.watcherError} ${error}`);
        this.consoleChannel.appendLine(``);
    }
    logWatcherSuccess(success: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.watcherSuccess} ${success}`
        );
        this.consoleChannel.appendLine(``);
    }
    logSuccess(success: string) {
        this.consoleChannel.appendLine(
            `${jackPrefixes.infoSuccess} ${success}`
        );
        this.consoleChannel.appendLine(``);
    }
    logFileCreatorInfo(info: string) {
        this.consoleChannel.appendLine(`${fileCreatorPrefixes.infoOk} ${info}`);
    }
    logFileCreatorError(error: Error | string) {
        this.consoleChannel.appendLine(
            `${fileCreatorPrefixes.infoError} ${error}`
        );
        this.consoleChannel.appendLine(``);
    }
    logFileCreatorWarning(warning: string) {
        this.consoleChannel.appendLine(
            `${fileCreatorPrefixes.infoWarning} ${warning}`
        );
    }
    logFileCreatorSuccess(success: string) {
        this.consoleChannel.appendLine(
            `${fileCreatorPrefixes.infoSuccess} ${success}`
        );
        this.consoleChannel.appendLine(``);
    }
}

export default Lumberjack;

const jackPrefixes = {
    infoOk: `>${new Date().toLocaleString()}-[🟢] `,
    infoError: `>${new Date().toLocaleString()}-[🔴] `,
    infoWarning: `>${new Date().toLocaleString()}-[🟡] `,
    infoSuccess: `>${new Date().toLocaleString()}-[🥳🎉🎊] `,

    command: `>${new Date().toLocaleString()}-[🤖🔵] `,
    commandError: `>${new Date().toLocaleString()}-[🤖🔴] `,
    commandWarning: `>${new Date().toLocaleString()}-[🤖🟡] `,
    commandSuccess: `>${new Date().toLocaleString()}-[🤖🟢] `,

    configOk: `>${new Date().toLocaleString()}-[⚒️] `,
    configError: `>${new Date().toLocaleString()}-[⚒️🔴] `,
    configWarning: `>${new Date().toLocaleString()}-[⚒️🟡] `,

    watcher: `>${new Date().toLocaleString()}-[🔎] `,
    watcherError: `>${new Date().toLocaleString()}-[🧑‍🦯] `,
    watcherSuccess: `>${new Date().toLocaleString()}-[😎] `,
};

export const fileCreatorPrefixes = {
    infoOk: `>${new Date().toLocaleString()}-[📑] `,
    infoError: `>${new Date().toLocaleString()}-[🔴 🥺] `,
    infoWarning: `>${new Date().toLocaleString()}-[📑 😯] `,
    infoSuccess: `>${new Date().toLocaleString()}-[📑 💪] `,
};
