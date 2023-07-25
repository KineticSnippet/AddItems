import { WorkspaceConfiguration, commands, workspace } from "vscode";
import {
    ContextShowOptions,
    Extension,
    NormalizationOptions,
    configEntry,
    configKeys,
} from "../GlobalConst";
import { watcher, lumberjack } from "../extension";

/**
 * The `ConfigManager` class is responsible for managing the extension's configuration settings.
 */
export class ConfigManager {
    private previousConfig: WorkspaceConfiguration | undefined;
    constructor() {
        lumberjack.logConfig("Initializing ConfigManager");
        this.loadConfiguration();
        this.applyStartupConfiguration();
        this.registerConfigurationListener();
        lumberjack.logConfig("ConfigManager initialized");
    }
    private loadConfiguration() {
        const currentConfig = workspace.getConfiguration(Extension.id);
        if (this.previousConfig) {
            const changedProperties = this.getChangedConfigurationProperties(
                this.previousConfig,
                currentConfig
            );
            if (changedProperties.length > 0) {
                this.applyConfiguration(changedProperties, currentConfig);
            }
        }
        this.previousConfig = currentConfig;
    }
    private registerConfigurationListener() {
        lumberjack.logConfig("Registering configuration listener");
        workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration(Extension.id)) {
                lumberjack.logConfig("Configuration affected");
                this.loadConfiguration();
            }
        });
    }

    /**
     * Applies the startup configuration by setting the context values for the extension's menu items.
     */
    private applyStartupConfiguration() {
        lumberjack.logConfig("Applying startup configuration");
        const showCustoms = this.ctxMenuCustoms;
        const showCSharp = this.ctxMenuCSharp;
        const showRazor = this.ctxMenuRazor;
        const showTypescript = this.ctxMenuTypescript;
        const showPython = this.ctxMenuPython;
        lumberjack.logConfig(
            `showCustoms: ${showCustoms}, showCSharp: ${showCSharp}, showRazor: ${showRazor}, showTypescript: ${showTypescript}, showPython: ${showPython}`
        );
        commands.executeCommand(
            "setContext",
            configEntry.showCustoms,
            showCustoms
        );
        commands.executeCommand(
            "setContext",
            configEntry.showCsharp,
            showCSharp === ContextShowOptions.always ? true : false
        );
        commands.executeCommand(
            "setContext",
            configEntry.showRazor,
            showRazor === ContextShowOptions.always ? true : false
        );
        commands.executeCommand(
            "setContext",
            configEntry.showTypescript,
            showTypescript === ContextShowOptions.always ? true : false
        );
        commands.executeCommand(
            "setContext",
            configEntry.showPython,
            showPython === ContextShowOptions.always ? true : false
        );
    }

    /**
     * Returns an array of configuration properties that have changed between the previous and current configurations.
     * @param previousConfig The previous configuration.
     * @param currentConfig The current configuration.
     * @returns An array of configuration properties that have changed.
     */
    private getChangedConfigurationProperties(
        previousConfig: WorkspaceConfiguration,
        currentConfig: WorkspaceConfiguration
    ): string[] {
        lumberjack.logConfig("Getting changed configuration properties");
        const changedProperties: string[] = [];
        if (
            previousConfig.get(configKeys.ctxMenuCustoms) !==
            currentConfig.get(configKeys.ctxMenuCustoms)
        ) {
            lumberjack.logConfig("ctxMenuCustoms changed");
            changedProperties.push(configKeys.ctxMenuCustoms);
        }
        if (
            previousConfig.get(configKeys.ctxMenuCsharp) !==
            currentConfig.get(configKeys.ctxMenuCsharp)
        ) {
            lumberjack.logConfig("ctxMenuCsharp changed");
            changedProperties.push(configKeys.ctxMenuCsharp);
        }
        if (
            previousConfig.get(configKeys.ctxMenuRazor) !==
            currentConfig.get(configKeys.ctxMenuRazor)
        ) {
            lumberjack.logConfig("ctxMenuRazor changed");
            changedProperties.push(configKeys.ctxMenuRazor);
        }
        if (
            previousConfig.get(configKeys.ctxMenuTypescript) !==
            currentConfig.get(configKeys.ctxMenuTypescript)
        ) {
            lumberjack.logConfig("ctxMenuTypescript changed");
            changedProperties.push(configKeys.ctxMenuTypescript);
        }
        if (
            previousConfig.get(configKeys.ctxMenuPython) !==
            currentConfig.get(configKeys.ctxMenuPython)
        ) {
            lumberjack.logConfig("ctxMenuPython changed");
            changedProperties.push(configKeys.ctxMenuPython);
        }
        if (
            previousConfig.get(configKeys.ctxNamespaceNormalizations) !==
            currentConfig.get(configKeys.ctxNamespaceNormalizations)
        ) {
            lumberjack.logConfig("ctxNamespaceNormalizations changed");
            changedProperties.push(configKeys.ctxNamespaceNormalizations);
        }
        lumberjack.logConfig("Changed configuration properties found");
        for (const property of changedProperties) {
            lumberjack.logConfig(property);
        }
        return changedProperties;
    }
    /**
     * Applies the configuration changes to the extension.
     * @param changedProperties The array of configuration properties that have changed.
     * @param configuration The current configuration, if any.
     */
    private applyConfiguration(
        changedProperties: string[],
        configuration: WorkspaceConfiguration
    ) {
        for (const property of changedProperties) {
            switch (property) {
                case configKeys.ctxMenuCustoms:
                    const contextMenuShortcutCustomsValue = configuration.get(
                        configKeys.ctxMenuCustoms
                    );
                    commands.executeCommand(
                        "setContext",
                        configEntry.showCustoms,
                        contextMenuShortcutCustomsValue
                    );
                    lumberjack.logConfig(
                        `ctxMenuCustoms: ${contextMenuShortcutCustomsValue}`
                    );
                    break;
                case configKeys.ctxMenuCsharp:
                    const contextMenuShortcutCSharpValue = configuration.get(
                        configKeys.ctxMenuCsharp
                    );
                    if (contextMenuShortcutCSharpValue === "Always") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showCsharp,
                            true
                        );
                    } else if (contextMenuShortcutCSharpValue === "Never") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showCsharp,
                            false
                        );
                    } else {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showCsharp,
                            false
                        );
                        watcher.checkCtxConfig();
                        lumberjack.logWarning(`Done changing C# context`);
                    }
                    break;
                case configKeys.ctxMenuRazor:
                    const contextMenuShortcutRazorValue = configuration.get(
                        configKeys.ctxMenuRazor
                    );
                    if (contextMenuShortcutRazorValue === "Always") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showRazor,
                            true
                        );
                    } else if (contextMenuShortcutRazorValue === "Never") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showRazor,
                            false
                        );
                    } else {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showRazor,
                            false
                        );
                        watcher.checkCtxConfig();
                    }
                    lumberjack.logWarning(`Done changing Razor context`);
                    break;
                case configKeys.ctxMenuTypescript:
                    const contextMenuShortcutTypescriptValue =
                        configuration.get(configKeys.ctxMenuTypescript);
                    commands.executeCommand(
                        "setContext",
                        configEntry.showTypescript,
                        contextMenuShortcutTypescriptValue
                    );
                    if (contextMenuShortcutTypescriptValue === "Always") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showTypescript,
                            true
                        );
                    } else if (contextMenuShortcutTypescriptValue === "Never") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showTypescript,
                            false
                        );
                    } else {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showTypescript,
                            false
                        );
                        watcher.checkCtxConfig();
                    }
                    lumberjack.logWarning(`Done changing TypeScript context`);
                    break;
                case configKeys.ctxMenuPython:
                    const contextMenuShortcutPythonValue = configuration.get(
                        configKeys.ctxMenuPython
                    );
                    if (contextMenuShortcutPythonValue === "Always") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showPython,
                            true
                        );
                    }
                    if (contextMenuShortcutPythonValue === "Never") {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showPython,
                            false
                        );
                    } else {
                        commands.executeCommand(
                            "setContext",
                            configEntry.showPython,
                            false
                        );
                        watcher.checkCtxConfig();
                    }
                    lumberjack.logWarning(`Done changing Python context`);
                    break;
                case configKeys.ctxNamespaceNormalizations:
                    lumberjack.logConfig(
                        `ctxNamespaceNormalizations: ${configuration.get(
                            configKeys.ctxNamespaceNormalizations
                        )}`
                    );
                    break;
                default:
                    lumberjack.logConfigError(
                        `Configuration property ${property} not found \n` +
                            `This is a bug, please report it at \n` +
                            `https://github.com/kineticSnippet/newFile`
                    );
                    break;
            }
        }
        lumberjack.logConfigSuccess("Configuration applied");
    }
    /**
     * Returns the value of the `ctxMenuCustoms` configuration property.
     */
    get ctxMenuCustoms(): boolean {
        return workspace
            .getConfiguration(Extension.id)
            .get(configKeys.ctxMenuCustoms, false);
    }
    /**
     * Returns the value of the `ctxMenuCsharp` configuration property.
     */
    get ctxMenuCSharp(): ContextShowOptions {
        return workspace
            .getConfiguration(Extension.id)
            .get(configKeys.ctxMenuCsharp, ContextShowOptions.dynamic);
    }
    /**
     * Returns the value of the `ctxMenuRazor` configuration property.
     */
    get ctxMenuRazor(): ContextShowOptions {
        return workspace
            .getConfiguration(Extension.id)
            .get(configKeys.ctxMenuRazor, ContextShowOptions.dynamic);
    }
    /**
     * Returns the value of the `ctxMenuTypescript` configuration property.
     */
    get ctxMenuTypescript(): ContextShowOptions {
        return workspace
            .getConfiguration(Extension.id)
            .get(configKeys.ctxMenuTypescript, ContextShowOptions.dynamic);
    }
    /**
     * Returns the value of the `ctxMenuPython` configuration property.
     */
    get ctxMenuPython(): ContextShowOptions {
        return workspace
            .getConfiguration(Extension.id)
            .get(configKeys.ctxMenuPython, ContextShowOptions.dynamic);
    }
    /**
     * Returns the value of the `ctxNamespaceNormalizations` configuration property.
     */
    get normalizeNamespaces(): string {
        return workspace
            .getConfiguration(Extension.id)
            .get(
                configKeys.ctxNamespaceNormalizations,
                NormalizationOptions.none
            );
    }
    /**
     * Sets the value of the `ctxMenuCustoms` configuration property.
     */
    public showCSharpCtx() {
        lumberjack.logConfig(`Request to show C# context menu received 🫡`);
        commands.executeCommand("setContext", configEntry.showCsharp, true);
    }
    /**
     * Sets the value of the `ctxMenuCustoms` configuration property.
     */
    public showRazorCtx() {
        lumberjack.logConfig(`Request to show Razor context menu received 🫡`);
        commands.executeCommand("setContext", configEntry.showRazor, true);
    }
    /**
     * Sets the value of the `ctxMenuCustoms` configuration property.
     */
    public showTypescriptCtx() {
        lumberjack.logConfig(
            `Request to show TypeScript context menu received 🫡`
        );
        commands.executeCommand("setContext", configEntry.showTypescript, true);
    }
    /**
     * Sets the value of the `ctxMenuCustoms` configuration property.
     */
    public showPythonCtx() {
        lumberjack.logConfig(`Request to show Python context menu received 🫡`);
        commands.executeCommand("setContext", configEntry.showPython, true);
    }
}

export default ConfigManager;
