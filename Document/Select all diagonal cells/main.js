let table = document.getElementsByClassName("table")[0];


for (let index = 0; index < table.rows.length; index++) {

    for (let index1 = 0; index1 < table.rows[index].cells.length; index1++) {
        if (index = index1) {
            table.rows[index].cells[index1].style.backgroundColor = "red"
        }
    }
}

console.log(table)