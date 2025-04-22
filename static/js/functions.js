// Function to generate a beep sound
// DDB helped me to create this function
// Parameters:
// - audio: AudioContext instance
// - duration: Duration of the beep in milliseconds
function beep(audio, duration) {
  const oscillator = audio.createOscillator();
  oscillator.type = 'sine'; // Sine wave for a clear tone
  oscillator.frequency.setValueAtTime(600, audio.currentTime); // Set frequency to 600 Hz
  oscillator.connect(audio.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), duration); // Stop oscillator after the duration
}
  
// Function to create a delay using Promises
// DDB helped me to create this function
// Parameters:
// - duration: Duration of the delay in milliseconds
function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
  
// Function to manage character selections and update display
// Parameters:
// - element_id: ID of the checkbox element
// - characters: Array of characters to add or remove
// - final_list: Array storing the final selection of characters
// - display: Element to display the selected characters
function checkls(element_id, characters, final_list, display) {
  document.getElementById(element_id).addEventListener('change', function() {

    // Ensure at least one checkbox remains checked
    if (!document.getElementById('alphabet').checked &&
        !document.getElementById('numbers').checked &&
        !document.getElementById('special').checked) {
      this.checked = true;
      return;
    }

    // Add or remove characters based on checkbox state
    // DDB helped with the use of .includes, .push and .splice
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

    // Shuffle the final_list if it is not empty
    if (final_list.length !== 0) {
      for (let x = final_list.length - 1; x >= 0; x--) {
        let random = Math.floor(Math.random() * final_list.length);
        [final_list[x], final_list[random]] = [final_list[random], final_list[x]]; // Swap values
      }
    }

    // Update display with the first two characters from the shuffled list
    display.innerHTML = '';
    display.innerHTML += final_list[0] + ' ' + final_list[1] + ' ';
  });
}

// Exporting functions for external use
export { beep, delay, checkls };
  