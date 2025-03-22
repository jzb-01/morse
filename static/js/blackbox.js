let blackbox_select = document.getElementById("blackbox_select");
let blackbox_button = document.getElementById("blackbox_button");

blackbox_button.disabled = true;

blackbox_select.addEventListener('input', function(){
    if (blackbox_select.value == "")
    {
        blackbox_button.disabled = true;
    }
    else
    {
        blackbox_button.disabled = false;
    }
});