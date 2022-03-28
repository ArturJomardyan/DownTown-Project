let hh = document.getElementsByClassName("hh")[0];
let mm = document.getElementsByClassName("mm")[0];
let ss = document.getElementsByClassName("ss")[0];
let start = document.getElementsByClassName("start")[0];
let stop = document.getElementsByClassName("stop")[0];

function time() {
    let date = new Date()
    if (date.getHours() < 10) {
        hh.innerText = "0" + date.getHours();
    } else {
        hh.innerText =  date.getHours();
    }
    if (date.getMinutes() < 10) {
        mm.innerText = ":0" + date.getMinutes();
    } else {
        mm.innerText = ":" + date.getMinutes();
    }
    if (date.getSeconds() < 10) {
        ss.innerText = ":0" + date.getSeconds();
    } else {
        ss.innerText = ":" + date.getSeconds();
    }
    hh.style.color = "red";
    mm.style.color = "blue";
    ss.style.color = "green";
}

start.addEventListener("click", function () {
    let index = setInterval(() => time(), 1000);

    stop.addEventListener("click", function () {
        clearInterval(index);
    })
})


