/**
 * Defines the extension's id, name and configuration name.
 */
export const enum Extension {
    id = "add-items", // The extension's unique identifier
    name = "Add Items", // The extension's display name
}

/**new file
 * Defines constants used throughout the extension.
 */
export const regex = {
    fileNameValidator:
        /^(?!\s*$)[a-zA-Z0-9\s./\\_-]*\.[a-zA-Z0-9\s./\\_-]+(?<!\.)$/, // Validates file names
    multiSepRegex: /(\/{2,}|\\{2,})/gm, // Matches multiple slashes or backslashes
    namespacePattern: /(\[namespace\])/gm, // Matches the [namespace] placeholder
    // Matches all invalid characters in a namespace, except for slashes and backslashes
    namespaceValidator: /[^a-zA-Z0-9\/\\]/gm,
};

/**
 * Exclude patterns used to filter files and folders.
 */
export const excludePatterns = [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/bin/**",
    "**/obj/**",
    "**/out/**",
    "**/target/**",
    "**/typings/**",
    "**/jspm_packages/**",
    "**/bower_components/**",
    "**/.git/**",
    "**/.hg/**",
    "**/.svn/**",
    "**/CVS/**",
    "**/.vscode/**",
    // python venvs
    "**/.venv/**",
];

/**
 * Config entries for the extension.
 * Each string that is used to store the user's preferences
 * @see src/Modules/Essential/ConfigManager.ts
 */
export const configEntry = {
    showCustoms: `${Extension.id}.showCustoms`,
    showCsharp: `${Extension.id}.showCSharp`,
    showPython: `${Extension.id}.showPython`,
    showRazor: `${Extension.id}.showRazor`,
    showTypescript: `${Extension.id}.showTypescript`,
    namespaceNormalizations: `${Extension.id}.namespaceNormalizations`,
};

/**
 * Config keys for the extension.
 * Each entry is a string that is render in the settings page
 * This string are referenced in the package.json file and are case sensitive
 * @see src/Modules/Essential/ConfigManager.ts
 */
export const configKeys = {
    ctxMenuCustoms: "contextMenu.custom",
    ctxMenuCsharp: "contextMenu.shortcut.CSharp",
    ctxMenuRazor: "contextMenu.shortcut.Razor",
    ctxMenuPython: "contextMenu.shortcut.Python",
    ctxMenuTypescript: "contextMenu.shortcut.Typescript",
    ctxNamespaceNormalizations: "normalizeNamespaces",
};

/**
 * Config options for the extension.
 * Each entry is show as a dropdown in the settings page,
 * and used to define the behavior of the context menus
 * This string are referenced in the package.json file and are case sensitive
 */
export enum ContextShowOptions {
    never = "Never",
    always = "Always",
    dynamic = "Dynamic",
}

/**
 * Config options for the extension.
 * Each entry is show as a dropdown in the settings page,
 * and used to define the behavior of the namespace normalization
 * This string are referenced in the package.json file and are case sensitive
 */
export enum NormalizationOptions {
    none = "None",
    remove = "Remove",
    replace = "Replace with underscore",
}

/**
 * Essential commands
 * These commands are used to add items to the explorer, and to open the user templates
 * They are always available, and should not be disabled
 */

export enum EssentialCommandNames {
    addItem = `${Extension.id}.addItem`,
    addItemCustom = `${Extension.id}.addItemCustom`,

    createUserTemplates = `${Extension.id}.createUserTemplates`,
    openUserTemplates = `${Extension.id}.openUserTemplates`,
    restoreUserTemplates = `${Extension.id}.restoreUserTemplates`,
    deleteUserTemplates = `${Extension.id}.deleteUserTemplates`,
}

/**
 * C# commands names
 * These commands are used to add C# items to the explorer
 * They are not available through the command palette
 * And are called by the essential commands
 */

export enum CsCommandNames {
    addCsAll = `${Extension.id}.showAllCSharp`,
    addCsClass = `${Extension.id}.addCsClass`,
    addCsEnum = `${Extension.id}.addCsEnum`,
    addCsInterface = `${Extension.id}.addCsInterface`,
    addCsStruct = `${Extension.id}.addCsStruct`,
    addCsRecord = `${Extension.id}.addCsRecord`,
    addCsGlobalUsing = `${Extension.id}.addCsGlobalUsing`,
    addCsUnitTest = `${Extension.id}.addCsUnitTests`,
    addCsRazorModel = `${Extension.id}.addCsRazorModel`,
    addCsDelegate = `${Extension.id}.addCsDelegate`,
}

/**
 * Razor commands names
 * These commands are used to add Razor items to the explorer
 * They are not available through the command palette
 * And are called by the essential commands
 */
export enum RazorCommandNames {
    addRazorAll = `${Extension.id}.showAllRazor`,
    addRazorLayout = `${Extension.id}.addRazorLayout`,
    addRazorViewStart = `${Extension.id}.addRazorViewStart`,
    addRazorComponent = `${Extension.id}.addRazorComponent`,
    addRazorEmptyPage = `${Extension.id}.addRazorEmptyPage`,
    addRazorPageWithModel = `${Extension.id}.addRazorPageWithModel`,
    addRazorPageStandalone = `${Extension.id}.addRazorPageWithCodeBehind`,
}

/**
 * Typescript commands names
 * These commands are used to add Typescript items to the explorer
 * They are not available through the command palette
 * And are called by the essential commands
 */
export enum TsCommandNames {
    addTsAll = `${Extension.id}.showAllTypescript`,
    addTsIndex = `${Extension.id}.addTsIndex`,
    addTsFunction = `${Extension.id}.addTsFunction`,
    addTsClass = `${Extension.id}.addTsClass`,
    addTsEnum = `${Extension.id}.addTsEnum`,
    addTsInterface = `${Extension.id}.addTsInterface`,
    addTsGlobalConst = `${Extension.id}.addTsGlobalConst`,
}

/**
 * Python commands names
 * These commands are used to add Python items to the explorer
 * They are not available through the command palette
 * And are called by the essential commands
 */
export enum PyCommandNames {
    addPyAll = `${Extension.id}.showAllPython`,
    addPyScript = `${Extension.id}.addPyScript`,
    addPyMain = `${Extension.id}.addPyMain`,
    addPyClass = `${Extension.id}.addPyClass`,
    addPyTest = `${Extension.id}.addPyTest`,
    addPyConstant = `${Extension.id}.addPyGlobalConstant`,
    addPyRequirements = `${Extension.id}.addPyRequirements`,
}

/**
 * Data commands names
 * These commands are used to add data items to the explorer
 * They are not available through the command palette
 */
export enum DataCommandNames {
    addJson = `${Extension.id}.addJson`,
    addXml = `${Extension.id}.addXml`,
}
