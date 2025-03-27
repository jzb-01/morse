// Import functions for sound and delay management
import { beep, delay } from './functions.js';

// === Element References ===
const blackboxSelect = document.getElementById("blackbox_select");
const blackboxButton = document.getElementById("blackbox_button");
const logContent = document.getElementById("log_content");
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
blackboxSelect.addEventListener('input', function() {
  // If no option is selected (value is empty), disable the button
    if (blackboxSelect.value === "") {
        blackboxButton.disabled = true;
    } else {
        // Enable the button if a selection is made
        blackboxButton.disabled = false;
    }
});

// Enable play button if log content exists
if (logContent.innerHTML !== ""){
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

  for (let x = 0; x < logContent.innerHTML.length; x++) {
    if (interrupt) {
      interrupt = false;
      return;
    }

    const char = logContent.innerHTML[x];
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
