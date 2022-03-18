let localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];

let all_count = document.getElementsByClassName("all_count")[0];
let active_count = document.getElementsByClassName("active_count")[0];
let completed_count = document.getElementsByClassName("completed_count")[0];

function statusCounter() {
    const allTodos = localStorageTodos;
    const activeTodos = localStorageTodos.filter((el) => el.checked === false);
    const completedTodos = localStorageTodos.filter((el) => el.checked === true);

    all_count.innerHTML = allTodos.length;
    active_count.innerHTML = activeTodos.length;
    completed_count.innerHTML = completedTodos.length;
}
statusCounter();

let clearAllButton = document.getElementById("clearAll")
let clearComplitedButton = document.getElementById("clearComplited")

clearAllButton.onclick = function() {
    localStorageTodos.length = 0;
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    clearAllButton.classList.add("hide");
    renderTodos(localStorageTodos);
    statusCounter()
    chek_clearList_btns_visibility();
}

clearComplitedButton.onclick = function(){
    for (let i = 0; i < localStorageTodos.length; i++) {
    if(localStorageTodos[i].checked === true){
        localStorageTodos.splice(i,1);
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
        // createTodoForm.children[3].onclick = open_modal
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



function getTargetIndex(element){
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
    localStorageTodos.splice(child_index,1);
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    statusCounter();
    chek_clearList_btns_visibility();
    renderTodos(localStorageTodos);
}

// function open_modal() {
//     document.getElementsByClassName("popup")[0].style.display = 'block'
//     document.getElementsByClassName("root_form")[0].style.display = 'block'
// }



