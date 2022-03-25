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
        if(mainBlock.lastElementChild?.className === "frinedChat"){
            span.style['border-top-left-radius'] = '0px';
            mainBlock.lastElementChild.firstElementChild.remove();
            mainBlock.lastElementChild.firstElementChild.style.marginLeft = "45px";
            mainBlock.lastElementChild.firstElementChild.style['border-bottom-left-radius'] = '0px';
            mainBlock.lastElementChild.style['padding-bottom'] = '0px';
            container.style['padding-top'] = '0px';
        }
        mainBlock.append(container);
        input.value = ""

    } else {
        if(mainBlock.lastElementChild){
            mainBlock.lastElementChild.style['border-bottom-right-radius'] = '0px';
            span.style['border-top-right-radius'] = '0px';
        }
        mainBlock.append(span);
        input.value = ""
    }
}
