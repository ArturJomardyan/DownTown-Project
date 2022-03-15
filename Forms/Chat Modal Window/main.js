function open_and_close_Modal(event) {
    if (event.target.innerText = "Open Modal Window") {
        console.log(document.forms[0]);
        document.forms[0].style.display = 'block'
        document.forms[0].previousElementSibling.style.display = 'block'
    } else if (event.target.innerText = "cancele") {
        event.target.parentElement.style.display = 'none'
        event.target.previousElementSibling.style.display = 'none'
    } else {
        return
    }
}