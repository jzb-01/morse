// Settings window display
document.getElementById('settings').addEventListener('click', function(){
    document.getElementById('settings_window').style.visibility = "visible"
});
document.getElementById('settings_done').addEventListener('click', function(){
    document.getElementById('settings_window').style.visibility = "hidden"
});

document.getElementById('info').addEventListener('click', function(){
    document.getElementById('info_window').style.display = "block"
});
document.getElementById('info_done').addEventListener('click', function(){
    document.getElementById('info_window').style.display = "none"
});


// Flag declaration
let timer_flag = false;
let timer_check = false;
let intervalID = null;

// Variable Initialization: time unit and margins percentages
let time_unit = Number(document.getElementById("time_unit").value);
let dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
let dot_max = (time_unit/100) * Number(document.getElementById("dot_positive_margin").value);
let dash_min = ((time_unit*3)/100) * Number(document.getElementById("dash_negative_margin").value);
let dash_max = ((time_unit*3)/100) * Number(document.getElementById("dash_positive_margin").value);
let letter_min = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
let letter_max = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
let word_min = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_negative_margin").value);
let word_max = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_positive_margin").value);
let timer = 0;
// Variables actualization - Time Unit
document.getElementById('time_unit').addEventListener('input', function(event) {
    document.getElementById('time_unit_value').textContent = event.target.value;
    time_unit = Number(document.getElementById("time_unit").value);
    dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
    dot_max = (time_unit/100) * Number(document.getElementById("dot_positive_margin").value);
    dash_min = ((time_unit*3)/100) * Number(document.getElementById("dash_negative_margin").value);
    dash_max = ((time_unit*3)/100) * Number(document.getElementById("dash_positive_margin").value);
    letter_min = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
    letter_max = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
    word_min = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_negative_margin").value);
    word_max = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_positive_margin").value);
});
// Variables actualization - Margins
document.getElementById("dot_negative_margin").addEventListener("input", function(event){
    document.getElementById('dot_min_value').textContent = event.target.value;
    dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
    console.log(dot_min);
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

// Telegraph
/// Variable declarations
let start_time = null;
let end_time = null;
let message = document.getElementById("telegraph_message");
let button = document.getElementById("telegraph_button");
let clear = document.getElementById("clear_button");
let other_timer;

// Function Declaration
function increase()
{
    if (timer > time_unit*1.5)
    {
        clearInterval(intervalID);
        document.getElementById("timer").innerHTML = 0;
        timer_flag = false;
    }
    else
    {
        timer += 1;
        document.getElementById("timer").innerHTML = timer*10;
    }
}

/// Telegraph function
document.addEventListener("keydown", function(event) {
    if (event.key == " ")
    {
        if (timer_flag == false)
        {
            intervalID = setInterval(increase, 10);
            timer_flag = true;
        }
        if (timer_check == false)
        {
            if(timer != 0)
            {
                other_timer = timer;
            timer = 0;
            if (((time_unit * 3) - letter_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 3) + letter_max))
            {
                message.textContent += " ";
            }
            else if (((time_unit * 7) - word_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 7) + word_max))
            {
                message.textContent += " / ";
            }
            }
            timer_check = true;
        }
    }
});
document.addEventListener("keyup", function(event) {
    if (event.key == " ")
    {
        if (timer != 0)
        {
            other_timer = timer;
        timer = 0;
        if ((time_unit - dot_min) <= other_timer * 10 && other_timer * 10 <= (time_unit + dot_max))
        {
            message.textContent += ".";
        }
        else if (((time_unit * 3) - dash_min) <= other_timer * 10 && other_timer * 10 <= ((time_unit * 3) + dash_max))
        {
            message.textContent += "-";
        }
        }
        timer_check = false;
    }
});
// Clear the code
clear.addEventListener('click', function(){
    message.textContent = '';
    clearInterval(intervalID);
    timer_flag = false;
    timer = 0;
    document.getElementById("timer").innerHTML = 0;
})

