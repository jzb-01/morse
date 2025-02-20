const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(duration) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), duration);
}

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function checkls(element_id, characters, final_list) {
    document.getElementById(element_id).addEventListener('change', function() {
        if (this.checked) {
            characters.forEach(item => {
                if (!final_list.includes(item)) {
                    list.push(item);
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
        if (!final_list.length == 0)
        {
            for (let x = final_list.length-1; x >= 0; x--)
                {
                    let random = Math.floor(Math.random() * final_list.length);
                    let buffer = final_list[x];
                    final_list[x] = final_list[random];
                    final_list[random] = buffer;
                }
            console.log(final_list);
        }
    });
}

export { audioCtx, beep, delay, checkls };