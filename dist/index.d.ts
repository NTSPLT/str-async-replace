/**
 * A class that provides async string replacement methods
 */
declare class AsyncReplace {
    /**
     * Creates an instance of AsyncReplace.
     * @param {string} inputString - The input string to perform replacements on.
     * @throws {TypeError} - Throws an error if inputString is not a non-empty string.
     */
    private inputString;
    constructor(inputString: string);
    /**
     * Asynchronously, replace one or more occurrences of the searchValue in the input string with the specified replaceValue.
     * @async
     * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
     * @param {string|((match: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
     * @param {number} [replaceLimit=1] - The maximum number of replacements to make. Must be a positive integer greater than zero.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression, or if replaceLimit is not a positive integer greater than zero.
     * Throws an error if replaceValue is null, not a string, function, object with a toString method, or an async function.
     */
    replace(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => Promise<string>) | {
        toString: () => string;
    }, replaceLimit?: number): Promise<AsyncReplace>;
    /**
     * Asynchronously, replace all instances of the searchValue in the input string with the replaceValue provided.
     * @async
     * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
     * @param {string|((match: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression.
     * Throws an error if replaceValue is null, not a string, function, object with a toString method, or an async function.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => Promise<string>) | {
        toString: () => string;
    }): Promise<AsyncReplace>;
    /**
     * Asynchronously, replaces multiple substrings or regular expressions in the string with their corresponding replacements.
     * @async
     * @param {...{search: string|RegExp, replace: string|((match: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - If the replacements parameter is not an array of objects or if any search or replace values are undefined or null.
     */
    replaceMany(replacements: {
        search: string | RegExp;
        replace: string | ((...args: any[]) => Promise<string>) | {
            toString: () => string;
        };
    }[]): Promise<AsyncReplace>;
    /**
     * Asynchronously, replaces multiple substrings or regular expressions in the string with their corresponding replacements.
     * @async
     * @param {...{search: string|RegExp, replace: string|((match: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - If the replacements parameter is not an array of objects or if any search or replace values are undefined or null.
     */
    replaceAllMany(replacements: {
        search: string | RegExp;
        replace: string | ((...args: any[]) => Promise<string>) | {
            toString: () => string;
        };
    }[]): Promise<AsyncReplace>;
    /**
     * Returns the input string used to create the instance of AsyncReplace.
     * @returns {string} - The input string.
     */
    toString(): string;
}
export = AsyncReplace;
