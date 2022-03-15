let mouse = document.getElementById("mouse");
mouse.tabIndex = 0;
// ArrowDown
// ArrowUp
//  ArrowRight
//  ArrowLeft
mouse.onfocus = function f() {

    document.addEventListener("keydown", function(event) {
        let margin_left = parseInt(mouse.style.left)
        let mouse_width = mouse.offsetWidth;
        let window_width = window.innerWidth;

        let margin_top = parseInt(mouse.style.top);
        let mouse_height = mouse.offsetHeight;
        let window_height = window.innerHeight

        if (event.key === "ArrowRight") {
            if (margin_left + mouse_width < window_width - mouse_width - 8) {
                mouse.style.left = margin_left + mouse_width + "px";
                console.log(mouse.style.right);
            } else {
                mouse.style.left = window_width - margin_left - mouse_width + margin_left - 8 + "px";
            }
        }
        if (event.key === "ArrowLeft") {

            if (margin_left + 8 > mouse_width) {
                mouse.style.left = margin_left - mouse_width + "px";
            } else {
                mouse.style.left = 8 + "px"
            }
        }
        if (event.key === "ArrowDown") {

            if (margin_top + mouse_height < window_height - mouse_height - 8) {
                mouse.style.top = margin_top + mouse_height + "px";
            } else {
                console.log(55);
                mouse.style.top = window_height - margin_top - mouse_height + margin_top - 22 + "px";
            }
        }
        if (event.key === "ArrowUp") {

            if (margin_top - mouse_height < window_height && margin_top - mouse_height > 0) {
                mouse.style.top = margin_top - mouse_height + "px";
            } else {
                mouse.style.top = 50 + "px"
            }
        }

    })
}