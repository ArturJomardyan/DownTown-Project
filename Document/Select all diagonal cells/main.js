let table = document.getElementsByClassName("table")[0];

let tableRows = table.rows;
for (const row of tableRows) {
    let rowIndex = row.rowIndex;
    row.cells[rowIndex].style.backgroundColor = "red"
}

console.log(table)