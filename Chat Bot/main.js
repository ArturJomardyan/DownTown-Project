let mainBlock = document.getElementsByClassName("mainBlock")[0];
let input = document.querySelector("input[type='text']");
let button = document.querySelector("input[type='submit']")
let checkbox = document.querySelector("input[type='checkbox']")
let conversationHistory = document.getElementsByClassName("conversationHistory")[0];


button.addEventListener("click", send)
input.addEventListener("keydown", function handleKeyDown(event) {
    if (event.keyCode === 13) {
        send()
    }
})


function send() {
    if(input.value === "")return
    let span = document.createElement("span");
    span.innerText = input.value
    if (checkbox.checked) {
        let container = document.createElement("div");
        container.classList.add("frinedChat")
        let img = document.createElement("img");
        img.src = "images/image.png"
        span.classList.add("spanLeft");
        container.append(img);
        container.append(span);
        mainBlock.append(container);
    } else {
        mainBlock.append(span);
    }
}