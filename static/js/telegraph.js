// Settings window display
document.getElementById('settings').addEventListener('click', function(){
    document.getElementById('settings_window').style.display = "block"
});
document.getElementById('settings_done').addEventListener('click', function(){
    document.getElementById('settings_window').style.display = "none"
});
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
let timeout;
let message = document.getElementById("telegraph_message");
let button = document.getElementById("telegraph_button");
let clear = document.getElementById("clear_button");
/// Telegraph function
button.addEventListener("mousedown", function() {
    //// Time limit
    timeout = setTimeout(function() {
        start_time = null;
        end_time = null;
        return
    }, 5000);
    //// Space insert
    start_time = new Date();
    if (end_time)
    {
        let space_duration = start_time - end_time;
        if ((time_unit*3)-letter_min <= space_duration && space_duration <= (time_unit*3)+letter_max)
        {
            message.textContent += " ";
        }
        else if ((time_unit*7)-word_min <= space_duration && space_duration <= (time_unit*7)+word_max)
        {
            message.textContent += " / ";
        }
    }
});
button.addEventListener("mouseup", function() {
    if (!start_time)
    {
        return;
    }
    clearTimeout(timeout);
    end_time = new Date();
    let duration = end_time - start_time;
    if (time_unit-dot_min <= duration && duration <= time_unit+dot_max)
    {
        message.textContent += ".";
    }
    else if ((time_unit*3)-dash_min <= duration && duration <= (time_unit*3)+dash_max)
    {
        message.textContent += "-";
    }
});
clear.addEventListener('click', function(){
    message.textContent = '';
})
