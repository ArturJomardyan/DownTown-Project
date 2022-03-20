// function set_all(page_all = []){
//     localStorage.setItem("All", JSON.stringify(page_all));
// }
// function set_activ(page_activ = []){
//     localStorage.setItem("Active", JSON.stringify(page_activ));
// }
// function set_complited(page_complited = []){
//     localStorage.setItem("Complited", JSON.stringify(page_complited));
// }

// function get_all(){
//     return localStorage.getItem("All") || [];
// }
// function get_activ(){
//     return localStorage.getItem("Active") || [];
// }
// function get_complited(){
//     return localStorage.getItem("Complited") || [];
// }



// let pageCurrentStatus = ""

// function getCurrentStatus(event){
//     if (event.target.type === "radio") 
//         currentStatus = event.target.value;
        
//         // renderTodosByStatus(); 
//       }
// }

// document.forms.statusForm.addEventListener("change", function handleChecked(event) {
//     if (event.target.type === "radio") {
//       const value = event.target.value;
//       setStatus(value);
//       renderTodosByStatus();
//     }
//   });

// function renderTodoItem({ id, text, checked }) {
//     const forCloneForm = document.querySelector(".create-todo.for-clone");
//     const createTodoForm = forCloneForm.cloneNode(true);
  
//     createTodoForm.dataset.key = id;
//     createTodoForm.classList.remove("hide");
//     createTodoForm.classList.remove("for-clone");
//     createTodoForm.textInput.value = text;
//     createTodoForm.checkbox.checked = checked;
//     formContainer.prepend(createTodoForm);
//   }





let localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];

let all_count = document.getElementsByClassName("all_count")[0];
let active_count = document.getElementsByClassName("active_count")[0];
let completed_count = document.getElementsByClassName("completed_count")[0];

function statusCounter() {
    const allTodos = localStorageTodos;
    const activeTodos = localStorageTodos.filter((el) => el.checked === false);
    const completedTodos = localStorageTodos.filter((el) => el.checked);

    all_count.innerHTML = allTodos.length;
    active_count.innerHTML = activeTodos.length;
    completed_count.innerHTML = completedTodos.length;
}
statusCounter();

let clearAllButton = document.getElementById("clearAll")
let clearComplitedButton = document.getElementById("clearComplited")

clearAllButton.onclick = function () {
    localStorageTodos.length = 0;
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    clearAllButton.classList.add("hide");
    renderTodos(localStorageTodos);
    statusCounter()
    chek_clearList_btns_visibility();
}

