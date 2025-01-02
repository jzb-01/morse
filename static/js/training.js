// Imports from data.js
import { dictionary, alphabet, numbers, specialCharacters } from './data.js';
// Imports from functions.js
import { audioCtx, beep, delay } from './functions.js';
// Listas seleccionadas por el usuario
let list = [];
document.getElementById('alphabet').addEventListener('change', function() {
    if (this.checked) {
        list = list.concat(alphabet);
    } else {
        list = list.filter(item => !alphabet.includes(item));
    }
    console.log(list);
});

document.getElementById('numbers').addEventListener('change', function() {
    if (this.checked) {
        list = list.concat(numbers);
    } else {
        list = list.filter(item => !numbers.includes(item));
    }
    console.log(list);
});

document.getElementById('special').addEventListener('change', function() {
    if (this.checked) {
        list = list.concat(specialCharacters);
    } else {
        list = list.filter(item => !specialCharacters.includes(item));
    }
    console.log(list);
});
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
//Training variables
let time_unit = Number(document.getElementById("time_unit").value);
//Training function
document.getElementById('practice').addEventListener('click', async function() {
let level = 2;
let accuracy = 0;
let koch = [];
while (level <= list.length)
{
    while (accuracy < 90)
    {
        //Selección del item al azar
        let random = Math.floor(Math.random() * level);
        // Almacenamiento de item seleccionado
        koch.push(list[random]);
        //Reproducción de ítem seleccionado
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
    //Comprobación del porcentaje de aciertos
    level++;
    accuracy = 0;
    let koch_input = document.getElementById("koch_input").value;
}
document.getElementById("koch_input").addEventListener("keydown", function () {
    if (koch.length >= 20 && koch.length == koch_input.length)
    {
        for (let x = koch.length-20; x < koch.length; x++)
        {
            if (koch[x] == koch_input[x])
            {
                accuracy = accuracy + 5;
            }
        }
    } 
})
});
