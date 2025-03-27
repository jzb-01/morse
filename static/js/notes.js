// Import functions for sound and delay management
import { beep, delay } from './functions.js';

// === Element References ===
const notesSelect = document.getElementById("notes_select");
const notesButton = document.getElementById("notes_button");
const noteContent = document.getElementById("note_content");
const playButton = document.getElementById("play_button");
const stopButton = document.getElementById("stop_button");
const restartButton = document.getElementById("restart_button");
const timeUnitSetting = document.getElementById('time_unit_settings');

// === Variables ===
let interrupt = false;
let timeUnit = Number(timeUnitSetting.value);
let audioCtx = null; // Initialize audio context for sound playback

// === Time Unit Update ===
timeUnitSetting.addEventListener("input", (event) => {
  document.getElementById('time_unit_value').textContent = event.target.value;
  timeUnit = Number(event.target.value);
});

// === Select Input Validation ===
notesSelect.addEventListener('input', function() {
  // If no option is selected (value is empty), disable the button
    if (notesSelect.value === "") {
        notesButton.disabled = true;
    } else {
        // Enable the button if a selection is made
        notesButton.disabled = false;
    }
});

// Enable play button if log content exists
if (noteContent.innerHTML !== ""){
  playButton.disabled = false;
}; 

// === Playback Logic ===
async function playMorseCode() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  playButton.disabled = true;
  stopButton.disabled = false;
  restartButton.disabled = false;

  for (let x = 0; x < noteContent.innerHTML.length; x++) {
    if (interrupt) {
      interrupt = false;
      return;
    }

    const char = noteContent.innerHTML[x];
    if (char === '.') {
      beep(audioCtx, timeUnit);
      await delay(timeUnit);
    } else if (char === '-') {
      beep(audioCtx, timeUnit * 3);
      await delay(timeUnit * 3);
    }
    await delay(timeUnit);
  }

  stopButton.disabled = true;
  restartButton.disabled = true;
}

// === Event Listeners ===
playButton.addEventListener('click', playMorseCode);

stopButton.addEventListener('click', async function() {
  stopButton.disabled = true;
  restartButton.disabled = true;
  interrupt = true;
  await delay(4000);
  playButton.disabled = false;
});

restartButton.addEventListener('click', async function() {
  stopButton.disabled = true;
  restartButton.disabled = true;
  interrupt = true;
  await delay(4000);
  stopButton.disabled = false;
  restartButton.disabled = false;
  await playMorseCode();
});
