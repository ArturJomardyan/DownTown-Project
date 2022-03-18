function open_modal() {
    document.forms[0].style.display = 'block'
    document.forms[0].previousElementSibling.style.display = 'block'
}

function close_modal(event) {
    event.target.parentElement.style.display = 'none'
    event.target.parentElement.previousElementSibling.style.display = 'none'
    alert("null");
}

let textarea = document.getElementsByTagName("textarea")[0];

function submitFunc() {
    alert(textarea.value);
}

document.onkeydown = function(e) {
    if (document.forms[0].style.display === "block" && e.key == 'Escape') {
        document.forms[0].style.display = "none"
        document.forms[0].previousElementSibling.style.display = 'none'
        alert("null");
    } else if (document.forms[0].style.display === "block" && e.key == 'Enter') {
        document.forms[0].style.display = "none"
        document.forms[0].previousElementSibling.style.display = 'none'
        submitFunc();

    } else {
        return
    }

};