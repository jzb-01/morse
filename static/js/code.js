import { audioCtx, beep, delay } from './functions.js'

let table_name = document.querySelector('h1');
let right_button = document.getElementById("right");
let left_button = document.getElementById("left");
let table_1 = document.getElementById('table_1');
let table_2 = document.getElementById('table_2');
let table_3 = document.getElementById('table_3');
right_button.addEventListener('click', function() {
  if (table_1.style.display === "table")
  {
    table_1.style.display = "none";
    table_name.textContent = 'Numbers'
    table_2.style.display = "table";
  }
  else if (table_2.style.display === "table")
  {
    table_2.style.display = "none";
    table_name.textContent = 'Symbols'
    table_3.style.display = "table";
  }
  else if (table_3.style.display === "table")
    {
      table_3.style.display = "none";
      table_name.textContent = 'Letters'
      table_1.style.display = "table";
    }
});
left_button.addEventListener('click', function() {
  if (table_1.style.display === "table")
  {
    table_1.style.display = "none";
    table_name.textContent = 'Symbols'
    table_3.style.display = "table";
  }
  else if (table_2.style.display === "table")
  {
    table_2.style.display = "none";
    table_name.textContent = 'Letters'
    table_1.style.display = "table";
  }
  else if (table_3.style.display === "table")
    {
      table_3.style.display = "none";
      table_name.textContent = 'Numbers'
      table_2.style.display = "table";
    }
});
let playButtons = document.querySelectorAll('table button');
playButtons.forEach(button => {
button.addEventListener('click', async function(){
  let morseCode = button.parentElement.previousElementSibling.textContent;
  let time_unit = Number(document.getElementById("time_unit").value);
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  for (let x = 0; x < morseCode.length; x++)
  {
    if (morseCode[x] == '.')
      {
          beep(time_unit);
          await delay(time_unit);
      }
      else if (morseCode[x] == '-')
      {
          beep(time_unit*3);
          await delay(time_unit*3);
      }
      await delay(time_unit);
  }

})});