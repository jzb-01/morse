// ===== Imports =====
import { beep, delay } from './functions.js';

// ===================== VARIABLE DECLARATIONS =====================
let table_name = document.querySelector('h1');
let right_button = document.getElementById('right');
let left_button = document.getElementById('left');
let table_1 = document.getElementById('table_1');
let table_2 = document.getElementById('table_2');
let table_3 = document.getElementById('table_3');
let playButtons = document.querySelectorAll('table button');
let audioCtx = null; // Audio context for sound playback

// === Handle right button click to cycle forward through tables ===
right_button.addEventListener('click', function() {
  if (table_1.style.display === 'table') {
    table_1.style.display = 'none';
    table_name.textContent = 'Numbers';
    table_2.style.display = 'table';
  } else if (table_2.style.display === 'table') {
    table_2.style.display = 'none';
    table_name.textContent = 'Symbols';
    table_3.style.display = 'table';
  } else if (table_3.style.display === 'table') {
    table_3.style.display = 'none';
    table_name.textContent = 'Letters';
    table_1.style.display = 'table';
  }
});

// === Handle left button click to cycle backward through tables ===
left_button.addEventListener('click', function() {
  if (table_1.style.display === 'table') {
    table_1.style.display = 'none';
    table_name.textContent = 'Symbols';
    table_3.style.display = 'table';
  } else if (table_2.style.display === 'table') {
    table_2.style.display = 'none';
    table_name.textContent = 'Letters';
    table_1.style.display = 'table';
  } else if (table_3.style.display === 'table') {
    table_3.style.display = 'none';
    table_name.textContent = 'Numbers';
    table_2.style.display = 'table';
  }
});

// === Play the Morse code sound when a button is clicked ===
playButtons.forEach(button => {
  button.addEventListener('click', async function() {
    // Disable all buttons to prevent multiple clicks
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);

    // Initialize audio context if not already done
    if (audioCtx == null) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Extract Morse code and time unit from input
    let morseCode = button.parentElement.previousElementSibling.textContent;
    let time_unit = Number(document.getElementById('time_unit').value);

    // Play the Morse code sound
    for (let x = 0; x < morseCode.length; x++) {
      if (morseCode[x] === '.') {
        beep(audioCtx, time_unit);
        await delay(time_unit);
      } else if (morseCode[x] === '-') {
        beep(audioCtx, time_unit * 3);
        await delay(time_unit * 3);
      }
      await delay(time_unit);
    }

    // Re-enable all buttons after playback
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  });
});

// === Update displayed time unit value when input changes ===
document.getElementById('time_unit').addEventListener('input', function() {
  document.getElementById('time_unit_value').innerHTML = document.getElementById('time_unit').value;
});






