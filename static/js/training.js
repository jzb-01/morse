// ===== Imports =====
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
import { beep, delay, checkls } from './functions.js';

// ===== Variable Declarations =====
let time_unit_setting = document.getElementById("time_unit");
let time_unit = Number(time_unit_setting.value);
let user_input = document.getElementById("user_input");
let start_button = document.getElementById('start');
let stop_button = document.getElementById("stop");
let restart_button = document.getElementById("restart");
let evaluation_button = document.getElementById("evaluation");
let visible_list = document.getElementById("visible_ls");
let wait = document.getElementById("wait");
let report = document.getElementById("report");
let accuracy_report = document.getElementById("accuracy_report");
let celebration = document.getElementById('celebration');
let depression = document.getElementById('depression');
let graduation = document.getElementById('graduation');
let continue_button = document.getElementById("continue");
let try_again_button = document.getElementById("try_again");
let quit_button = document.getElementById("quit");
let finish_button = document.getElementById("finish");
let beep_count = document.getElementById("beep_count");
let level_count = document.getElementById("level_count");
let morse_output = [];
let list = [...alphabet];
let level = 1;
let interrupt = false;
let accuracy = 0;
let audioCtx = null;

// ===== Event Listeners =====
// Settings window control
document.getElementById('settings').addEventListener('click', () => document.getElementById('settings_window').style.display = "block");
document.getElementById('settings_done').addEventListener('click', () => document.getElementById('settings_window').style.display = "none");
document.getElementById('info').addEventListener('click', () => document.getElementById('info_window').style.display = "block");
document.getElementById('info_done').addEventListener('click', () => document.getElementById('info_window').style.display = "none");

// ===== Shuffle List =====
for (let x = list.length - 1; x > 0; x--) {
  let random = Math.floor(Math.random() * (x+1));
  [list[x], list[random]] = [list[random], list[x]];
}
visible_list.innerHTML = list[0] + ' ' + list[1] + ' ';

// ===== Time Unit Update =====
time_unit_setting.addEventListener("input", (event) => {
  document.getElementById('time_unit_value').textContent = event.target.value;
  time_unit = Number(event.target.value);
});

// ===== Character Selection =====
checkls('alphabet', alphabet, list, visible_list);
checkls('numbers', numbers, list, visible_list);
checkls('special', specialCharacters, list, visible_list);

// ===== Main Buttons =====
// Start Training
start_button.addEventListener('click', () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  start_button.disabled = true;
  restart_button.disabled = false;
  stop_button.disabled = false;
  training();
});

// Stop Training
stop_button.addEventListener('click', async () => {
  interrupt = true;
  wait.style.display = "block";
  await delay(4000);
  stop_button.disabled = true;
  restart_button.disabled = true;
  start_button.disabled = false;
  quit();
  wait.style.display = "none";
});

// Restart Training
restart_button.addEventListener('click', async () => {
  interrupt = true;
  wait.style.display = "block";
  await delay(4000);
  stop_button.disabled = false;
  evaluation_button.disabled = true;
  wait.style.display = "none";
  training();
});

// ===== Evaluation =====
evaluation_button.addEventListener('click', function() {

    start_button.disabled = true;
    stop_button.disabled = true;
    restart_button.disabled = true;
    evaluation_button.disabled = true;

    for (let x = 0; x < morse_output.length; x++) {
        if (user_input.value[x]) {
            if (morse_output[x] == user_input.value[x].toUpperCase()) {
                accuracy += 2;
            }
        }
    }

    if (accuracy >= 90) {
        if (level == (list.length - 1)) {
            accuracy_report.innerHTML = "Congratulations you finish the set, your accuracy was: " + accuracy + "%!";
            graduation.style.display = "block";
            try_again_button.style.display = "block";
            finish_button.style.display = "block";
        } else {
            accuracy_report.innerHTML = "Congratulations, your accuracy was: " + accuracy + "%!";
            celebration.style.display = "block"
            continue_button.style.display = "block";
            try_again_button.style.display = "block";
            quit_button.style.display = "block";
            console.log("you should be seen the three");
        }
    } else {
        accuracy_report.innerHTML = "Sorry, your accuracy was: " + accuracy + "%";
        depression.style.display = "block"
        try_again_button.style.display = "block";
        quit_button.style.display = "block";
    }

    report.style.display = "block";
    accuracy = 0;
});


// ===== Report Buttons =====
continue_button.addEventListener('click', () => {
  level++;
  visible_list.innerHTML += list[level] + ' ';
  restart_button.disabled = false;
  stop_button.disabled = false;
  report.style.display = "none";
  celebration.style.display = "none";
  depression.style.display = "none";
  graduation.style.display = "none";
  continue_button.style.display = "none";
  try_again_button.style.display = "none";
  quit_button.style.display = "none";
  finish_button.style.display = "none";
  training();
});

try_again_button.addEventListener('click', () => {
  restart_button.disabled = false;
  stop_button.disabled = false;
  report.style.display = "none";
  celebration.style.display = "none";
  depression.style.display = "none";
  graduation.style.display = "none";
  continue_button.style.display = "none";
  try_again_button.style.display = "none";
  quit_button.style.display = "none";
  finish_button.style.display = "none";
  training();
});

quit_button.addEventListener('click', () => {
  start_button.disabled = false;
  report.style.display = "none";
  celebration.style.display = "none";
  depression.style.display = "none";
  graduation.style.display = "none";
  continue_button.style.display = "none";
  try_again_button.style.display = "none";
  quit_button.style.display = "none";
  finish_button.style.display = "none";
  quit();
});

finish_button.addEventListener('click', () => {
    start_button.disabled = false;
    report.style.display = "none";
    celebration.style.display = "none";
    depression.style.display = "none";
    graduation.style.display = "none";
    continue_button.style.display = "none";
    try_again_button.style.display = "none";
    quit_button.style.display = "none";
    finish_button.style.display = "none";
    quit();
});


// ===== Quit Training =====
async function quit() {
  level = 1;
  for (let x = list.length - 1; x > 0; x--) {
    let random = Math.floor(Math.random() * (x+1));
    [list[x], list[random]] = [list[random], list[x]];
  }
  visible_list.innerHTML = list[0] + ' ' + list[1] + ' ';
  user_input.value = '';
  morse_output = [];
  beep_count.textContent = "";
  level_count.textContent = "";
}

// ===== Training Function =====
async function training() {
  morse_output = [];
  user_input.value = '';
  level_count.textContent = `${level}/${list.length-1}`;

  for (let x = 0; x < 50; x++) {
    if (interrupt == true) {
      interrupt = false;
      return;
    }
  
    beep_count.textContent = (x + 1) + "/50";
  
    let selectedItem;
    
    if (x == 0 && level == 1) {
      // Almacenamiento de item seleccionado
      selectedItem = list[0];
    } else {
      // Selección del item al azar
      let random = Math.floor(Math.random() * (level + 1));
      selectedItem = list[random];
    }
  
    morse_output.push(selectedItem);
  
    // Reproducción
    let item = dictionary[selectedItem];
    for (let i = 0; i < item.length; i++) {
      if (item[i] == '.') {
        beep(audioCtx, time_unit);
        await delay(time_unit);
      } else if (item[i] == '-') {
        beep(audioCtx, time_unit * 3);
        await delay(time_unit * 3);
      }
      await delay(time_unit);
    }
    
    await delay(time_unit * 2);
  }
  
  console.log(morse_output);
  stop_button.disabled = true;
  evaluation_button.disabled = false;
  
} 
