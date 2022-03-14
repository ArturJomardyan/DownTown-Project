let list = document.getElementById('list');

function chekList(list) {

    for (const element of list.children) {
        let getListChildCount = Array.from(element.querySelectorAll("li"));
        if (getListChildCount.length > 0) {
            element.firstChild.data += `[${getListChildCount.length}]`
        }
        if (element.children.length !== 0 && element.firstElementChild.nodeName === "UL") {
            chekList(element.firstElementChild)
        }
    }
}

chekList(list)