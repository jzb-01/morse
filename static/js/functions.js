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

function checkls(elementid, slista, list) {
    document.getElementById(elementid).addEventListener('change', function() {
        if (this.checked) {
            slista.forEach(item => {
                if (!list.includes(item)) {
                    list.push(item);
                }
            });
        } else {
            slista.forEach(item => {
                const index = list.indexOf(item);
                if (index > -1) {
                    list.splice(index, 1);
                }
            });
        }
        console.log(list);
    });
}

function updaterange(event) {
    document.getElementById(event.target.dataset.target).textContent = event.target.value;
}

export { audioCtx, beep, delay, checkls, updaterange };