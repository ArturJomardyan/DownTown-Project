let play_area = document.getElementsByClassName("play_area")[0];
let ball = document.getElementsByClassName("ball")[0];

play_area.onclick = function(event) {

    // координаты поля относительно окна браузера
    let fieldCoords = this.getBoundingClientRect();

    // мяч имеет абсолютное позиционирование (position:absolute), поле - относительное (position:relative)
    // таким образом, координаты мяча рассчитываются относительно внутреннего, верхнего левого угла поля
    let ballCoords = {
        top: event.clientY - fieldCoords.top - play_area.clientTop - ball.clientHeight / 2,
        left: event.clientX - fieldCoords.left - play_area.clientLeft - ball.clientWidth / 2
    };

    // запрещаем пересекать верхнюю границу поля
    if (ballCoords.top < 0) ballCoords.top = 0;

    // запрещаем пересекать левую границу поля
    if (ballCoords.left < 0) ballCoords.left = 0;

    // // запрещаем пересекать правую границу поля
    if (ballCoords.left + ball.clientWidth > play_area.clientWidth) {
        ballCoords.left = play_area.clientWidth - ball.clientWidth;
    }

    // запрещаем пересекать нижнюю границу поля
    if (ballCoords.top + ball.clientHeight > play_area.clientHeight) {
        ballCoords.top = play_area.clientHeight - ball.clientHeight;
    }

    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';

}