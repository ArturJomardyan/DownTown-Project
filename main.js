// Topic 3 task 1

// console.log(document.body.children[2].nextSibling); // Напишите код, как получит Div
// console.log(document.body.children[1]); // Напишите код, как получит ul
// console.log(document.body.children[1].children[1]); // второй <li> (с именем Пит)?

// Topic 3 task 3

// let table = document.getElementsByClassName("table")[0];


// for (let index = 0; index < table.rows.length; index++) {

//     for (let index1 = 0; index1 < table.rows[index].cells.length; index1++) {
//         if (index = index1) {
//             table.rows[index].cells[index1].style.backgroundColor = "red"
//         }
//     }
// }

// console.log(table)

// Topic 4 task 1

// let list = document.getElementById('list');

// function chekList(list) {

//     for (const element of list.children) {
//         let getListChildCount = Array.from(element.querySelectorAll("li"));
//         alert(element.firstChild.data + ":" + getListChildCount.length)
//         if (element.children.length !== 0 && element.firstElementChild.nodeName === "UL") {
//             chekList(element.firstElementChild)
//         }
//     }
// }

// chekList(list)


// Topic 6 task Выведите список потомков в дереве

// let list = document.getElementById('list');

// function chekList(list) {

//     for (const element of list.children) {
//         let getListChildCount = Array.from(element.querySelectorAll("li"));
//         if (getListChildCount.length > 0) {
//             element.firstChild.data += `[${getListChildCount.length}]`
//         }
//         if (element.children.length !== 0 && element.firstElementChild.nodeName === "UL") {
//             chekList(element.firstElementChild)
//         }
//     }
// }

// chekList(list)



// Topic 6 task Очистите элемент


// let ol = document.getElementById('elem');

// let clear = (list) => ol.innerHTML = "";

// clear(ol);

// console.log(ol);



let clockContainer = document.getElementsByClassName("clock")[0];



function stopButtonFunc() {
    clearInterval(start);
}

const start = setInterval(startButtonFunc, 1000);

function startButtonFunc() {
    today = new Date();
    setInterval(() => 1000)
    let date = today.getHours() + ':' + (today.getMinutes()) + ':' + today.getSeconds();
    clockContainer.innerHTML = date
}