// let rootTable = document.getElementsByTagName("table");

    // rootTable.addEventListener("click",f)
    // rootTable.addEventListener("click",ChekEdite);

function f(event) {
    
   let descendantTable = event.currentTarget.querySelectorAll("*");
   let activCellChek = Array.from(descendantTable).filter(el => el.tagName === "TEXTAREA").length;
   
    if(!activCellChek){
        let target = event.target
        let textarea = document.createElement("textarea");
    
        textarea.style.width = target.offsetWidth + "px"
        textarea.style.height = target.offsetHeight + "px"
        textarea.style.resize = "none"
    
        textarea.innerText = target.innerHTML
        target.innerHTML = ""
        target.style.all = "unset"
        target.append(textarea);
       
        createButtons(target)
        
     }else if(activCellChek && (event.target.tagName !== "BUTTON" || event.target.tagName !== "TEXTAREA"))return
     else if(event.target.tagName === "BUTTON" && event.target.innerHTML === "ok"){
      console.log("ok button clicked");
      }else{
        console.log(event.target.tagName);
        if(event.target.innerHTML === "ok")console.log("okButton");
    }

    
   
}

function createButtons(root){
   
    let okBtn = document.createElement("button");
    okBtn.innerText = "ok"
    okBtn.style.position = 'absolute';
    okBtn.style.left = root.offsetLeft + root.offsetWidth / 2 + "px"
    okBtn.style.top =  root.offsetTop + root.offsetHeight +  "px"
    root.prepend(okBtn)

    let cnceleBtn = document.createElement("button");
    cnceleBtn.innerText = "cancale"
    cnceleBtn.style.position = 'absolute';
    cnceleBtn.style.top =  root.offsetTop + root.offsetHeight +  "px"
    root.prepend(cnceleBtn)

}

function ChekEdite(event){
    console.log(event.currentTarget);
}
