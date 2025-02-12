import { audioCtx, beep, delay } from './functions.js'

let playButton = document.getElementById('boton');
let message = document.getElementById("message").dataset.message;
let time = document.getElementById('time_unit');
let time_range = document.getElementById('time_unit_value');
time.addEventListener('change', function(){
    time_range.textContent = time.value
});

playButton.addEventListener('click', async function(){
  let time_unit = Number(document.getElementById("time_unit").value);
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  for (let x = 0; x < message.length; x++)
  {
    if (message[x] == '.')
      {
          beep(time_unit);
          await delay(time_unit);
      }
      else if (message[x] == '-')
      {
          beep(time_unit*3);
          await delay(time_unit*3);
      }
      await delay(time_unit);
  }

});