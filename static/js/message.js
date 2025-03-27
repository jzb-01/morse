// Import necessary functions from functions.js
import { beep, delay } from './functions.js'

// Select relevant DOM elements
let playButton = document.getElementById('play');
let stopButton = document.getElementById('stop');
let time = document.getElementById('time_unit');
let time_range = document.getElementById('time_unit_value');
let message = document.getElementById('message').textContent;
let audioCtx = null; // Initialize audio context for sound playback
let interrupt = false; // Flag to handle interruptions

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

  for (let x = 0; x < message.length; x++) {
    if (interrupt) {
      // Stop playback if interrupted
      interrupt = false;
      playButton.disabled = false;
      return;
    }

    // Play corresponding sound for dots and dashes
    if (message[x] === '.') {
      beep(audioCtx, time_unit);
      await delay(time_unit);
    } else if (message[x] === '-') {
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

// Handle stop button click - Interrupts playback
stopButton.addEventListener('click', function() {
  interrupt = true;
  stopButton.disabled = true;
});