clearComplitedButton.onclick = function () {
    for (let i = 0; i < localStorageTodos.length; i++) {
        if (localStorageTodos[i].checked) {
            localStorageTodos.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    clearComplitedButton.classList.add("hide");
    renderTodos(localStorageTodos);
    statusCounter()
    chek_clearList_btns_visibility();
}

function chek_clearList_btns_visibility() {
    if (all_count.innerHTML === "0") {
        clearAllButton.classList.add("hide");
        clearComplitedButton.classList.add("hide");
    } else {

        clearAllButton.classList.remove("hide");

        if (completed_count.innerHTML !== "0") {
            clearComplitedButton.classList.remove("hide")
        } else {
            clearComplitedButton.classList.add("hide")
        }
    }
}
chek_clearList_btns_visibility();

const myForm = document.getElementById("mainForm");

function createTodo({ id, text, checked }) {

    const forCloneForm = document.querySelector(".create-todo.for-clone");
    const createTodoForm = forCloneForm.cloneNode(true);
    createTodoForm.classList.remove("hide");
    createTodoForm.classList.remove("for-clone");
    createTodoForm.children[0].checked = checked;
    if (createTodoForm.children[0].checked === true) {
        createTodoForm.children[1].style.textDecoration = "line-through";
        createTodoForm.children[1].style.color = "#d9d9d9";
    }
    if (text === "") {
        alert("filed can`t be empty")
    } else {
        createTodoForm.children[0].onclick = checkBoxCheck
        createTodoForm.children[1].value = text
        createTodoForm.children[2].onclick = deleteRow
        createTodoForm.children[3].onclick = open_modal
        myForm.after(createTodoForm);
        localStorageTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
        const obj = { id: id || localStorageTodos.length + 1, text, checked };

        if (!localStorageTodos.some((item) => item.id === obj.id)) {
            localStorageTodos.push(obj);
            localStorage.setItem("todos", JSON.stringify(localStorageTodos));
        }
        statusCounter();
        chek_clearList_btns_visibility();
    }
}

function renderTodos(todos) {

    const visibleTodos = document.querySelectorAll(".create-todo:not(.for-clone)");
    visibleTodos.forEach((element) => element.remove());
    todos.forEach((item) => {
        createTodo(item);
    });
    localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    chek_clearList_btns_visibility();
}

myForm.textInput.addEventListener("keydown", function handleKeyDown(event) {
    if (event.keyCode === 13) {
        createTodo({ text: event.target.value, checked: false });
        event.target.value = "";
    }
});

renderTodos(localStorageTodos);



function getTargetIndex(element) {
    let parent = element.parentElement.parentElement;
    let childCollection = parent.children
    let length = childCollection.length
    let child_index;

    for (let i = 0; i < length; ++i) {
        if (element.parentElement === childCollection[i]) {
            child_index = i;
            break;
        }
    }
    // two elements from the list are superfluous, and we need reversed index for to get target element
    child_index = length - child_index - 2;
    return child_index
}

function checkBoxCheck() {
    let child_index = getTargetIndex(this)
    if (localStorageTodos[child_index].checked === false) {
        this.nextElementSibling.style.textDecoration = "line-through";
        this.nextElementSibling.style.color = "#d9d9d9";
        localStorageTodos[child_index].checked = true;
    } else {
        this.nextElementSibling.style.textDecoration = "none";
        this.nextElementSibling.style.color = "#4d4d4d";
        localStorageTodos[child_index].checked = false;
    }
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    statusCounter();
    chek_clearList_btns_visibility();

}

statusCounter()

function deleteRow() {
    let child_index = getTargetIndex(this)
    localStorageTodos.splice(child_index, 1);
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    statusCounter();
    chek_clearList_btns_visibility();
    renderTodos(localStorageTodos);
}


let popup = document.forms.modal
let popupBackground = document.getElementsByClassName("root_form")[0];
let index_open_row = document.getElementsByClassName("index_open_row")[0];

function open_modal() {
    let child_index = getTargetIndex(this)
    popup.textarea.value = localStorageTodos[child_index].text

    index_open_row.innerHTML = child_index
    popup.style.display = 'block'
    popupBackground.style.display = 'block'
    console.log(index_open_row);
}

function close_modal() {
    popup.style.display = 'none'
    popupBackground.style.display = 'none'
}

function submit_modal() {
    localStorageTodos[index_open_row.innerHTML].text = popup.textarea.value;
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    close_modal()
    renderTodos(localStorageTodos);
}



let mainChekBox = document.forms.mainForm.mainChekBox
let mainDiv = document.getElementById("main");

mainChekBox.onclick = function () {
    let resualt = localStorageTodos.some(el => el.checked === false);
    if (resualt) localStorageTodos.forEach(el => el.checked = true)
    else localStorageTodos.forEach(el => el.checked = false)
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    renderTodos(localStorageTodos);
}


let bottomMenu = document.getElementById("bottomMenu");
bottomMenu.onclick = labelClick

function labelClick(event) {

    if (event.currentTarget.children[0].checked) {
        renderTodos(localStorageTodos);
    } else if (event.currentTarget.children[2].checked) {
        const activeTodos = localStorageTodos.filter((el) => el.checked === false);
        renderTodos(activeTodos);
    } else {
        const completedTodos = localStorageTodos.filter((el) => el.checked);
        renderTodos(completedTodos);
    }

}


