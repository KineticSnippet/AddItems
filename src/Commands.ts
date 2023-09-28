import { ExtensionContext, Uri, commands } from "vscode";
import {
    CsCommandNames,
    DataCommandNames,
    EssentialCommandNames,
    PyCommandNames,
    RazorCommandNames as RazorCmdNames,
    TsCommandNames,
} from "./GlobalConst";
import { FileKind, SolicitedFile } from "./FileCreator/FileCreatorHelper";
import FileCreator from "./FileCreator/FileCreator";
import { configs, lumberjack, warehouse } from "./extension";
import { Settings } from "./Warehouse/Settings";

/**
 * A class that contains static methods to register all commands used by the extension.
 */
export class Commands {
    static registerAllCommands(ctx: ExtensionContext) {
        /**
         * Registers a command to create an item.
         * @param clicker The Uri of the file that triggered the command.
         * @param solicitedFile The file to be created.
         */
        const createItem = commands.registerCommand(
            EssentialCommandNames.addItem,
            async (clicker: Uri, solicitedFile: SolicitedFile) => {
                lumberjack.logCommand(EssentialCommandNames.addItem);
                try {
                    if (clicker === undefined) {
                        lumberjack.logInfo("No solicited file");
                        await FileCreator.createItem(clicker);
                    } else {
                        await FileCreator.createItem(clicker, solicitedFile);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        lumberjack.logError(error.message + error.stack);
                    } else {
                        lumberjack.logError(`Mysterious error: ${error} `);
                    }
                }
                lumberjack.logCommandFinished(
                    `Finished ${EssentialCommandNames.addItem}`
                );
            }
        );
        /**
         * Registers a command to create a custom item.
         * @param clicker The Uri of the file that triggered the command.
         */
        const createItemCustom = commands.registerCommand(
            EssentialCommandNames.addItemCustom,
            async (clicker: Uri) => {
                lumberjack.logCommand(EssentialCommandNames.addItem);
                try {
                    await FileCreator.createItem(
                        clicker,
                        undefined,
                        FileKind.user
                    );
                } catch (error) {
                    if (error instanceof Error) {
                        lumberjack.logError(error.message + error.stack);
                    } else {
                        lumberjack.logError(`Mysterious error: ${error} `);
                    }
                }
            }
        );

        /*
         * Registers commands to open the user templates json file.
         */
        const openUserTemplatesCmd = commands.registerCommand(
            EssentialCommandNames.openUserTemplates,
            () => {
                lumberjack.logCommand(EssentialCommandNames.openUserTemplates);
                warehouse.openUserTemplates();
            }
        );
        /**
         * Registers a command to restore the default user templates.
         */
        const restoreUserTemplatesCmd = commands.registerCommand(
            EssentialCommandNames.restoreUserTemplates,
            async () => {
                lumberjack.logCommand(
                    EssentialCommandNames.restoreUserTemplates
                );
                warehouse.resetUserTemplates();
            }
        );
        /**
         * Registers a command to delete the user templates json file.
         */
        const deleteUserTemplatesCmd = commands.registerCommand(
            EssentialCommandNames.deleteUserTemplates,
            () => {
                lumberjack.logCommand(
                    EssentialCommandNames.deleteUserTemplates
                );
                warehouse.deleteUserTemplates();
            }
        );

        const resetSettings = commands.registerCommand(
            EssentialCommandNames.resetSettings,
            () => {
                lumberjack.logCommand(EssentialCommandNames.resetSettings);
                warehouse.writeSettings(new Settings());
            }
        );

        const saveSettings = commands.registerCommand(
            EssentialCommandNames.saveSettings,
            () => {
                lumberjack.logCommand(EssentialCommandNames.resetSettings);
                warehouse.writeSettings(configs);
            }
        );

        /**
         * The following commands create files
         */

        /**
         * Registers a command to create a new C# file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsAllCmd = commands.registerCommand(
            CsCommandNames.addCsAll,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsAll);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                });
            }
        );
        /**
         * Registers a command to add a C# class file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsClassCmd = commands.registerCommand(
            CsCommandNames.addCsClass,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsClass);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Class",
                });
            }
        );
        /**
         * Registers a command to add a C# enum file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsEnumCmd = commands.registerCommand(
            CsCommandNames.addCsEnum,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsEnum);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Enum",
                });
            }
        );

        /**
         * Registers a command to add a C# interface file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsInterfaceCmd = commands.registerCommand(
            CsCommandNames.addCsInterface,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsInterface);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Interface",
                });
            }
        );
        /**
         * Registers a command to add a C# struct file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsStructCmd = commands.registerCommand(
            CsCommandNames.addCsStruct,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsStruct);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Struct",
                });
            }
        );
        /**
         * Registers a command to add a C# record file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsRecordCmd = commands.registerCommand(
            CsCommandNames.addCsRecord,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsRecord);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Record",
                });
            }
        );
        /**
         * Registers a command to add a C# delegate file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsDelegateCmd = commands.registerCommand(
            CsCommandNames.addCsDelegate,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsDelegate);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Delegate",
                });
            }
        );
        /**
         * Registers a command to add a C# global using file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addGlobalUsingCmd = commands.registerCommand(
            CsCommandNames.addCsGlobalUsing,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsGlobalUsing);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Global Using",
                });
            }
        );
        /**
         * Registers a command to add a C# unit test file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsUnitTestCmd = commands.registerCommand(
            CsCommandNames.addCsUnitTest,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsUnitTest);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Unit Test",
                });
            }
        );
        /**
         * Registers a command to add a C# razor model file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addCsRazorModelCmd = commands.registerCommand(
            CsCommandNames.addCsRazorModel,
            (clicker: Uri) => {
                lumberjack.logCommand(CsCommandNames.addCsRazorModel);
                FileCreator.createItem(clicker, {
                    languageLabel: "C#",
                    templateLabel: "Razor model",
                });
            }
        );
        /**
         * Registers a command to add a Json file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addJsonCmd = commands.registerCommand(
            DataCommandNames.addJson,
            (clicker: Uri) => {
                lumberjack.logCommand(DataCommandNames.addJson);
                FileCreator.createItem(clicker, {
                    languageLabel: "Other",
                    templateLabel: "Json File",
                });
            }
        );
        /**
         * Registers a command to add a Xml file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addXmlCmd = commands.registerCommand(
            DataCommandNames.addXml,
            (clicker: Uri) => {
                lumberjack.logCommand(DataCommandNames.addXml);
                FileCreator.createItem(clicker, {
                    languageLabel: "Other",
                    templateLabel: "Xml File",
                });
            }
        );
        /**
         * Registers a command to add a Razor item.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorAllCmd = commands.registerCommand(
            RazorCmdNames.addRazorAll,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorAll);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                });
            }
        );
        /**
         * Registers a command to add a Razor layout file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorLayoutCmd = commands.registerCommand(
            RazorCmdNames.addRazorLayout,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorLayout);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "Layout",
                });
            }
        );
        /**
         * Registers a command to add a Razor view start file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorViewStartCmd = commands.registerCommand(
            RazorCmdNames.addRazorViewStart,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorViewStart);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "View Start",
                });
            }
        );
        /**
         * Registers a command to add a Razor component file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorComponentCmd = commands.registerCommand(
            RazorCmdNames.addRazorComponent,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorComponent);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "Component",
                });
            }
        );
        /**
         * Registers a command to add a Razor empty page file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorEmptyPageCmd = commands.registerCommand(
            RazorCmdNames.addRazorEmptyPage,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorEmptyPage);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "Empty Page",
                });
            }
        );
        /**
         * Registers a command to add a Razor page with model file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorPageWithModelCmd = commands.registerCommand(
            RazorCmdNames.addRazorPageWithModel,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorPageWithModel);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "Page Empty and Model (Separated)",
                });
            }
        );
        /**
         * Registers a command to add a Razor page standalone file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addRazorPageStandalone = commands.registerCommand(
            RazorCmdNames.addRazorPageStandalone,
            (clicker: Uri) => {
                lumberjack.logCommand(RazorCmdNames.addRazorPageStandalone);
                FileCreator.createItem(clicker, {
                    languageLabel: "Razor Pages",
                    templateLabel: "Page Standalone",
                });
            }
        );
        /**
         * Registers a command to add a Typescript item.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsAllCmd = commands.registerCommand(
            TsCommandNames.addTsAll,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsAll);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                });
            }
        );
        /**
         * Registers a command to add a Typescript index file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsIndexCmd = commands.registerCommand(
            TsCommandNames.addTsIndex,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsIndex);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Index",
                });
            }
        );
        /**
         * Registers a command to add a Typescript function file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsFunctionCmd = commands.registerCommand(
            TsCommandNames.addTsFunction,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsFunction);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Function",
                });
            }
        );
        /**
         * Registers a command to add a Typescript class file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsClassCmd = commands.registerCommand(
            TsCommandNames.addTsClass,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsClass);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Class",
                });
            }
        );
        /**
         * Registers a command to add a Typescript enum file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsEnumCmd = commands.registerCommand(
            TsCommandNames.addTsEnum,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsEnum);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Enum",
                });
            }
        );
        /**
         * Registers a command to add a Typescript interface file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsInterfaceCmd = commands.registerCommand(
            TsCommandNames.addTsInterface,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsInterface);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Interface",
                });
            }
        );
        /**
         * Registers a command to add a Typescript global constants file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addTsGlobalConstCmd = commands.registerCommand(
            TsCommandNames.addTsGlobalConst,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsGlobalConst);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",

                    templateLabel: "Global Constants",
                });
            }
        );
        const addTsCompilerOptionsCmd = commands.registerCommand(
            TsCommandNames.addTsCompilerOptions,
            (clicker: Uri) => {
                lumberjack.logCommand(TsCommandNames.addTsCompilerOptions);
                FileCreator.createItem(clicker, {
                    languageLabel: "TypeScript",
                    templateLabel: "Compiler Options",
                });
            }
        );
        /**
         * Registers a command to add a Python item.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyAllCmd = commands.registerCommand(
            PyCommandNames.addPyAll,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyAll);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                });
            }
        );
        /**
         * Registers a command to add a Python script file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyScriptCmd = commands.registerCommand(
            PyCommandNames.addPyScript,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyScript);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Script",
                });
            }
        );
        /**
         * Registers a command to add a Python class file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyClassCmd = commands.registerCommand(
            PyCommandNames.addPyClass,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyClass);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Class",
                });
            }
        );
        /**
         * Registers a command to add a Python main file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyMainCmd = commands.registerCommand(
            PyCommandNames.addPyMain,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyMain);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Main",
                });
            }
        );
        /**
         * Registers a command to add a Python unit test file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyUnitTestCmd = commands.registerCommand(
            PyCommandNames.addPyTest,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyTest);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Unit Test",
                });
            }
        );
        /**
         * Registers a command to add a Python constants file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyConstantsCmd = commands.registerCommand(
            PyCommandNames.addPyConstant,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyConstant);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Constants",
                });
            }
        );
        /**
         * Registers a command to add a Python requirements file.
         * @param clicker The Uri of the file that triggered the command.
         */
        const addPyRequirementsCmd = commands.registerCommand(
            PyCommandNames.addPyRequirements,
            (clicker: Uri) => {
                lumberjack.logCommand(PyCommandNames.addPyRequirements);
                FileCreator.createItem(clicker, {
                    languageLabel: "Python",
                    templateLabel: "Requirements",
                });
            }
        );
        ctx.subscriptions.push(
            createItem,
            createItemCustom,
            openUserTemplatesCmd,
            restoreUserTemplatesCmd,
            deleteUserTemplatesCmd,
            resetSettings,
            saveSettings,

            // File creation commands
            addCsAllCmd,
            addCsClassCmd,
            addCsEnumCmd,
            addCsInterfaceCmd,
            addCsStructCmd,
            addCsRecordCmd,
            addCsDelegateCmd,
            addGlobalUsingCmd,
            addCsUnitTestCmd,
            addCsRazorModelCmd,
            addJsonCmd,
            addXmlCmd,
            addRazorAllCmd,
            addRazorLayoutCmd,
            addRazorViewStartCmd,
            addRazorComponentCmd,
            addRazorEmptyPageCmd,
            addRazorPageWithModelCmd,
            addRazorPageStandalone,
            addTsAllCmd,
            addTsIndexCmd,
            addTsFunctionCmd,
            addTsClassCmd,
            addTsEnumCmd,
            addTsInterfaceCmd,
            addTsGlobalConstCmd,
            addTsCompilerOptionsCmd,
            addPyAllCmd,
            addPyScriptCmd,
            addPyClassCmd,
            addPyMainCmd,
            addPyUnitTestCmd,
            addPyConstantsCmd,
            addPyRequirementsCmd
        );
        lumberjack.logInfo("Registered essential commands");
        lumberjack.logInfo(`Registered ${ctx.subscriptions.length} commands`);
    }
}

export default Commands;
