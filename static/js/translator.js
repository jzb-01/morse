const dictionary = {'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',  
  'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
  'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---', 
  'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',   
  'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
  'Z': '--..',

  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',

  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.',  '(': '-.--.',  ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-',  '+': '.-.-.',  '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};
const reverse_dictionary = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
  '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
  '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'",
  '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&',
  '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-',
  '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@', '/': ' '
};
let input_text = document.getElementById("translator_text");
let input_morse = document.getElementById("translator_morse");
input_text.addEventListener("input", function(event){
    let text_value = event.target.value;
    let morsecode = "";
    for (let x = 0; x < text_value.length; x++)
    {
      let characters = text_value[x];
      let character = characters.toUpperCase();
      morsecode += dictionary[character] + " ";
    }
    input_morse.value = morsecode;
});
input_morse.addEventListener("input", function(event){
  const allowed_characters = ['.', '-', '/', ' '];
  let input_value = event.target.value;
  let filter = "";
  let textcode = "";
  let buffer = "";
  for (let x = 0; x < input_value.length; x++)
  {
    if (allowed_characters.includes(input_value[x]))
    {
      if (input_value[x] === ' ')
      {
        if (filter.endsWith(' '))
        {
          continue;
        }
        else
        {
          filter += input_value[x];
        }
      }
      else
      {
        filter += input_value[x];
      }
    }
  }
  input_value = filter;
  event.target.value = filter;
  for (let x = 0; x < input_value.length; x++)
  {
    buffer += input_value[x];
    if (input_value[x] == '/')
      {
        let temp_buffer = buffer.slice(0, buffer.length - 1);
        if (reverse_dictionary.hasOwnProperty(temp_buffer))
        {
          textcode += reverse_dictionary[temp_buffer];
          textcode += ' ';
          buffer = '';
        }
        else
        {
          textcode += '<b>' + buffer + '</b>';
          textcode += ' ';
        }
      }
    else if (input_value[x] == ' ')
      {
        let temp_buffer = buffer.slice(0, buffer.length - 1);
        if (reverse_dictionary.hasOwnProperty(temp_buffer))
        {
          textcode += reverse_dictionary[temp_buffer];
          buffer = '';
        }
        else
        {
          textcode += '<b>' + buffer + '</b>';
        }
      }
    else if (x == input_value.length-1)
      {
        if (reverse_dictionary.hasOwnProperty(buffer))
        {
          textcode += reverse_dictionary[buffer];
          buffer = '';
        }
        else
          {
            textcode += '<b>' + buffer + '</b>';
          }
      }
  }
  input_text.value = textcode;
  });
