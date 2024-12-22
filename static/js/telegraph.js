document.getElementById('time_unit').addEventListener('input', function() {
    document.getElementById('time_unit_value').textContent = this.value;
});
document.getElementById('dot_negative_margin').addEventListener('input', function() {
    document.getElementById('dot_min_value').textContent = this.value;
});
document.getElementById('dot_positive_margin').addEventListener('input', function() {
    document.getElementById('dot_max_value').textContent = this.value;
});
document.getElementById('dash_negative_margin').addEventListener('input', function() {
    document.getElementById('dash_min_value').textContent = this.value;
});
document.getElementById('dash_positive_margin').addEventListener('input', function() {
    document.getElementById('dash_max_value').textContent = this.value;
});
document.getElementById('inter-letter_space_negative_margin').addEventListener('input', function() {
    document.getElementById('letter_min_value').textContent = this.value;
});
document.getElementById('inter-letter_space_positive_margin').addEventListener('input', function() {
    document.getElementById('letter_max_value').textContent = this.value;
});
document.getElementById('inter-word_space_negative_margin').addEventListener('input', function() {
    document.getElementById('word_min_value').textContent = this.value;
});
document.getElementById('inter-word_space_positive_margin').addEventListener('input', function() {
    document.getElementById('word_max_value').textContent = this.value;
});

///////lo de arriba son solo los números en texto





let start_time = null;
let end_time = null;
let timeout;

let message = document.getElementById("telegraph_message");
let button = document.getElementById("telegraph_button");

let time_unit = Number(document.getElementById("time_unit").value);
let dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
let dot_max = (time_unit/100) * Number(document.getElementById("dot_positive_margin").value);
let dash_min = ((time_unit*3)/100) * Number(document.getElementById("dash_negative_margin").value);
let dash_max = ((time_unit*3)/100) * Number(document.getElementById("dash_positive_margin").value);
let letter_min = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
let letter_max = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
let word_min = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_negative_margin").value);
let word_max = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_positive_margin").value);

document.getElementById('time_unit').addEventListener('input', function() {
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


document.getElementById("dot_negative_margin").addEventListener("input", function(){
    dot_min = (time_unit/100) * Number(document.getElementById("dot_negative_margin").value);
});
document.getElementById("dot_positive_margin").addEventListener("input", function(){
    dot_max = (time_unit/100) * Number(document.getElementById("dot_positive_margin").value);
});
document.getElementById("dash_negative_margin").addEventListener("input", function(){
    dash_min = ((time_unit*3)/100) * Number(document.getElementById("dash_negative_margin").value);
});
document.getElementById("dash_positive_margin").addEventListener("input", function(){
    dash_max = ((time_unit*3)/100) * Number(document.getElementById("dash_positive_margin").value);
});
document.getElementById("inter-letter_space_negative_margin").addEventListener("input", function(){
    letter_min = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_negative_margin").value);
});
document.getElementById("inter-letter_space_positive_margin").addEventListener("input", function(){
    letter_max = ((time_unit*3)/100) * Number(document.getElementById("inter-letter_space_positive_margin").value);
});
document.getElementById("inter-word_space_negative_margin").addEventListener("input", function(){
    word_min = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_negative_margin").value);
});
document.getElementById("inter-word_space_positive_margin").addEventListener("input", function(){
    word_max = ((time_unit*7)/100) * Number(document.getElementById("inter-word_space_positive_margin").value);
});


button.addEventListener("mousedown", function() {
    timeout = setTimeout(function() {
        start_time = null;
        end_time = null;
        return
    }, 5000);
    start_time = new Date();
    if (end_time)
    {
        let space_duration = start_time - end_time;
        if ((time_unit*3)-letter_min <= space_duration && space_duration <= (time_unit*3)+letter_max)
        {
            message.innerHTML += " ";
        }
        else if ((time_unit*7)-word_min <= space_duration && space_duration <= (time_unit*7)+word_max)
        {
            message.innerHTML += "/";
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
        message.innerHTML += ".";
    }
    else if ((time_unit*3)-dash_min <= duration && duration <= (time_unit*3)+dash_max)
    {
        message.innerHTML += "-";
    }
});
