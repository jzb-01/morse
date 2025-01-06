// Imports from data.js
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
// Imports from functions.js
import { audioCtx, beep, delay, checkls } from './functions.js';
// Listas seleccionadas por el usuario
let list = [];
checkls('alphabet', alphabet, list);
checkls('numbers', numbers, list);
checkls('special', specialCharacters, list);
// Tiempo seleccionado por el usuario
let time_unit;
document.getElementById("time_unit").addEventListener("change", function() {
    if (isNaN(time_unit)) {
        time_unit = Number(document.getElementById("time_unit").value);
    }
})
// Lista chocolateada
document.getElementById('start').addEventListener('click', function() {
    for (let x = list.length-1; x >= 0; x--)
        {
            let random = Math.floor(Math.random() * list.length);
            let buffer = list[x];
            list[x] = list[random];
            list[random] = buffer;
        }
    console.log(list);
});
//Training function
document.getElementById('practice').addEventListener('click', async function() {
//Reproducción de ítem seleccionado
if (audioCtx.state === 'suspended') {
    audioCtx.resume();
}
let level = 2;
let accuracy = 0;
let koch = [];
let user_input = [];
document.getElementById("koch_input").addEventListener('change', function() {
    //Actualización de variable
    user_input =  document.getElementById("koch_input").value;
    //Comprobación del porcentaje de aciertos
    for (let x = koch.length-20; x < koch.length; x++)
    {
        if (koch[x] == user_input[x])
        {
            accuracy = accuracy+5
        }
    }
});
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
            }
            else if (item[x] == '-')
            {
                beep(time_unit*3);
            }
            await delay(time_unit);
        }
        await delay(time_unit*3);
    }
    level++;
    accuracy = 0;
}
});
