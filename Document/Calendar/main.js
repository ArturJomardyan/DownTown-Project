let container = document.getElementsByClassName("container")[0];

function fillCalendar(container, year = 1970, month = 01) {
    month = month - 1;
    let date = new Date(year, month);
    date = String(date);
    let dateArr = date.split(" ");

    dateArr.length = 4;
    let dateObj = {
        dayWeek: dateArr[0],
        month: dateArr[1],
        dayMonth: dateArr[2],
        year: dateArr[3]
    }

    let tableCaption = document.createElement("p");
    tableCaption.innerText = `${dateObj.year} ${dateObj.month}`
    container.prepend(tableCaption);

    let dayCountInMonth = howMuchDaysInMonth(year, month);
    let [tableForFill, indexFirstCell] = creatCalnedarTable(dateObj.dayWeek, dayCountInMonth);

    // push all table cells(TD) in array for fill days
    let arrForAllTableCells = [];
    for (let i = 1; i < tableForFill.rows.length; i++) {
        for (let j = 0; j < 7; j++) {
            arrForAllTableCells.push(tableForFill.rows[i].cells[j])
        }
    }

    // Cut part of cell 
    let arrForOnlyNumberCells = arrForAllTableCells.splice(indexFirstCell, dayCountInMonth);
    for (let i = 0; i < dayCountInMonth; i++) {
        arrForOnlyNumberCells[i].innerText = i + 1
    }

}

fillCalendar(container, 2000, 02);

function howMuchDaysInMonth(year, month) {
    var date1 = new Date(year, month, 1);
    var date2 = new Date(year, month + 1, 1);
    // get Day count from milliseconds
    return Math.round((date2 - date1) / 1000 / 3600 / 24);
}

function creatCalnedarTable(dayWeek, dayCountInMonth) {

    let arrDayWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let table = document.createElement("table");
    let calendarHeader = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
        let dayWeek = document.createElement("td");
        dayWeek.innerText = arrDayWeek[i];
        calendarHeader.append(dayWeek);
    }

    table.append(calendarHeader)
    container.append(table);

    // if month is february and is not leap year therefore it have 28 days
    // and first day in month is monday then we should have 4 rows 
    let tableRowForDays = 5
    if (dayWeek === arrDayWeek[0] && dayCountInMonth === 28) {
        tableRowForDays = 4
    }

    let indexDayWeek = arrDayWeek.indexOf(dayWeek);

    for (let i = 0; i < tableRowForDays; i++) {
        let row = document.createElement("tr");
        // each row have a 7 days ==> eache row have 7 cell
        for (let i = 0; i < 7; i++) {
            let oneDayCell = document.createElement("td");
            row.append(oneDayCell);
            table.append(row);
        }
    }

    return [table, indexDayWeek];
}


