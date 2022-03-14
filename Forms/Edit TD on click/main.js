// let rootTable = document.getElementsByTagName("table");

// rootTable.addEventListener("click",f)
// rootTable.addEventListener("click",ChekEdite);

function f(event) {
    let checkClickStatus_resualt = checkClickStatus(event);

    if (checkClickStatus_resualt === "clicked_for_edit") {
        let target = event.target
        let textarea = document.createElement("textarea");

        textarea.style.width = target.offsetWidth + "px"
        textarea.style.height = target.offsetHeight + "px"
        textarea.style.resize = "none"
        let saveForCancelBtn = target.innerHTML;
        textarea.innerText = target.innerHTML
        target.innerHTML = ""
        target.append(textarea);
        createButtons(target, saveForCancelBtn)
    }

}

function checkClickStatus(event) {
    let descendantTable = event.currentTarget.querySelectorAll("*");
    let activCellChek = Array.from(descendantTable).filter(el => el.tagName === "TEXTAREA").length;

    if (!activCellChek) return "clicked_for_edit"

}

function createButtons(root, infoForCancel) {

    let okBtn = document.createElement("button");
    okBtn.innerText = "ok"
    okBtn.style.position = 'absolute';
    okBtn.style.left = root.offsetLeft + root.offsetWidth / 2 + "px"
    okBtn.style.top = root.offsetTop + root.offsetHeight + "px"
    okBtn.onclick = function() {
        this.closest("td").innerHTML = this.closest("td").querySelector("textarea").value;
    }
    root.prepend(okBtn)

    let cnceleBtn = document.createElement("button");
    cnceleBtn.innerText = "cancale"
    cnceleBtn.style.position = 'absolute';
    cnceleBtn.style.top = root.offsetTop + root.offsetHeight + "px";
    cnceleBtn.onclick = function() {
        this.closest("td").innerHTML = infoForCancel;
    }
    root.prepend(cnceleBtn)

}