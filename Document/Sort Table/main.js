let table = document.getElementsByTagName("table")[0];

table.addEventListener("click", function (event) {
    let index = event.target.cellIndex
    let sortedRows = Array.from(table.rows)
        .slice(1)
        .sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);

    table.tBodies[0].append(...sortedRows);
})