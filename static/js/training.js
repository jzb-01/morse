// Imports from data.js
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
// Imports from functions.js
import { audioCtx, beep, delay, checkls } from './functions.js';
// Variable declarations
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
let continue_button = document.getElementById("continue");
let try_again_button = document.getElementById("try_again");
let quit_button = document.getElementById("quit");
let finish_button = document.getElementById("finish");
let morse_output = [];
let list = [...alphabet];
let level = 1;
let interrupt = false;
let accuracy = 0;


for (let x = list.length-1; x > 0; x--)
{
    let random = Math.floor(Math.random() * list.length);
    let buffer = list[x];
    list[x] = list[random];
    list[random] = buffer;
}
visible_list.innerHTML = list[0] + ' ' + list[1] + ' ';
console.log(list);
// Time unit number update
time_unit_setting.addEventListener("input", function(event){
    document.getElementById('time_unit_value').textContent = event.target.value;
    time_unit = Number(time_unit_setting.value);
});

// Selected characters
checkls('alphabet', alphabet, list, visible_list);
checkls('numbers', numbers, list, visible_list);
checkls('special', specialCharacters, list, visible_list);


//Main buttons
///Start
start_button.addEventListener('click', function(){
    restart_button.disabled = false;
    stop_button.disabled = false;
    training();
});
///Stop
stop_button.addEventListener('click', async function(){
    interrupt = true;
    wait.style.display = "block";
    await delay(time_unit*4)
    interrupt = false;
    evaluation_button.disabled = true;
    restart_button.disabled = true;
    stop_button.disabled = true;
    quit();
    wait.style.display = "none";
});
///Restart
restart_button.addEventListener('click', async function(){
    interrupt = true;
    wait.style.display = "block";
    await delay(time_unit*4)
    interrupt = false;
    evaluation_button.disabled = true;
    restart_button.disabled = true;
    stop_button.disabled = true;
    restart();
})
///Evaluation
evaluation_button.addEventListener('click', function() {
    continue_button.disabled = false;
    for (let x = 0; x < morse_output.length; x++)
    {
        if (morse_output[x] == user_input.value[x])
        {
            accuracy += 2;
        }
    }
    if (accuracy >= 90)
        {
            if (level == list.length-1)
            {
                accuracy_report.innerHTML = "!Congratulations you finish the set! !your accuracy was: " + accuracy + "!";
                continue_button.disabled = true;
                try_again_button.disabled = true;
                quit_button.disabled = true;
                finish_button.disabled = false;
            }
            else
            {
                accuracy_report.innerHTML = "!Congratulations your accuracy was: " + accuracy + "!";
                continue_button.disabled = true;
            }
        }
    else
        {
            accuracy_report.innerHTML = "Sorry your accuracy was: " + accuracy + ":(";
            continue_button.disabled = true;
        }
    report.style.display = "block";
    evaluation_button.disabled = true;
    accuracy = 0;
    });

//Report Buttons
///Continue
continue_button.addEventListener('click', function(){
    level += 1;
    visible_list.innerHTML += list[level];
    report.style.display = "none";
    training();
});
///Try again
try_again_button.addEventListener('click', function(){
    report.style.display = "none";
    restart();
});
///Quit
quit_button.addEventListener('click', function(){
    quit();
    report.style.display = "none";
});
finish_button.addEventListener('click', function(){
    quit();
    report.style.display = "none";
});

//// Stop training (goes back to level 1)
async function quit(){
    level = 1;
    for (let x = list.length-1; x > 0; x--)
    {
        let random = Math.floor(Math.random() * x);
        let buffer = list[x];
        list[x] = list[random];
        list[random] = buffer;
    }
    visible_list.innerHTML = '';
    visible_list.innerHTML += list[0] + '';
    visible_list.innerHTML += list[1] + '';
    user_input.value = '';
    morse_output = [];
};
async function restart(){
    user_input.value = '';
    morse_output = [];
    wait.style.display = "none";
    training();
};

// Training function
async function training() {
    morse_output = [];
    user_input.value = '';
     /// Koch training
    //// Audio context initialization
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    //// Morse output
    for (let x = 0; x < 50; x++)
    {
        if (interrupt == true)
            {
                interrupt = false;
                return;
            }
        if (x == 0 && level == 2)
        {
            // Almacenamiento de item seleccionado
            morse_output.push(list[0]);
            //Rreproduction
            let item = dictionary[list[0]];
            for (let x = 0; x < item.length; x++)
            {
                if (item[x] == '.')
                {
                    beep(time_unit);
                    await delay(time_unit);
                }
                else if (item[x] == '-')
                {
                    beep(time_unit*3);
                    await delay(time_unit*3);
                }
                await delay(time_unit);
            }
            await delay(time_unit*3);
        }
        else
        {
            //Selección del item al azar
            let random = Math.floor(Math.random() * (level+1));
            // Almacenamiento de item seleccionado
            morse_output.push(list[random]);
            //Rreproduction
            let item = dictionary[list[random]];
            for (let x = 0; x < item.length; x++)
            {
                if (item[x] == '.')
                {
                    beep(time_unit);
                    await delay(time_unit);
                }
                else if (item[x] == '-')
                {
                    beep(time_unit*3);
                    await delay(time_unit*3);
                }
                await delay(time_unit);
            }
            await delay(time_unit*3);
        }   
    }
    evaluation_button.disabled = false; 
};
