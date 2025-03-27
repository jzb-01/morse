// Imports from data.js
import { dictionary, reverse_dictionary } from './data.js';

// Variable declarations
const text_box = document.getElementById("translator_text");
const morse_box = document.getElementById("translator_morse");

// ===============================
// Text to Morse Translation
// ===============================
text_box.addEventListener("input", function() {
  let morse_translation = "";

  // Loop through each character of the input text
  for (let x = 0; x < text_box.value.length; x++) {
    const char = text_box.value[x];

    if (char === "\n") {
      // Preserve new lines in translation
      morse_translation += '\n';
    } else {
      // Convert to uppercase for dictionary lookup
      const upperChar = char.toUpperCase();

      if (dictionary.hasOwnProperty(upperChar)) {
        // Append corresponding Morse code
        morse_translation += dictionary[upperChar] + " ";
      } else {
        // Use '#' for unknown characters
        morse_translation += "# ";
      }
    }
  }

  // Display the translated Morse code
  morse_box.value = morse_translation;
});

// ===============================
// Morse to Text Translation
// ===============================
morse_box.addEventListener("input", function() {
  let text_translation = "";
  let buffer = ""; // Temporary buffer to store Morse code characters

  // Loop through each character of the input Morse code
  for (let x = 0; x < morse_box.value.length; x++) {
    const char = morse_box.value[x];

    if (char !== " " && char !== "/" && char !== "\n") {
      // Build the Morse code character until a space, slash, or newline is found
      buffer += char;
    } else {
      // Handle character separation and spaces
      if (buffer) {
        if (reverse_dictionary.hasOwnProperty(buffer)) {
          text_translation += reverse_dictionary[buffer];
        } else {
          text_translation += '#'; // Use '#' for unknown Morse codes
        }
        buffer = ''; // Clear the buffer for the next character
      }

      if (char === '/') {
        text_translation += ' '; // Space between words
      } else if (char === '\n') {
        text_translation += '\n'; // Preserve new lines
      }
    }

    // Handle edge case for last character
    if (x === morse_box.value.length - 1 && buffer) {
      if (reverse_dictionary.hasOwnProperty(buffer)) {
        text_translation += reverse_dictionary[buffer];
      } else {
        text_translation += '#';
      }
    }
  }

  // Display the translated text
  text_box.value = text_translation;
});
