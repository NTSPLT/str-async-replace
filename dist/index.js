(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AsyncReplace = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * A class that provides async string replacement methods
 */
class AsyncReplace {
    constructor(inputString) {
        if (!inputString) {
            throw new TypeError("inputString must not be empty or undefined");
        }
        this.inputString = inputString;
    }
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
    replace(searchValue, replaceValue, replaceLimit = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchValue == null) {
                throw new TypeError("searchValue must not be null or undefined");
            }
            if (typeof searchValue !== "string" && !(searchValue instanceof RegExp)) {
                throw new TypeError("searchValue must be a string or regular expression");
            }
            if (!Number.isFinite(replaceLimit) ||
                replaceLimit <= 0 ||
                replaceLimit % 1 !== 0) {
                throw new TypeError("replaceLimit must be a positive integer greater than zero");
            }
            if (replaceValue == null ||
                replaceValue === "" ||
                (typeof replaceValue !== "string" &&
                    typeof replaceValue !== "function" &&
                    (typeof replaceValue !== "object" ||
                        !(replaceValue instanceof Promise) ||
                        (typeof replaceValue === "object" &&
                            typeof replaceValue.toString === "function" &&
                            replaceValue.constructor.name === "AsyncFunction")))) {
                throw new TypeError("replaceValue must be a string, object with a toString method or async function");
            }
            if (searchValue instanceof RegExp && searchValue.flags.includes("g")) {
                replaceLimit = Number.MAX_SAFE_INTEGER;
            }
            const inputString = this.inputString;
            let newStr = "";
            let lastIndex = 0;
            let currentReplacement = 0;
            let regex;
            try {
                regex =
                    typeof searchValue === "string"
                        ? new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
                        : new RegExp(searchValue.source, searchValue.flags !== null && searchValue.flags.includes("g")
                            ? searchValue.flags
                            : `${searchValue.flags || ""}g`);
            }
            catch (e) {
                throw new TypeError("searchValue must be a valid regular expression");
            }
            let match;
            while ((match = regex.exec(inputString)) !== null &&
                currentReplacement < replaceLimit) {
                currentReplacement++;
                const response = (replaceValue) => __awaiter(this, void 0, void 0, function* () {
                    if (replaceValue instanceof Promise) {
                        return yield replaceValue.then(response);
                    }
                    else if (typeof replaceValue === "function") {
                        if (match &&
                            (typeof match[0] === "string" || typeof match.index === "number")) {
                            return replaceValue(match[0], match.index, ...match.slice(1), inputString, currentReplacement);
                        }
                    }
                    else if (typeof replaceValue.toString === "function") {
                        return replaceValue.toString();
                    }
                    else {
                        return String(replaceValue);
                    }
                });
                const replacement = yield response(replaceValue);
                newStr += inputString.slice(lastIndex, match.index);
                newStr += replacement;
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < inputString.length) {
                newStr += inputString.slice(lastIndex);
            }
            return new AsyncReplace(newStr);
        });
    }
    /**
     * Asynchronously, replace all instances of the searchValue in the input string with the replaceValue provided.
     * @async
     * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
     * @param {string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression.
     * Throws an error if replaceValue is null, an empty string, not a string, function, object with a toString method, or an async function.
     */
    replaceAll(searchValue, replaceValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.replace(searchValue, replaceValue, Number.MAX_SAFE_INTEGER);
        });
    }
    /**
     * Asynchronously, replaces multiple substrings or regular expressions in the string with their corresponding replacements.
     * @async
     * @param {...{search: string|RegExp, replace: string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - If the replacements parameter is not an array of objects or if any search or replace values are undefined or null.
     */
    replaceMany(replacements) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(replacements)) {
                throw new TypeError("The replacements parameter must be an array of objects.");
            }
            let newString = new AsyncReplace(this.inputString);
            for (const { search, replace } of replacements) {
                if (!search || !replace) {
                    throw new TypeError("The search and replace values cannot be undefined or null.");
                }
                newString = yield newString.replace(search, replace);
            }
            return newString;
        });
    }
    /**
     * Asynchronously, replaces multiple substrings or regular expressions in the string with their corresponding replacements.
     * @async
     * @param {...{search: string|RegExp, replace: string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise}} replacements - An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
     * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
     * @throws {TypeError} - If the replacements parameter is not an array of objects or if any search or replace values are undefined or null.
     */
    replaceAllMany(replacements) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(replacements)) {
                throw new TypeError("The replacements parameter must be an array of objects.");
            }
            let newString = new AsyncReplace(this.inputString);
            for (const { search, replace } of replacements) {
                if (!search || !replace) {
                    throw new TypeError("The search and replace values cannot be undefined or null.");
                }
                newString = yield newString.replaceAll(search, replace);
            }
            return newString;
        });
    }
    /**
     * Returns the input string used to create the instance of AsyncReplace.
     * @returns {string} - The input string.
     */
    toString() {
        return this.inputString;
    }
}
module.exports = AsyncReplace;

},{}]},{},[1])(1)
});
