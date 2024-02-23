# CHANGELOG

All notable changes to the `add-items` extension will be documented in this file.

## [2.2.7] - Repo moved to organization

- Minor change to the user instructions while creating files.
- Moved the repo from my personal profile to an organization profile, [KineticSnippet](https://github.com/KineticSnippet) to match the publisher.

## [2.2.5] - 2024-02-10 : Bug fix

- Fixed [issue 09](https://github.com/KineticSnippet/AddItems/issues/9)

## [2.2.3] - 2024-02-05

- The "AddUsing" feature has been re-named and re-purposed, it now allows to add top-file lines not only to c# files, but any kind of file as many additional lines as the user requires.
- The normalization feature has been renamed, to better fit in the configuration naming style.
- Changes were implemented in all three supported languages.

## [2.2.2] - 2024-02-02 : Hot fix

- Fixed links to repo

## [2.2.1] - 2023-11-17 : Hot fix

- Username change

## [2.2.0] - 2023-09-22 : Localization

- Improved localization
  - Added support for spanish
  - Settings are now translated for both russian and spanish

## [2.1.0] - 2023-09-07 : Added templates

- Adding unity templates (For game development, not the DE)
  - Adding templates
  - Adding context menu if needed/requested by someone
- Minor changes on readme and Contributions.md
- Fixed: In the previous update, the `package.json` (extension manifest) was updated to match the new license, GPL-v3, however I selected `LGPL-3.0-only`, this was a mistake! The correct license is the [license](/License.md) file in the repo, which is a GPL-v3. Fixed!
- Updated configurations for `NamespaceNormalization`: Removed a note that were saying it was temporary disabled.
- Removed some useless lines of code.
- Updated templates for C#, and C# legacy
- Added a new configuration option: `C# usings`:
  - This configuration will allow the user to add more usings, as they please, to almost all c# templates.
  - A semicolon is automatically added if not provided.

## [2.0.1] - 2023-09-05 : Hot fix

- Fixed unchanged license on package.json

## [2.0.0] - 2023-08-22 : License change

- Change license from MIT to GPLv3
  - To keep the open source code, open.
- Added contributions guidelines (basic).
- Added basic support for spanish.

I'm (@kineticSnippet) happy to announce this extension will be publish to [open-vsx](https://open-vsx.org/).

## [1.5.0] - 2023-08-22 : Bug fix

- Fixed Razor template (and code behind): the `namespace` was being created the old way.

## [1.4.3] - 2023-08-14 : Bug fix

- Fixed: sibling file creation were created with the wrong file extension.

## [1.4.2] - 2023-08-10 : Bug fix

- Fixed: Namespace Normalizer was not working properly on linux and macos.

## [1.4.1] - 2023-08-07 : General improvements

- Removed duplicated commands from the package.json file.
- Updated templates(description) for some languages.

## [1.4.0] - 2023-08-03 : Localization

🇷🇺

- Расширение переведено на Язык: Русский. 🇷🇺
- Extension translated to Language: Russian. 🇷🇺

## [1.2.0] - 2023-08-02 : General improvements

- Modified the file name input box to be a bit more user friendly.
- Fixed some python and typescript templates.
- Added context menu entries for `tsconfig.json` (Compiler Options) for TypeScript, and a sibling request for a `Index.ts` template, in a `/src` folder.

## [1.0.1] - 2023-08-01 : Added dynamic context menus

- Added automatic detection of `tsconfig.json` files to show the context menu, for TypeScript.
- Added automatic detection of `.csproj` files to show the context menu, for C#.
- Added automatic detection of `requirements.txt` files to show the context menu, for Python.
- Fixed name in the readme file.
- Added `tsconfig.json` template for TypeScript.
- Fixed name from `Requirements.txt` to `requirements.txt` in the Python template.
- Added "**/.venv/**" to the exclude patterns for context menu detection.

## [1.0.0] - 2023-07-31 : Stable release

- This is the first stable release of Add-Items.
- Namespaces normalizations are now available, disabled by default.

## [0.11.0] - 2023-07-17 : Extension re-work

- Finished re-writing the extension.
  - The extension is now more scalable.
  - Enabled support for user templates, I changed my mind.
  - Fixed some templates.
  - Removed old tutorial.

## [0.10.2] - 2023-07-16 : Start up time improved

- Reduced startup time:
  - The extension now starts in about 19ms, instead of 40ms [0.10.0]

## [0.10.0] - 2023-07-15 : Major update: extension rework

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

## [0.6.0] - 2023-07-13 # [This ver was never released]

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

## [0.5.0] - 2023-07-12 : General improvements

- Disabled Namespace Normalizer temporarily, because it's not working properly.
- Shortcuts are now dynamic by default.
  - They are now activated/deactivated based on the current workspace.
  - They can be disabled or enabled statically in the configuration.

## [0.4.0] - 2023-07-11 : Added language support for python and typescript

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

## [0.3.4] - 2023-07-11 : General improvements

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

## [0.3.2] - 2023-07-10 : Hot fix

- Fixed a template file for `CSharp` files: `globalUsings`

## [0.3.0] - 2023-07-09 : General improvements

- Improved templates file
- Improved readability of the commands in the command palette
- Fixed a bug where the command `showAll` wasn't working at all
- Added a small label to each entry in the command palette, for better readability, the label shows the file extension of the template

## [0.2.8] - 2023-07-07 : Bug fix

- Fixed a bug where the configuration manager is not working properly.
  - The configuration manager reads the wrong configuration entry.
- Changed default configuration
  - The default configuration for the Namespace Normalizer is now set to `Do nothing`.

## [0.2.6] - 2023-07-02 : General improvements

- Changed Readme
- Enabled preview in marketplace
- Modified the tutorial

## [0.2.4] - 2023-07-01 : Bug fix

- Fixed a bug where all the javascript files are being created with wrong file extension.
- Added index.ts (typescript) to the templates.
  - Simple typescript file with a console.log() in it.

## [0.2.2] - 2023-06-30 : General improvements

- Added keywords to package.json

## [0.2.0] - 2023-06-29 : Added features

- Added a new feature: Normalizing namespaces
  - This feature will normalize the namespaces, replacing special characters with underscores or removing them.
  - This feature can be enabled/disabled in the settings.

## [0.1.4] - 2023-06-27 : Bug fix

- Fixed context menu for Razor files
- Removed unnecessary properties from package.json
- Removed uncompleted features from vscode settings

## [0.1.2] - 2023-06-26 : General improvements

- Updated README.md
  - Added a more visible link to the tutorial
- Updated tutorial: Make it more clear
- Fixed: wrong link to the tutorial in the log console

## [0.1.1] - 2023-06-26 : Bug fix

- Fixed a bug where the user can create a file with an empty file extension, which causes errors in the operating system.

## [0.1.0] - 2023-06-26 : Hot fix

Updated README.md

## [0.0.1] - 2023-06-26 : RELEASE

- Initial release of Add-Items

## [Unreleased] : Started working

- This extension is still unreleased!

---

## Notes

The date format is: YYYY-MM-DD

## Licensing

In order to keep open source code open, this project uses GPL-3 license.  
This license change is to ensure all modifications are always shared with the community.
