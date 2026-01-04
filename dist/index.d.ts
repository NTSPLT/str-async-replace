/**
 * A class that provides async string replacement methods
 */
declare class AsyncReplace {
    /**
     * Creates an instance of AsyncReplace.
     * @param {string} inputString - The input string to perform replacements on.
     * @throws {TypeError} - Throws an error if inputString is null, undefined, an empty string, or not a string.
     */
    private inputString;
    constructor(inputString: string);
    /**
     * Validates the search value parameter
     * @private
     * @param {string | RegExp} searchValue - The value to validate
     * @throws {TypeError} - If searchValue is invalid
     */
    private validateSearchValue;
    /**
     * Validates the replace limit parameter
     * @private
     * @param {number} replaceLimit - The limit to validate
     * @throws {TypeError} - If replaceLimit is invalid
     */
    private validateReplaceLimit;
    /**
     * Validates the replace value parameter
     * @private
     * @param {any} replaceValue - The value to validate
     * @throws {TypeError} - If replaceValue is invalid
     */
    private validateReplaceValue;
    /**
     * Creates a regex from a search value
     * @private
     * @param {string | RegExp} searchValue - The value to convert to regex
     * @returns {RegExp} - The constructed regex
     * @throws {TypeError} - If the regex is invalid
     */
    private createRegex;
    /**
     * Resolves the replacement value (handles functions, promises, and strings)
     * @private
     * @param {any} replaceValue - The replacement value
     * @param {RegExpExecArray | null} match - The regex match
     * @param {string} inputString - The input string
     * @param {number} currentReplacement - The current replacement count
     * @returns {Promise<string>} - The resolved replacement string
     */
    private resolveReplaceValue;
    /**
     * Asynchronously, replace one or more occurrences of the searchValue in the input string with the specified replaceValue.
     * @async
     * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
     * @param {string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
     * @param {number} [replaceLimit=1] - The maximum number of replacements to make. Must be a positive integer greater than zero.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression, or if replaceLimit is not a positive integer greater than zero.
     * Throws an error if replaceValue is null, an empty string, not a string, function, object with a toString method, or an async function.
     */
    replace(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => Promise<string>) | {
        toString: () => string;
    }, replaceLimit?: number): Promise<AsyncReplace>;
    /**
     * Asynchronously, replace all instances of the searchValue in the input string with the replaceValue provided.
     * @async
     * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
     * @param {string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression.
     * Throws an error if replaceValue is null, an empty string, not a string, function, object with a toString method, or an async function.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => Promise<string>) | {
        toString: () => string;
    }): Promise<AsyncReplace>;
    /**
     * Helper method to perform multiple replacements with a specified replacement method
     * @private
     * @param {Array} replacements - Array of replacement objects
     * @param {Function} replacementMethod - The method to use (replace or replaceAll)
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made
     * @throws {TypeError} - If parameters are invalid
     */
    private performMultipleReplacements;
    /**
     * Asynchronously, replaces multiple substrings or regular expressions in the string with their corresponding replacements.
     * @async
     * @param {...{search: string|RegExp, replace: string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
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
     * @param {...{search: string|RegExp, replace: string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
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
