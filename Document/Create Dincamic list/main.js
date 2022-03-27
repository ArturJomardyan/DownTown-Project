let ul = document.createElement("ul");
document.body.append(ul);

 while(true){
    let resualt = prompt("add something in list");

    if(!resualt && resualt !== "Esc"){
        break;
    }

    let li = document.createElement("li");
    li.innerText = resualt;
    ul.append(li);

 }

