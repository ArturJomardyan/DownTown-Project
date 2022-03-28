let table = document.getElementsByTagName("table")[0];

table.addEventListener("click", function (event) {
    let index = event.target.cellIndex
    let arr = [];
    for (let i = 1; i < table.rows.length; i++) {
        arr.push(table.rows[i].children[index].innerHTML);
    }
    table.rows[0].children[index].innerText !== "Возраст" ? arr = arr.sort() : arr = arr.sort((a, b) => a - b);
    for (let i = 1; i < table.rows.length; i++) {
        arr.push(table.rows[i].children[index].innerHTML = arr[i - 1]);
    }
})