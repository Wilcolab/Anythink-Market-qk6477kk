/**
 * Convert an input string to camelCase.
 *
 * Rules and behavior:
 *  - Trims leading and trailing whitespace.
 *  - Treats space, underscore (_) and hyphen (-) as token delimiters.
 *  - Collapses any sequence of delimiters into a single boundary between tokens.
 *  - Converts the first token to all lowercase.
 *  - Converts each subsequent token to lowercase with its first character uppercased.
 *  - Returns an empty string when the trimmed input is empty or contains only delimiters.
 *
 * Limitations and notes:
 *  - Delimiter detection and tokenization are ASCII-based (space, '_' and '-').
 *  - Capitalization uses simple char operations; locale-specific case rules are not applied.
 *  - Non-string inputs are rejected with a TypeError (see @throws).
 *
 * @function toCamelCase
 * @param {string} input - The string to convert. May contain spaces, underscores, hyphens or mixed casing.
 *                         Leading/trailing whitespace and sequences of delimiters are ignored.
 * @returns {string} The camelCased result. Examples:
 *                   - 'hello world'        -> 'helloWorld'
 *                   - '  Foo_BAR-baz  '    -> 'fooBarBaz'
 *                   - '___'                -> '' (only delimiters -> empty string)
 *                   - 'multiple   spaces--and__delims' -> 'multipleSpacesAndDelims'
 * @throws {TypeError} If input is null, undefined, or not a string. Error messages are descriptive:
 *                     - 'toCamelCase: input is null'
 *                     - 'toCamelCase: input is undefined'
 *                     - 'toCamelCase: expected a string but received <type>'
 *
 * @example
 * // Basic usage
 * toCamelCase('hello world'); // => 'helloWorld'
 *
 * @example
 * // Mixed delimiters and casing
 * toCamelCase('  Foo_BAR-baz  '); // => 'fooBarBaz'
 *
 * @example
 * // Empty/only-delimiters
 * toCamelCase('___'); // => ''
 *
 * @see toDotCase
 */

/**
 * Convert an input string to dot.case (lowercase tokens joined by dots).
 *
 * Rules and behavior:
 *  - Trims leading and trailing whitespace.
 *  - Inserts dots before ASCII uppercase letters to split camelCase words (e.g., 'fooBar' -> 'foo.Bar').
 *  - Splits the intermediate string on any run of whitespace, dot (.), underscore (_) or hyphen (-).
 *  - Collapses multiple adjacent delimiters into single token boundaries.
 *  - Converts every resulting token to lowercase and joins them with '.'.
 *  - Returns an empty string when the trimmed input is empty.
 *
 * Limitations and notes:
 *  - The camelCase splitting uses a simple ASCII uppercase regex ([A-Z]); it may not detect
 *    uppercase characters in non-Latin scripts or handle locale-specific case rules.
 *  - Existing dots in the input will be treated as separators along with spaces/underscores/hyphens.
 *  - Non-string inputs are rejected with a TypeError (see @throws).
 *
 * @function toDotCase
 * @param {string} input - The input to convert; may be camelCase, contain spaces, underscores, hyphens, or dots.
 * @returns {string} The dot.case result. Examples:
 *                   - 'hello world'   -> 'hello.world'
 *                   - 'fooBarBaz'     -> 'foo.bar.baz'
 *                   - '__FOO_BAR__'   -> 'foo.bar'
 * @throws {TypeError} If input is null, undefined, or not a string. Error messages are descriptive:
 *                     - 'toDotCase: input is null'
 *                     - 'toDotCase: input is undefined'
 *                     - 'toDotCase: expected a string but received <type>'
 *
 * @example
 * // Basic usage
 * toDotCase('hello world'); // => 'hello.world'
 *
 * @example
 * // Convert camelCase into dot.case
 * toDotCase('fooBarBaz'); // => 'foo.bar.baz'
 *
 * @example
 * // Mixed delimiters and uppercased segments
 * toDotCase('__FOO_BAR__'); // => 'foo.bar'
 *
 * @see toCamelCase
 */
 /* Convert a string to camelCase.
 * Handles spaces, underscores and hyphens as delimiters.
 * Trims whitespace, collapses multiple delimiters, and returns ''
 * when the input is empty or contains only delimiters.
 *
 * Throws descriptive errors for null/undefined/non-string inputs.
 *
 * Examples:
 *   toCamelCase('hello world')         // 'helloWorld'
 *   toCamelCase('  Foo_BAR-baz  ')     // 'fooBarBaz'
 *   toCamelCase('___')                 // ''
 *   toCamelCase('multiple   spaces--and__delims') // 'multipleSpacesAndDelims'
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input === null) {
        throw new TypeError('toCamelCase: input is null');
    }
    if (input === undefined) {
        throw new TypeError('toCamelCase: input is undefined');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toCamelCase: expected a string but received ${typeof input}`);
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Split on one or more of space, underscore or hyphen and remove empty tokens.
    const parts = trimmed.split(/[ _-]+/).filter(Boolean);
    if (parts.length === 0) return '';

    const [first, ...rest] = parts;
    const firstLower = first.toLowerCase();
    const restCamel = rest.map(part => {
        const lower = part.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return [firstLower, ...restCamel].join('');
}

// Export for Node.js consumers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toCamelCase;
}

// Example usages (uncomment to run)
// console.log(toCamelCase('hello world'));                 // 'helloWorld'
// console.log(toCamelCase('  Foo_BAR-baz  '));             // 'fooBarBaz'
// console.log(toCamelCase('___'));                         // ''
// console.log(toCamelCase('multiple   spaces--and__delims')); // 'multipleSpacesAndDelims'

// Error examples:
// toCamelCase(null);      // throws TypeError: input is null
// toCamelCase(123);       // throws TypeError: expected a string but received number

/**
 * Convert a string to dot.case format.
 * Handles spaces, underscores, hyphens and camelCase as delimiters.
 * Trims whitespace and returns '' when input is empty.
 * 
 * Examples:
 *   toDotCase('hello world')     // 'hello.world'
 *   toDotCase('fooBarBaz')       // 'foo.bar.baz'
 *   toDotCase('__FOO_BAR__')     // 'foo.bar'
 * 
 * @param {string} input 
 * @returns {string}
 */
function toDotCase(input) {
    if (input === null) {
        throw new TypeError('toDotCase: input is null');
    }
    if (input === undefined) {
        throw new TypeError('toDotCase: input is undefined'); 
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toDotCase: expected a string but received ${typeof input}`);
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Insert dots before capitals in camelCase
    const withDots = trimmed.replace(/([A-Z])/g, '.$1');
    
    // Split on dots, spaces, underscores or hyphens
    const parts = withDots.split(/[\s._-]+/).filter(Boolean);
    
    return parts.map(part => part.toLowerCase()).join('.');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toDotCase;
}


