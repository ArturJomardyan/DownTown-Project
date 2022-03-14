let table = document.getElementsByTagName("tBody");
//event.target.offsetHeight
//event.target.offsetWidth
//offsetY
//offsetX

function f(event) {
    let target = event.target
        // target.style.display = "none"
    let textarea = document.createElement("textarea");
    textarea.innerText = target.innerHTML
    textarea.style.width = target.offsetWidth
    textarea.style.height = target.offsetHeight
}