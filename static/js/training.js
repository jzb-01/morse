// Imports from data.js
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
// Imports from functions.js
import { audioCtx, beep, delay, checkls } from './functions.js';
// Variable declarations
let time_ms = document.getElementById("time_unit");
let start_button = document.getElementById('start');
let vls = document.getElementById("visible_ls");
let k_input = document.getElementById("koch_input");


// User settings
/// Selected characters
let list = [];
checkls('alphabet', alphabet, list);
checkls('numbers', numbers, list);
checkls('special', specialCharacters, list);


// Training function
start_button.addEventListener('click', async function() {
    /// Pre-settings
    //// Variable declarations
    let level = 2;
    let accuracy = 0;
    let koch = [];
    let user_input = [];
    let visible_list = [];
    let time_unit;
    //// Time unit set
    if (isNaN(time_unit)) {
        time_unit = Number(time_ms.value);
    }
    //// Scrambled characters
    for (let x = list.length-1; x >= 0; x--)
        {
            let random = Math.floor(Math.random() * list.length);
            let buffer = list[x];
            list[x] = list[random];
            list[random] = buffer;
        }
    console.log(list);
    //// Displayed characters
    for (let x = 0; x < level; x++)
    {
        visible_list.push(list[x]);
    }
    vls.innerHTML = visible_list.join("<br>");


    /// Koch training
    //// Audio context initialization
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    //// Morse output
    while (level <= list.length)
    {
        while (accuracy < 90)
        {
            //Selección del item al azar
            let random = Math.floor(Math.random() * level);
            // Almacenamiento de item seleccionado
            koch.push(list[random]);
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
        level++;
        accuracy = 0;
        const messageContainer = document.getElementById("message");
        const messages = document.createElement("div");
        messages.innerText = "you pass";
        messageContainer.appendChild(messages);
        setTimeout(() => {
            messages.style.display = "none";
        }, 3000);
        await delay(3000);
    }
    //// Input evaluation
    k_input.addEventListener('change', function() {
        ///// Full input update
        user_input =  document.getElementById("koch_input").value;
        ///// Full input evaluation
        for (let x = koch.length-20; x < koch.length; x++)
        {
            if (koch[x] == user_input[x])
            {
                accuracy = accuracy+5
            }
        }
    });
});
