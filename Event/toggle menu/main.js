function showmenu(elem) {
    var openMenu = document.getElementById("activeMenu");
    let firstChild = openMenu.firstElementChild

    if (firstChild.style.display === "block") {
        firstChild.style.display = "none";
    } else {
        firstChild.style.display = "block";
    }
}