let mouse = document.getElementById("mouse");
mouse.tabIndex = 0;
// ArrowDown
// ArrowUp
//  ArrowRight
//  ArrowLeft
mouse.onfocus = function f() {

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            if (parseInt(mouse.style.left) + mouse.offsetWidth < window.innerWidth) {
                console.log(mouse.style.right);

                mouse.style.left = parseInt(mouse.style.left) + mouse.offsetWidth + "px";
            }
        }
        if (event.key === "ArrowLeft") {
            if (parseInt(mouse.style.left) + mouse.offsetWidth < window.innerWidth && parseInt(mouse.style.left) > 8) {
                mouse.style.left = parseInt(mouse.style.left) - mouse.offsetWidth + "px";
                console.log()
            } else {
                mouse.style.left = 8 + "px"
            }
        }
        if (event.key === "ArrowDown") {

            if (parseInt(mouse.style.top) + mouse.offsetHeight < window.innerHeight) {
                mouse.style.top = parseInt(mouse.style.top) + mouse.offsetHeight + "px";
            } else {
                console.log(mouse.style.top)
            }
        }
        if (event.key === "ArrowUp") {

            if (parseInt(mouse.style.top) - mouse.offsetHeight < window.innerHeight &&
                parseInt(mouse.style.top) - mouse.offsetHeight > 0) {
                mouse.style.top = parseInt(mouse.style.top) - mouse.offsetHeight + "px";
            } else {
                mouse.style.top = 50 + "px"

            }
        }

    })
}