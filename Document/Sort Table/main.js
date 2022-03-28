let table = document.getElementsByTagName("table")[0];
let count = 1;
table.rows[0].addEventListener("click", function (event) {
    let index = event.target.cellIndex;
    let sortedRows = Array.from(table.rows).slice(1)
    if (count % 2 !== 0) {
        sortedRows.sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);
    } else {
        sortedRows.sort((rowA, rowB) => rowA.cells[index].innerHTML < rowB.cells[index].innerHTML ? 1 : -1);
    }
    count++
    table.tBodies[0].append(...sortedRows);
})
