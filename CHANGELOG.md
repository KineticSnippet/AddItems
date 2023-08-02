# CHANGELOG

All notable changes to the `add-items` extension will be documented in this file.

## [1.0.1] - 01.08.2021

- Added automatic detection of `tsconfig.json` files to show the context menu, for TypeScript.
- Added automatic detection of `.csproj` files to show the context menu, for C#.
- Added automatic detection of `requirements.txt` files to show the context menu, for Python.
- Fixed name in the readme file.
- Added `tsconfig.json` template for TypeScript.
- Fixed name from `Requirements.txt` to `requirements.txt` in the Python template.
- Added "**/.venv/**" to the exclude patterns for context menu detection.

## [1.0.0] - 31.07.2021

- This is the first stable release of Add-Items.
- Namespaces normalizations are now available, disabled by default.

---

This part of the changelog was created by the previous maintainer. Dates were changed to match the new date format (dd.mm.yyyy) (ru).

---

## [0.11.0] - 17.07.2023

- Finished re-writing the extension.
  - The extension is now more scalable.
  - Enabled support for user templates, I changed my mind.
  - Fixed some templates.
  - Removed old tutorial.

## [0.10.2] - 16.07.2023

- Reduced startup time:
  - The extension now starts in about 19ms, instead of 40ms [0.10.0]

## [0.10.0] - 15.07.2023

This version is a major update, and it's not backwards compatible with the previous versions.
Introduce breaking changes for many features.

- Re-wrote the entire extension from scratch.
  - Item creation is now much faster.
  - File name validation is now done in a more efficient way.
  - The extension is now more scalable.
  - Migrated from `any` types to `enum`, and `interface` types.
  - Compiler options are now way more strict.
  - Removed all the unnecessary code.
  - Reduced the size of the extension.
  - Reduced the startup time of the extension.
- User templates are not supported anymore, at least for now. (They will be re-introduced in the future)
  - This is a breaking change.
  - No data is deleted from the user's computer.

 User templates:
 Only if I receive a lot of requests, I will re-introduce this feature, but for now, it's not supported anymore.

## [0.6.0] - 13.07.2023 # [This ver was never released]

This version was never released, was used for testing purposes only.
However many changes were made in this version, and they are listed below:

- Removed all string from the project:
- Almost all strings are now stored in `Strings/CommandNames.ts`, `Strings/Msg.ts` and `Strings/GlobalConst.ts`.
- This will make the project more scalable, and easier to maintain.
- Removed all duplicated code from the project
- Removed all unused code from the project
- Removed all unused imports from the project
- Enabled some strict-ish rules in the `tsconfig.json` file
- Improved the logging system

## [0.5.0] - 12.07.2023

- Disabled Namespace Normalizer temporarily, because it's not working properly.
- Shortcuts are now dynamic by default.
  - They are now activated/deactivated based on the current workspace.
  - They can be disabled or enabled statically in the configuration.

## [0.4.0] - 11.07.2023

- Added commands for `Python` and `Typescript` files creation.
  - Added context menu entries for both `Python` and `Typescript` files.
  - Added configuration entries for activating/deactivating the context menu entries for both `Python` and `Typescript` files.
- Further improved the readability of the Configuration Manager, and the configuration manifest (user side).
- Further improved the logging system.
- Simplified the `extension.ts` file.
- Added templates for `Python` and `Typescript` files, as needed.
  - Improved existing templates, as needed.
- Fixed a bug where the files created in Linux and MacOS don't create folders, if a path is specified with the wrong path separator.
  - Replaced all the path separators with the `path.sep` constant, to avoid this bug.
- Error messages are now show to the user in a error notification, with a `Show Log` button, that opens the log channel.

## [0.3.4] - 11.07.2023

- Changed all the strings in the Configuration Manager to constants, for better scalability.
- Changed all the commands names to constants, for better scalability.
- Renamed some commands to better fit the naming convention.
- Renamed files in the /src/Modules/Commands folder to better fit the naming convention.
- Fixed spelling mistakes in the Configuration Manager.
- Improved the readability of the Configuration Manager, and the configuration manifest (user side).
- Improved the logging system.
- Rearranged the commands declaration in the package.json file.
- Razor commands where renamed to better fit the naming convention.
  - Removed the `Cs` prefix from the razor commands, because it was redundant.
- References to the language `CSharp` where changed from `Cs|cs` to `CSharp` (e.g. `ShowAllCs` to `ShowAllCSharp`).
- Files are now not being saved immediately after creation, avoiding the file to be formatted by the editor, in case the user has the `editor.formatOnSave` option enabled.
- Fixed `record` template file.
- Removed unnecessary comments.

## [0.3.2] - 10.07.2023

- Fixed a template file for `CSharp` files: `globalUsings`

## [0.3.0] - 2023-07-09

- Improved templates file
- Improved readability of the commands in the command palette
- Fixed a bug where the command `showAll` wasn't working at all
- Added a small label to each entry in the command palette, for better readability, the label shows the file extension of the template

## [0.2.8] - 07.07.2023

- Fixed a bug where the configuration manager is not working properly.
  - The configuration manager reads the wrong configuration entry.
- Changed default configuration
  - The default configuration for the Namespace Normalizer is now set to `Do nothing`.

## [0.2.6] - 02.07.2023

- Changed Readme
- Enabled preview in marketplace
- Modified the tutorial

## [0.2.4] - 01.07.2023

- Fixed a bug where all the javascript files are being created with wrong file extension.
- Added index.ts (typescript) to the templates.
  - Simple typescript file with a console.log() in it.

## [0.2.2] - 30.06.2023

- Added keywords to package.json

## [0.2.0] - 29.06.2023

- Added a new feature: Normalizing namespaces
  - This feature will normalize the namespaces, replacing special characters with underscores or removing them.
  - This feature can be enabled/disabled in the settings.

## [0.1.4] - 27.06.2023

- Fixed context menu for Razor files
- Removed unnecessary properties from package.json
- Removed uncompleted features from vscode settings

## [0.1.2] - 26.06.2023

- Updated README.md
  - Added a more visible link to the tutorial
- Updated tutorial: Make it more clear
- Fixed: wrong link to the tutorial in the log console

## [0.1.1] - 26.06.2023

- Fixed a bug where the user can create a file with an empty file extension, which causes errors in the operating system.

## [0.1.0] - 26.06.2023

Updated README.md

## [0.0.1] - 26.06.2023

- Initial release of Add-Items

## [Unreleased]

- This extension is still unreleased!
