import { FileSystemWatcher, Uri, workspace } from "vscode";
import { configMgr, lumberjack } from "../extension";
import { ContextShowOptions, excludePatterns } from "../GlobalConst";

/**
 * Class that represents a file watcher for different file types.
 */
export class FilesWatcher {
    private csWatcher: FileSystemWatcher | undefined;
    private razorWatcher: FileSystemWatcher | undefined;
    private tsWatcher: FileSystemWatcher | undefined;
    private pythonWatcher: FileSystemWatcher | undefined;
    constructor() {
        lumberjack.logWatcher("Watcher created");
    }
    /**
     * Sets the context menu states based on the files in the workspace, or enables the watchers if the context menu states are set to dynamic.
     * @param uriArray The array of URIs to check, usually the result of a workspace.findFiles() call.
     */
    private setAllCtxStates(uriArray: Uri[]) {
        lumberjack.logWatcher(
            `Enabling watchers or setting context menu states`
        );
        // get the configMgr values
        const cs = configMgr.ctxMenuCSharp;
        const razor = configMgr.ctxMenuRazor;
        const ts = configMgr.ctxMenuTypescript;
        const python = configMgr.ctxMenuPython;
        let csFound = false;
        let razorFound = false;
        let tsFound = false;
        let pythonFound = false;
        uriArray.some((uri) => {
            if (uri.fsPath.endsWith(".cs")) {
                csFound = true;
            }
            return csFound;
        });
        uriArray.some((uri) => {
            if (uri.fsPath.endsWith(".cshtml")) {
                razorFound = true;
            }
            return razorFound;
        });
        uriArray.some((uri) => {
            if (uri.fsPath.endsWith(".ts")) {
                tsFound = true;
            }
            return tsFound;
        });
        uriArray.some((uri) => {
            if (uri.fsPath.endsWith(".py")) {
                pythonFound = true;
            }
            return pythonFound;
        });
        if (csFound && cs === ContextShowOptions.dynamic) {
            configMgr.showCSharpCtx();
        } else if (!csFound && cs === ContextShowOptions.dynamic) {
            this.enableCsWatcher();
        } else {
            lumberjack.logWatcher(`Disposing C# watcher`);
            this.csWatcher?.dispose();
        }
        if (razorFound && razor === ContextShowOptions.dynamic) {
            configMgr.showRazorCtx();
        } else if (!razorFound && razor === ContextShowOptions.dynamic) {
            this.enableRazorWatcher();
        } else {
            lumberjack.logWatcher(`Disposing Razor watcher`);
            this.razorWatcher?.dispose();
        }
        if (tsFound && ts === ContextShowOptions.dynamic) {
            configMgr.showTypescriptCtx();
        } else if (!tsFound && ts === ContextShowOptions.dynamic) {
            this.enableTsWatcher();
        } else {
            lumberjack.logWatcher(`Disposing TS watcher`);
            this.tsWatcher?.dispose();
        }
        if (pythonFound && python === ContextShowOptions.dynamic) {
            configMgr.showPythonCtx();
        } else if (!pythonFound && python === ContextShowOptions.dynamic) {
            this.enablePythonWatcher();
        } else {
            lumberjack.logWatcher(`Disposing Python watcher`);
            this.pythonWatcher?.dispose();
        }
        lumberjack.logWatcher(`All context menu states set`);
        lumberjack.logWatcherSuccess(`Watcher is ready to go!`);
    }
    /**
     * Enables the C# file watcher, and sets the context menu state to dynamic if the state is set to dynamic.
     */
    public enableCsWatcher() {
        this.csWatcher = workspace.createFileSystemWatcher("**/*.cs");
        this.csWatcher.onDidChange(() => {
            if (configMgr.ctxMenuCSharp === ContextShowOptions.dynamic) {
                configMgr.showCSharpCtx();
                this.csWatcher?.dispose();
            } else {
                this.csWatcher?.dispose();
            }
        });
        lumberjack.logWatcher("C# watcher enabled");
    }
    /**
     * Enables the Razor file watcher, and sets the context menu state to dynamic if the state is set to dynamic.
     */
    public enableRazorWatcher() {
        this.razorWatcher = workspace.createFileSystemWatcher("**/*.cshtml");
        this.razorWatcher.onDidChange(() => {
            if (configMgr.ctxMenuRazor === ContextShowOptions.dynamic) {
                configMgr.showRazorCtx();
                this.razorWatcher?.dispose();
            } else {
                this.razorWatcher?.dispose();
            }
        });
        lumberjack.logWatcher("Razor watcher enabled");
    }
    /**
     * Enables the TypeScript file watcher, and sets the context menu state to dynamic if the state is set to dynamic.
     */
    public enableTsWatcher() {
        this.tsWatcher = workspace.createFileSystemWatcher("**/*.ts");
        this.tsWatcher.onDidChange(() => {
            if (configMgr.ctxMenuTypescript === ContextShowOptions.dynamic) {
                configMgr.showTypescriptCtx();
                this.tsWatcher?.dispose();
            } else {
                this.tsWatcher?.dispose();
            }
        });
        lumberjack.logWatcher("TS watcher enabled");
    }
    /**
     * Enables the Python file watcher, and sets the context menu state to dynamic if the state is set to dynamic.
     */
    public enablePythonWatcher() {
        this.pythonWatcher = workspace.createFileSystemWatcher("**/*.py");
        this.pythonWatcher.onDidChange(() => {
            if (configMgr.ctxMenuPython === ContextShowOptions.dynamic) {
                configMgr.showPythonCtx();
                this.pythonWatcher?.dispose();
            } else {
                this.pythonWatcher?.dispose();
            }
        });
        lumberjack.logWatcher("Python watcher enabled");
    }
    /**
     * Checks the initial config of all the watchers, or sets the context menu states if the states are set to dynamic.
     */
    public checkCtxConfig() {
        if (
            workspace.workspaceFolders === undefined ||
            workspace.workspaceFolders.length === 0
        ) {
            lumberjack.logWatcherError(
                "No workspace folders found. There is nothing to watch. 🛏️💤"
            );
            return;
        }
        lumberjack.logWatcher(
            "Watcher checking initial config in just a moment"
        );
        const files = workspace.findFiles(
            "**/*",
            `{${excludePatterns.join(",")}}`,
            100
        );
        files.then((uriArray) => {
            this.setAllCtxStates(uriArray);
        });
    }
}

export default FilesWatcher;
