// Imports from data.js
import dictionary from './data.js';
// Listas disponibles para entrenamiento
const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialCharacters = [
    '.', ',', '?', "'", '!', '/', '(', ')', '&', 
    ':', ';', '=', '+', '-', '_', '"', '$', '@'
  ];
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
//Training
let time_unit = document.getElementById("time").value;
document.getElementById('practice').addEventListener('click', function() {
let level = 2;
let accuracy;
let koch = [];
while (koch.length != 20 && accuracy < 90)
{
    let item = dictionary[list[Math.floor(Math.random() * level)]];
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    for (let x = 0; x < item.length; x++)
    {
        if (item[x] == '.')
        {
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            setTimeout(() => oscillator.stop(), time_unit);
        }
        else if (item[x] == '-')
        {
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            setTimeout(() => oscillator.stop(), time_unit*3);
        }
    }
    
}
});
