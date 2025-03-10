import { beep, delay } from './functions.js'

let playButton = document.getElementById('play');
let stopButton = document.getElementById('stop');
let interrupt = false;
let message = document.getElementById("message").dataset.message;
let time = document.getElementById('time_unit');
let time_range = document.getElementById('time_unit_value');
time.addEventListener('input', function(){
    time_range.textContent = time.value;
});

playButton.addEventListener('click', async function(){
  playButton.disabled = true;
  stopButton.disabled = false;
  let time_unit = Number(document.getElementById("time_unit").value);
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  for (let x = 0; x < message.length; x++)
  {
    if (interrupt == true)
    {
      interrupt = false;
      playButton.disabled = false;
      return;
    }
    else
    {
      if (message[x] == '.')
        {
            beep(audioCtx, time_unit);
            await delay(time_unit);
        }
      else if (message[x] == '-')
        {
            beep(audioCtx, (time_unit*3));
            await delay(time_unit*3);
        }
      await delay(time_unit);
    }
  }
  playButton.disabled = false;
  stopButton.disabled = true;
});
stopButton.addEventListener('click', async function(){
  interrupt = true;
  stopButton.disabled = true;
})