import { lumberjack, warehouse } from "../extension";
import Templates from "./Templates.json";
/**
 * TemplateParser is responsible for parsing and validating templates, both user and default.
 */
export class TemplateParser {
    /**
     * Reads and validates user templates from the warehouse.
     * @returns A Promise that resolves to an array of Language objects representing the user templates.
     * @throws An error if the user templates are not valid according to the schema.
     */
    static async getTemplatesUser(): Promise<Language[]> {
        lumberjack.logInfo(`Reading user templates`);
        const temp = await warehouse.readUserTemplates();
        const root = JSON.parse(temp);
        return root.languages as Language[];
    }
    /**
     * Reads and returns the default templates from the Templates.json file.
     * @returns An array of Language objects representing the default templates.
     */
    static async getTemplates(): Promise<Language[]> {
        const temp = Templates.languages as Language[];
        return temp;
    }
}

export default TemplateParser;

/**
 * Root interface representing the structure of the templates JSON file.
 */
export interface Root {
    languages: Language[];
}
/**
 * Language interface representing the structure of a language object in the templates JSON file.
 * This interface is used to validate the user templates.
 */
export interface Language {
    label: string; // the language label, e.g. C#
    description: string; // the language description, e.g. C# is a multi-paradigm programming language
    extensionName: string; // the extension name, e.g. cs
    namespace: boolean; // whether the language requires a namespace
    templates: Template[]; // the templates for the language
}
/**
 * Template interface representing the structure of a template object in the templates JSON file.
 * This interface is used to validate the user templates.
 */
export interface Template {
    label: string; // the template label, e.g. Class
    description: string; // the template description, e.g. A class is a blueprint for creating objects
    filename: string; // the filename of the template, e.g. Class
    extensionName?: string; // the extension name of the template, e.g. cs
    namespace?: boolean; // whether the template requires a namespace
    siblings?: Sibling; // the siblings of the template
    body: string[]; // the body of the template
}
/**
 * Sibling interface representing the structure of a sibling object in the templates JSON file.
 * This object request the creation of a second file when the template is created.
 */

export interface Sibling {
    languageLabel: string; // the language label, e.g. C#
    templateLabel: string; // the template label, e.g. Class
    defaultTemplate: boolean; // whether the sibling template is a default template, or a user template
    parentUri?: string; // the uri of the parent file, e.g. file:///c%3A/Users/username/Documents/Project/Class.cs
}
