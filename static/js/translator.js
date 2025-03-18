// Imports from data.js
import { dictionary, reverse_dictionary} from './data.js';

// Variable declarations
const text_box = document.getElementById("translator_text");
const morse_box = document.getElementById("translator_morse");

// Text to Morse
text_box.addEventListener("input", function(){
  ///Translation
  let morse_translation = "";
  for (let x = 0; x < text_box.value.length; x++)
  {
    if (text_box.value[x] == "\n")
    {
      morse_translation += '\n';
    }
    else
    {
      if (dictionary.hasOwnProperty(text_box.value[x].toUpperCase()))
        {
          morse_translation += dictionary[text_box.value[x].toUpperCase()] + " ";
        }
        else
        {
          morse_translation += "#" + " ";
        }
    }
  }
  morse_box.value = morse_translation;
});

//Morse to Text
morse_box.addEventListener("input", function(event){
  //Translation
  let text_translation = "";
  let buffer = "";

  for (let x = 0; x < morse_box.value.length; x++)
  {
    if (morse_box.value[x] != " " && morse_box.value[x] != "/" && morse_box.value[x] != "\n")
    {
      buffer += morse_box.value[x];
    }
    else if (morse_box.value[x] == '/')
      {
        if (buffer)
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
        else
        {
          text_translation += ' ';
        }
      }
    else if (morse_box.value[x] == ' ')
      {
        if (buffer)
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
    else if (morse_box.value[x] == '\n')
      {
        if (buffer)
        {
          if (reverse_dictionary.hasOwnProperty(buffer))
            {
              text_translation += reverse_dictionary[buffer];
              text_translation += '\n'
              buffer = '';
            }
          else
            {
              text_translation += '#';
              text_translation += '\n'
              buffer = '';
            }
        }
        else
        {
          text_translation += '\n';
        }
      }
    if (x == (morse_box.value.length - 1))
      if (buffer)
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
  text_box.value = text_translation;
  });
