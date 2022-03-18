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
}

function chek_clearList_btn_visibility() {
    all_count.innerHTML !== "0" && clearAllButton.classList.remove("hide");
    completed_count.innerHTML !== "0" && clearComplitedButton.classList.remove("hide");
}
chek_clearList_btn_visibility();

const myForm = document.getElementById("mainForm");

function createTodo({ id, text, checked }) {
    const forCloneForm = document.querySelector(".create-todo.for-clone");
    const createTodoForm = forCloneForm.cloneNode(true);
    createTodoForm.classList.remove("hide");
    createTodoForm.classList.remove("for-clone");
    createTodoForm.children[0].checked = checked;
    createTodoForm.children[1].value = text
    createTodoForm.children[0].onclick = checkBoxCheck
    myForm.after(createTodoForm);

    let storageTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const obj = { id: id || storageTodos.length + 1, text, checked };

    if (!storageTodos.some((item) => item.id === obj.id)) {
        storageTodos.push(obj);
        localStorage.setItem("todos", JSON.stringify(storageTodos));
    }
}

function renderTodos(todos) {
    const visibleTodos = document.querySelectorAll(".create-todo:not(.for-clone)");
    visibleTodos.forEach((element) => element.remove());
    todos.forEach((item) => {
        createTodo(item);
    });
    chek_clearList_btn_visibility();
}

myForm.textInput.addEventListener("keydown", function handleKeyDown(event) {
    if (event.keyCode === 13) {
        createTodo({ text: event.target.value, checked: false });
        event.target.value = "";
    }
});

renderTodos(localStorageTodos);

function checkBoxCheck() {
    let parent = this.parentElement.parentElement;
    let childCollection = parent.children
    let length = childCollection.length
    let child_index;

    for (let i = 0; i < length; ++i) {
        if (this.parentElement === childCollection[i]) {
            child_index = i;
            break;
        }
    }
    child_index = length - child_index - 2;
    localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    console.log(localStorageTodos);
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
    statusCounter()
}
statusCounter()