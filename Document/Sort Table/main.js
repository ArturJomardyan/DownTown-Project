let table = document.getElementsByTagName("table")[0];
let count = 1;
table.addEventListener("click", function (event) {
    let index = event.target.cellIndex;
    let sortedRows
    if (count % 2 !== 0) {
        sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);
    } else {
        sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => rowA.cells[index].innerHTML < rowB.cells[index].innerHTML ? 1 : -1);
    }
    count++
    table.tBodies[0].append(...sortedRows);
})
