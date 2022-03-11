let rows = document.querySelector('tr');
// let rows = document.querySelectorAll('tr');
let buttons = document.querySelectorAll('button')
let table = document.querySelector("table")

// function deleterow(rowIndex) {
//     table.deleteRow(rowIndex)
// }

rows.onclick = function(rowIndex) {
    table.deleteRow(rowIndex)
}

// for (const row of rows) {
//     row.addEventListener = ('click', deleterow(row.rowIndex))
// }