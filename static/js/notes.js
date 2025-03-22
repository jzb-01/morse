let notes_select = document.getElementById("notes_select");
let notes_button = document.getElementById("notes_button");

notes_button.disabled = true;

notes_select.addEventListener('input', function(){
    if (notes_select.value == "")
    {
        notes_button.disabled = true;
    }
    else
    {
        notes_button.disabled = false;
    }
});