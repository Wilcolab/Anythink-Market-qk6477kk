function toCamelCase(str) {
    // Handle empty or invalid input
    if (!str) return '';

    // Replace common separators (space, underscore, hyphen) with space
    // and split into words
    const words = str.replace(/[-_\s]+/g, ' ').split(' ');

    // Convert first word to lowercase
    let result = words[0].toLowerCase();

    // Capitalize first letter of remaining words and add them
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        result += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return result;
}

// Test cases
console.log(toCamelCase('first name'));     // firstName
console.log(toCamelCase('user_id'));        // userId
console.log(toCamelCase('SCREEN_NAME'));    // screenName
console.log(toCamelCase('mobile-number'));   // mobileNumber