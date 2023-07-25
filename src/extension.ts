import * as vscode from "vscode";
import Lumberjack from "./Lumberjack/Lumberjack";
import FilesWatcher from "./Configs/Watcher";
import ConfigManager from "./Configs/ConfigManager";
import Commands from "./Commands";
import { Extension } from "./GlobalConst";
import Warehouse from "./Warehouse/Warehouse";

export const lumberjack = new Lumberjack(Extension.id);
export const configMgr = new ConfigManager();
export const watcher = new FilesWatcher();
export let warehouse: Warehouse;

/**
 * Activates the extension and registers all commands.
 * @param ctx The extension context.
 */
export function activate(ctx: vscode.ExtensionContext) {
    lumberjack.logInfo(`Activating extension ${Extension.id}`);
    Commands.registerAllCommands(ctx);
    watcher.checkCtxConfig();
    lumberjack.logSuccess(`Extension ${Extension.id} activated`);
    warehouse = new Warehouse(ctx);
}
