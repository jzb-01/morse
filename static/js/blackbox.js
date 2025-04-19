// ===== Imports =====
import { beep, delay } from './functions.js';

// ===================== VARIABLE DECLARATIONS =====================
let blackboxSelect = document.getElementById("blackbox_select");
let blackboxButton = document.getElementById("blackbox_button");
let logContent = document.getElementById("log_content");
let playButton = document.getElementById("play_button");
let stopButton = document.getElementById("stop_button");
let restartButton = document.getElementById("restart_button");
let timeUnitSetting = document.getElementById('time_unit_settings');
let timeUnit = Number(timeUnitSetting.value);
let audioCtx = null; // Audio context for sound playback
let interrupt = false; // Flag to handle interruptions

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

// === Enable play button if log content exists ===
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
