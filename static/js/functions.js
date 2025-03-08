const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(audio, duration) {
    const oscillator = audio.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audio.currentTime);
    oscillator.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), duration);
}

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function checkls(element_id, characters, final_list, display) {
    document.getElementById(element_id).addEventListener('change', function() {
        if (document.getElementById('alphabet').checked == false && document.getElementById('numbers').checked == false && document.getElementById('special').checked == false)
        {
            console.log("hdksjf");
            this.checked = true;
            return;
        }
        if (this.checked) {
            characters.forEach(item => {
                if (!final_list.includes(item)) {
                    final_list.push(item);
                }
            });
        } else {
            characters.forEach(item => {
                const index = final_list.indexOf(item);
                if (index > -1) {
                    final_list.splice(index, 1);
                }
            });
        }
        if (final_list.length !== 0)
        {
            for (let x = final_list.length-1; x >= 0; x--)
                {
                    let random = Math.floor(Math.random() * final_list.length);
                    let buffer = final_list[x];
                    final_list[x] = final_list[random];
                    final_list[random] = buffer;
                }
        }
        display.innerHTML = '';
        display.innerHTML += final_list[0] + ' ';
        display.innerHTML += final_list[1] + ' ';
        console.log(final_list);
    });
}

export { audioCtx, beep, delay, checkls };