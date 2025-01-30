// Imports from data.js
import { dictionary, reverse_dictionary} from './data.js';

// Variable declarations
let text_box = document.getElementById("translator_text");
let morse_box = document.getElementById("translator_morse");

// Text to Morse
text_box.addEventListener("input", function(event){
  /// Filter
  let buffer = '';
  for (let x = 0; x < text_box.value.length; x++)
  {
    if (dictionary.hasOwnProperty(text_box.value[x].toUpperCase()))
    {
      buffer += text_box.value[x].toUpperCase();
    }
  }
  text_box.value = buffer;
  ///Translation
  let morse_translation = "";
  for (let x = 0; x < text_box.value.length; x++)
  {
    morse_translation += dictionary[text_box.value[x]] + " ";
  }
  morse_box.value = morse_translation;
});

//Morse to Text
morse_box.addEventListener("input", function(event){

  // Filter
  morse_box.value = morse_box.value.trimStart();
  const validMorse = /^[.\- /]*$/;
  /// Remove invalid characters
  if (!validMorse.test(morse_box.value)) {
    morse_box.value = morse_box.value.replace(/[^.\- /]/g, '');
  }
  /// Replace multiple spaces with a single space
  morse_box.value = morse_box.value.replace(/\s{2,}/g, ' ');
  /// Adds a space before and after a slash
  morse_box.value = morse_box.value.replace(/ ?\/ ?/g, ' / ');

if (event.inputType === "deleteContentBackward" && morse_box.value.length >= 3 &&
    morse_box.value[morse_box.value.length-1] === " " &&
    morse_box.value[morse_box.value.length - 2] === "/" &&
    morse_box.value[morse_box.value.length - 3] === " ") {
  morse_box.value = morse_box.value.slice(0, - 3);
}
console.log("Cursor Position:", cursorPosition);
console.log("Characters around cursor:", morse_box.value.slice(cursorPosition - 3, cursorPosition + 1));

  //Translation
  
  let text_translation = "";
  let buffer = "";

  for (let x = 0; x < morse_box.value.length; x++)
  {
    if (morse_box.value[x] == '.' || morse_box.value[x] == '-')
    {
      buffer += morse_box.value[x];
    }
    else if (morse_box.value[x] == '/')
      {
        if (reverse_dictionary.hasOwnProperty(buffer))
        {
          text_translation += reverse_dictionary[buffer];
          text_translation += ' ';
          buffer = '';
        }
        else
        {
          text_translation += '#';
          text_translation += ' ';
          buffer = '';
        }
      }
    else if (morse_box.value[x] == ' ')
      {
        if (reverse_dictionary.hasOwnProperty(buffer))
        {
          text_translation += reverse_dictionary[buffer];
          buffer = '';
        }
        else
        {
          text_translation += '#';
          buffer = '';
        }
      }
  }
  if (!buffer)
  {
    return;
  }
  if (reverse_dictionary.hasOwnProperty(buffer))
    {
      text_translation += reverse_dictionary[buffer];
      buffer = '';
    }
  else
    {
      text_translation += '#';
      buffer = '';
    }
  text_box.value = text_translation;
  });
