/**
 * Convert a string with spaces, underscores, camelCase, or other delimiters into kebab-case.
 *
 * Examples:
 *   toKebabCase("HelloWorld")             -> "hello-world"
 *   toKebabCase("  multiple   spaces  ") -> "multiple-spaces"
 *   toKebabCase("snake_case_example")    -> "snake-case-example"
 *   toKebabCase("XMLHttpRequest")        -> "xml-http-request"
 *
 * Throws:
 *   TypeError when input is null/undefined or not a string.
 */
function toKebabCase(input) {
    // Reject null/undefined explicitly with descriptive errors
    if (input === null || input === undefined) {
        throw new TypeError('toKebabCase: input is null or undefined');
    }

    // Ensure input is a string
    if (typeof input !== 'string') {
        throw new TypeError(`toKebabCase: expected a string but received ${typeof input}`);
    }

    // Trim leading/trailing whitespace early
    let str = input.trim();

    // If the trimmed string is empty, return an empty string (clean output)
    if (str === '') return '';

    // 1) Split camelCase boundaries where a lowercase/number is followed by an uppercase (e.g., "helloWorld" -> "hello-World")
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

    // 2) Split boundaries in sequences of uppercase followed by a capital+lowercase (e.g., "XMLHttp" -> "XML-Http")
    str = str.replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1-$2');

    // 3) Replace any run of non-alphanumeric characters (spaces, underscores, punctuation, etc.) with a hyphen
    str = str.replace(/[^A-Za-z0-9]+/g, '-');

    // 4) Collapse multiple consecutive hyphens into one
    str = str.replace(/-+/g, '-');

    // 5) Remove leading/trailing hyphens that may have been introduced
    str = str.replace(/^-|-$/g, '');

    // 6) Return the result in lowercase for canonical kebab-case
    return str.toLowerCase();
}

/* ---------------------------
     Example usages and error handling
     --------------------------- */

// Normal conversions
console.log(toKebabCase('HelloWorld'));                     // -> "hello-world"
console.log(toKebabCase('  multiple   spaces  '));         // -> "multiple-spaces"
console.log(toKebabCase('snake_case_example'));            // -> "snake-case-example"
console.log(toKebabCase('XMLHttpRequest'));                // -> "xml-http-request"
console.log(toKebabCase('already-kebab-case'));            // -> "already-kebab-case"
console.log(toKebabCase('mixed-DELIMITERS_and Spaces!'));  // -> "mixed-delimiters-and-spaces"
console.log(toKebabCase(''));                              // -> ""

// Error examples
try {
    toKebabCase(null);
} catch (err) {
    console.error(err.message); // -> "toKebabCase: input is null or undefined"
}

try {
    toKebabCase(123);
} catch (err) {
    console.error(err.message); // -> "toKebabCase: expected a string but received number"
}

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toKebabCase;
}