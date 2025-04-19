// ===== Imports =====
import { dictionary, reverse_dictionary } from './data.js';
import { beep, delay } from './functions.js';

// ===================== VARIABLE DECLARATIONS =====================
let playButton = document.getElementById('play');
let stopButton = document.getElementById('stop');
let time = document.getElementById('time_unit');
let time_range = document.getElementById('time_unit_value');
let text_box = document.getElementById('translator_text');
let morse_box = document.getElementById('translator_morse');
let audioCtx = null; // Audio context for sound playback
let interrupt = false; // Flag to handle interruptions

// === Text to Morse Translation ===
text_box.addEventListener('input', () => {
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
    
    // Handle the play button
    if (morse_box.value == ""){
        playButton.disabled = true;
      }
    else{
        playButton.disabled = false;
      }
});

// === Morse to Text Translation ===
morse_box.addEventListener('input', () => {
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
    
    // Handle the play button
    if (morse_box.value == ""){
      playButton.disabled = true;
    }
    else{
      playButton.disabled = false;
    }
});

// === Morse Code Playback (Play/Stop Buttons) ===

// Update time range display when the input changes
time.addEventListener('input', function() {
  time_range.textContent = time.value;
});

// Handle play button click - Plays the Morse code message using beeps
playButton.addEventListener('click', async function() {
  playButton.disabled = true;
  stopButton.disabled = false;
  
  let time_unit = Number(time.value);
  
  // Initialize audio context if not already done
  if (audioCtx == null) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  for (let x = 0; x < morse_box.value.length; x++) {
    if (interrupt) {
      // Stop playback if interrupted
      interrupt = false;
      playButton.disabled = false;
      return;
    }

    // Play corresponding sound for dots and dashes
    if (morse_box.value[x] === '.') {
      beep(audioCtx, time_unit);
      await delay(time_unit);
    } else if (morse_box.value[x] === '-') {
      beep(audioCtx, time_unit * 3);
      await delay(time_unit * 3);
    }

    // Pause between signals
    await delay(time_unit);
  }

  // Re-enable play button and disable stop button after playback
  playButton.disabled = false;
  stopButton.disabled = true;
});

// === Handle stop button click - Interrupts playback ===
stopButton.addEventListener('click', function() {
  interrupt = true;
  stopButton.disabled = true;
});
