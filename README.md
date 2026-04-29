[npm]: https://img.shields.io/npm/v/str-async-replace
[npm-url]: https://www.npmjs.com/package/str-async-replace

# str-async-replace: AsyncReplace📚 [![npm][npm]][npm-url]

The `AsyncReplace` class provides asynchronous string replacement methods. It allows you to perform string replacements with flexibility, including support for regular expressions and asynchronous replacement functions.

## Table of Contents

- [Constructor](#constructor)
- [Method: replace](#method-replace)
- [Method: replaceAll](#method-replaceall)
- [Method: replaceMany](#method-replacemany)
- [Method: replaceAllMany](#method-replaceallmany)
- [Method: toString](#method-tostring)

## Constructor

### `AsyncReplace(inputString: string)`

- Creates an instance of `AsyncReplace`.
- Parameters:
  - `inputString` (string): The input string to perform replacements on.
- Throws a `TypeError` if `inputString` is not a non-empty string.

## Method: replace

### `async replace(searchValue: string | RegExp, replaceValue: string | ((match: string, ...args: any[]) => Promise<string> | string), replaceLimit: number = 1): Promise<AsyncReplace>`

- Asynchronously replaces one or more occurrences of the `searchValue` in the input string with the specified `replaceValue`.
- Parameters:
  - `searchValue` (string | RegExp): The value to search for in the input string. Can be a string or regular expression.
  - `replaceValue` (string | ((match: string, ...args: any[]) => Promise&lt;string&gt; | string)): The value to replace the search value with. Can be a string, function, object with a `toString` method, or an async function.
  - `replaceLimit` (number, optional): The maximum number of replacements to make. Must be a positive integer greater than zero. Defaults to 1.
- Returns a `Promise<AsyncReplace>`: A new `AsyncReplace` instance with the replacements made.
- Throws a `TypeError` if:
  - `searchValue` is null, undefined, not a string, or not a regular expression.
  - `replaceLimit` is not a positive integer greater than zero.
  - `replaceValue` is null, not a string, not a function, not an object with a `toString` method, or not an async function.

#### Example: Simulating Delay in Replace

```js
const inputText = "Hello, World!";
const asyncReplacer = new AsyncReplace(inputText);

(async () => {
  try {
    const newString = await asyncReplacer.replace("World", async () => {
      // Simulate a delay, e.g., an asynchronous HTTP request.
      await new Promise(resolve => setTimeout(resolve, 2000));
      return "Response from the server";
    });

    console.log(newString.toString()); // Output after 2 seconds: "Hello, Response from the server!"
  } catch (error) {
    console.error(error);
  }
})();
```

## Method: replaceAll

### `async replaceAll(searchValue: string | RegExp, replaceValue: string | ((match: string, ...args: any[]) => Promise<string> | string)): Promise<AsyncReplace>`

- Asynchronously replaces all instances of the `searchValue` in the input string with the `replaceValue` provided.
- Parameters:
  - `searchValue` (string | RegExp): The value to search for in the input string. Can be a string or regular expression.
  - `replaceValue` (string | ((match: string, ...args: any[]) => Promise&lt;string&gt; | string)): The value to replace the search value with. Can be a string, function, object with a `toString` method, or an async function.
- Returns a `Promise<AsyncReplace>`: A new `AsyncReplace` instance with the replacements made.
- Throws a `TypeError` if:
  - `searchValue` is null, undefined, not a string, or not a regular expression.
  - `replaceValue` is null, not a string, not a function, not an object with a `toString` method, or not an async function.

#### Example: Simulating Delay in ReplaceAll

```js
const inputText = "Hello, World!";
const asyncReplacer = new AsyncReplace(inputText);

(async () => {
  try {
    const newString = await asyncReplacer.replaceAll("World", async () => {
      // Simulate a delay, e.g., an asynchronous HTTP request.
      await new Promise(resolve => setTimeout(resolve, 2000));
      return "Response from the server";
    });

    console.log(newString.toString()); // Output after 2 seconds: "Hello, Response from the server!"
  } catch (error) {
    console.error(error);
  }
})();
```

## Method: replaceMany

### `async replaceMany(replacements: { search: string | RegExp, replace: string | ((match: string, ...args: any[]) => Promise<string> | string) }[]): Promise<AsyncReplace>`

- Asynchronously replaces multiple substrings or regular expressions in the string with their corresponding replacements.
- Parameters:
  - `replacements` (array of objects): An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
- Returns a `Promise<AsyncReplace>`: A new `AsyncReplace` instance with the replacements made.
- Throws a `TypeError` if:
  - `replacements` parameter is not an array of objects.
  - Any search or replace values are undefined or null.

#### Example: Simulating Delay in ReplaceMany

```js
const inputText = "The quick brown fox jumps over the lazy dog.";
const asyncReplacer = new AsyncReplace(inputText);

(async () => {
  try {
    const replacements = [
      { search: "quick", replace: async () => {
        // Simulate a delay, e.g., an asynchronous database query.
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "fast";
      }},
      { search: /brown/, replace: "red" },
      { search: "fox", replace: "rabbit" },
    ];

    const newString = await asyncReplacer.replaceMany(replacements);
    console.log(newString.toString()); // Output after 2 seconds: "The fast red rabbit jumps over the lazy dog."
  } catch (error) {
    console.error(error);
  }
})();
```

## Method: replaceAllMany

### `async replaceAllMany(replacements: { search: string | RegExp, replace: string | ((match: string, ...args: any[]) => Promise<string> | string) }[]): Promise<AsyncReplace>`

- Asynchronously replaces multiple substrings or regular expressions in the string with their corresponding replacements using the `replaceAll` method.
- Parameters:
  - `replacements` (array of objects): An array of objects containing the search string or regular expression, and its corresponding replacement string or function to be executed.
- Returns a `Promise<AsyncReplace>`: A new `AsyncReplace` instance with the replacements made.
- Throws a `TypeError` if:
  - `replacements` parameter is not an array of objects.
  - Any search or replace values are undefined or null.

#### Example: Simulating Delay in ReplaceAllMany

```js
const inputText = "The quick brown fox jumps over the lazy dog.";
const asyncReplacer = new AsyncReplace(inputText);

(async () => {
  try {
    const replacements = [
      { search: "quick", replace: async () => {
        // Simulate a delay, e.g., an asynchronous database query.
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "fast";
      }},
      { search: /brown/, replace: "red" },
      { search: "fox", replace: "rabbit" },
    ];

    const newString = await asyncReplacer.replaceAllMany(replacements);
    console.log(newString.toString()); // Output after 2 seconds: "The fast red rabbit jumps over the lazy dog."
  } catch (error) {
    console.error(error);
  }
})();
```

## Method: toString

### `toString(): string`

- Returns the input string used to create the instance of `AsyncReplace`.
- Returns a `string`: The input string.

---

This documentation provides an overview of the `AsyncReplace` class and its methods, including their descriptions, parameters, return types, potential exceptions and examples that simulate delays for illustrative purposes. Use this documentation as a reference when working with the `AsyncReplace` class.
