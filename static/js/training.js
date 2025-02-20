// Imports from data.js
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
// Imports from functions.js
import { audioCtx, beep, delay, checkls } from './functions.js';
// Variable declarations
let time_unit = document.getElementById("time_unit");
let user_input = document.getElementById("user_input");
let start_button = document.getElementById('start');
let evaluation_button = document.getElementById("evaluation");
let stop_button = document.getElementById("stop");
let visible_list = document.getElementById("visible_ls");
let morse_output = [];
let list = [];
let level = 1;
let stop = false;

time_unit.addEventListener("input", function(event){
    document.getElementById('time_unit_value').textContent = event.target.value;
});


// User settings
/// Selected characters
checkls('alphabet', alphabet, list);
checkls('numbers', numbers, list);
checkls('special', specialCharacters, list);

//// Input evaluation
evaluation_button.addEventListener('click', function() {
    
    ///// Full input evaluation
    for (let x = 0; x < morse_output.length; x++)
    {
        if (morse_output[x] == user_input[x])
        {
            accuracy += 2;
        }
    }
    if (accuracy >= 90)
        {
            level++;
        }
    accuracy = 0;
    evaluation_button.disabled = true;
    });

//// Input evaluation
stop_button.addEventListener('click', function() {
    
    level = 1;
    for (let x = list.length-1; x >= 0; x--)
    {
        let random = Math.floor(Math.random() * list.length);
        let buffer = list[x];
        list[x] = list[random];
        list[random] = buffer;
    }
    if (evaluation_button.disabled == false)
    {
        evaluation_button.disabled = true;
    }
    visible_list.value = '';
    user_input.value = '';
    morse_output.value = '';
    stop = true;
    });

// Training function
start_button.addEventListener('click', async function() {
    morse_output.value = '';
    visible_list.value = '';
    user_input.value = '';
    if (list.length == 0)
    {
        alert('Check at least one box')
        return;
    }
    else
    {
        //// Displayed characters
        for (let x = 0; x <= level; x++)
        {
            visible_list.value += "list[x]" + " ";
        }

        /// Koch training
        //// Audio context initialization
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        //// Morse output
        for (let x = 0; x < 50; x++)
        {
            if (stop == true)
                {
                    stop = false;
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
                let random = Math.floor(Math.random() * level);
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
        document.getElementById("evaluation").disabled = false; 
    }
});
