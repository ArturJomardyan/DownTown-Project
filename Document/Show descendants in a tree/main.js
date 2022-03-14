function chekList(list) {

    for (const element of list.children) {
        let getListChildCount = Array.from(element.querySelectorAll("li"));
        alert(element.firstChild.data + ":" + getListChildCount.length)
        if (element.children.length !== 0 && element.firstElementChild.nodeName === "UL") {
            chekList(element.firstElementChild)
        }
    }
}

chekList(list)