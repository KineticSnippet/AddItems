import * as vscode from "vscode";
import Lumberjack from "./Lumberjack/Lumberjack";
import FilesWatcher from "./Configs/Watcher";
import ConfigManager from "./Configs/ConfigManager";
import Commands from "./Commands";
import { Extension } from "./GlobalConst";
import Warehouse from "./Warehouse/Warehouse";
import { Settings } from "./Warehouse/Settings";

export const lumberjack = new Lumberjack(Extension.id);
export const configMgr = new ConfigManager();
export const watcher = new FilesWatcher();
export let warehouse: Warehouse;
export let configs: Settings;

/**
 * Activates the extension and registers all commands.
 * @param ctx The extension context.
 */
export async function activate(ctx: vscode.ExtensionContext) {
    lumberjack.logInfo(`Activating extension ${Extension.id}`);

    // Register commands
    Commands.registerAllCommands(ctx);

    // Check initial config (vscode)
    watcher.checkCtxConfig();

    // Check internal settings
    warehouse = new Warehouse(ctx);
    configs = await warehouse.getSettings();

    lumberjack.logSuccess(`Extension ${Extension.id} activated`);
}
