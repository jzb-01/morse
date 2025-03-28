// ===================== SETTINGS WINDOW DISPLAY =====================
document.getElementById('settings').addEventListener('click', function(){
    document.getElementById('settings_window').style.display = "block";
});
document.getElementById('settings_done').addEventListener('click', function(){
    document.getElementById('settings_window').style.display = "none";
});

document.getElementById('info').addEventListener('click', function(){
    document.getElementById('info_window').style.display = "block";
});
document.getElementById('info_done').addEventListener('click', function(){
    document.getElementById('info_window').style.display = "none";
});


// ===================== VARIABLE DECLARATIONS =====================
let message = document.getElementById("telegraph_message");
let clear = document.getElementById("clear_button");
let timer_flag = false;
let timer_check = false;
let intervalID = null;
let other_timer;
let timer = 0;


// Initialize variables for time unit and margins
let time_unit = Number(document.getElementById("time_unit").value);
let dot_min = (time_unit / 100) * Number(document.getElementById("dot_negative_margin").value);
let dot_max = (time_unit / 100) * Number(document.getElementById("dot_positive_margin").value);
let dash_min = ((time_unit * 3) / 100) * Number(document.getElementById("dash_negative_margin").value);
let dash_max = ((time_unit * 3) / 100) * Number(document.getElementById("dash_positive_margin").value);
let letter_min = ((time_unit * 3) / 100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
let letter_max = ((time_unit * 3) / 100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
let word_min = ((time_unit * 7) / 100) * Number(document.getElementById("inter-word_space_negative_margin").value);
let word_max = ((time_unit * 7) / 100) * Number(document.getElementById("inter-word_space_positive_margin").value);


// ===================== UPDATE VARIABLES ON INPUT =====================
// Time Unit Update
document.getElementById('time_unit').addEventListener('input', function(event) {
    document.getElementById('time_unit_value').textContent = event.target.value;
    time_unit = Number(event.target.value);

    // Update all margins based on the new time unit
    dot_min = (time_unit / 100) * Number(document.getElementById("dot_negative_margin").value);
    dot_max = (time_unit / 100) * Number(document.getElementById("dot_positive_margin").value);
    dash_min = ((time_unit * 3) / 100) * Number(document.getElementById("dash_negative_margin").value);
    dash_max = ((time_unit * 3) / 100) * Number(document.getElementById("dash_positive_margin").value);
    letter_min = ((time_unit * 3) / 100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
    letter_max = ((time_unit * 3) / 100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
    word_min = ((time_unit * 7) / 100) * Number(document.getElementById("inter-word_space_negative_margin").value);
    word_max = ((time_unit * 7) / 100) * Number(document.getElementById("inter-word_space_positive_margin").value);
});

// Margin Updates with Display
document.getElementById("dot_negative_margin").addEventListener("input", function(event){
    document.getElementById('dot_min_value').textContent = event.target.value;
    dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
});
document.getElementById("dot_positive_margin").addEventListener("input", function(event){
    document.getElementById('dot_max_value').textContent = event.target.value;
    dot_max = (time_unit/100) * Number(document.getElementById("dot_positive_margin").value);
});
document.getElementById("dash_negative_margin").addEventListener("input", function(event){
    document.getElementById('dash_min_value').textContent = event.target.value;
    dash_min = ((time_unit*3)/100) * Number(document.getElementById("dash_negative_margin").value);
});
document.getElementById("dash_positive_margin").addEventListener("input", function(event){
    document.getElementById('dash_max_value').textContent = event.target.value;
    dash_max = ((time_unit*3)/100) * Number(document.getElementById("dash_positive_margin").value);
});
document.getElementById("inter-letter_space_negative_margin").addEventListener("input", function(event){
    document.getElementById('letter_min_value').textContent = event.target.value;
    letter_min = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
});
document.getElementById("inter-letter_space_positive_margin").addEventListener("input", function(event){
    document.getElementById('letter_max_value').textContent = event.target.value;
    letter_max = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
});
document.getElementById("inter-word_space_negative_margin").addEventListener("input", function(event){
    document.getElementById('word_min_value').textContent = event.target.value;
    word_min = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_negative_margin").value);
});
document.getElementById("inter-word_space_positive_margin").addEventListener("input", function(event){
    document.getElementById('word_max_value').textContent = event.target.value;
    word_max = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_positive_margin").value);
});

// ===================== TELEGRAPH FUNCTIONALITY =====================
// Timer increment function
function increase() {
    if (timer > time_unit * 1.5) {
        clearInterval(intervalID);
        document.getElementById("timer").innerHTML = 0;
        timer_flag = false;
        timer = 0;
    } else {
        timer += 1;
        document.getElementById("timer").innerHTML = timer * 10;
    }
}

// Keydown event: Start timer and check for inter-letter or inter-word spaces
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        if (!timer_flag) {
            intervalID = setInterval(increase, 10);
            timer_flag = true;
        }
        if (!timer_check) {
            if (timer !== 0) {
                other_timer = timer;
                timer = 0;

                if (((time_unit * 3) - letter_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 3) + letter_max)) {
                    message.textContent += " ";
                } else if (((time_unit * 7) - word_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 7) + word_max)) {
                    message.textContent += " / ";
                }
            }
            timer_check = true;
        }
    }
});

// Keyup event: Identify dot, dash, or space
document.addEventListener("keyup", function(event) {
    if (event.key === " ") {
        if (timer !== 0) {
            other_timer = timer;
            timer = 0;

            if ((time_unit - dot_min) <= other_timer * 10 && other_timer * 10 <= (time_unit + dot_max)) {
                message.textContent += ".";
            } else if (((time_unit * 3) - dash_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 3) + dash_max)) {
                message.textContent += "-";
            }
        }
        timer_check = false;
    }
});

// Clear button functionality
clear.addEventListener('click', function() {
    message.textContent = '';
    clearInterval(intervalID);
    timer_flag = false;
    timer = 0;
    document.getElementById("timer").innerHTML = 0;
});
