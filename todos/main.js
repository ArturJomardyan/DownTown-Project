function setStatus(status = "") {
    localStorage.setItem("status", status);
}
function getStatus() {
    return localStorage.getItem("status") || "All";
}
function setTodos(todos = []) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

const screenBlocker = document.getElementById("screenBlocker");
const modalPopUp = document.forms.modal;
const formContainer = document.getElementsByClassName("formContainer")[0];
const all_count = document.getElementsByClassName("all_count")[0];
const active_count = document.getElementsByClassName("active_count")[0];
const completed_count = document.getElementsByClassName("completed_count")[0];
const arrow = document.getElementsByClassName("mainFormChekBox")[0];
const clearAllButton = document.getElementById("clearAll");
const clearComplitedButton = document.getElementById("clearComplited");


mainForm.textInput.addEventListener("keydown", function handleKeyDown(event) {
    if (event.keyCode === 13) {
        let todos = getTodos();
        const obj = { id: Date.now(), text: event.target.value, checked: false };
        event.target.value = "";
        todos.push(obj);
        setTodos(todos);
        renderTodosByStatus();
    }
});

function renderTodoItem({ id, text, checked }) {
    const forCloneForm = document.querySelector(".create-todo.for-clone");
    const createTodoForm = forCloneForm.cloneNode(true);
    createTodoForm.dataset.key = id;
    createTodoForm.classList.remove("hide");
    createTodoForm.classList.remove("for-clone");
    createTodoForm.textInput.value = text;
    createTodoForm.checkbox.checked = checked;
    formContainer.prepend(createTodoForm);
}

function renderTodosByStatus() {
    const pageCurrentStatus = getStatus();
    let todos = getTodos();
    switch (pageCurrentStatus) {
        case "Active":
            todos = todos.filter((item) => !item.checked);
            break;
        case "Completed":
            todos = todos.filter((item) => item.checked);
            break;
    }
    Array.from(document.forms.statusForm).forEach((element) => {
        if (element.value === pageCurrentStatus) {
            element.checked = true;
        }
    });

    const visibleTodos = document.querySelectorAll(".create-todo:not(.for-clone)");
    visibleTodos.forEach((element) => element.remove());

    todos.forEach((item) => {
        renderTodoItem(item);
    });
    statusCounter();
    chek_clearList_btns_visibility();
}

function statusCounter() {
    const allTodos = getTodos();
    const activeTodos = getTodos().filter((el) => !el.checked);
    const completedTodos = getTodos().filter((el) => el.checked);

    all_count.innerHTML = allTodos.length;
    active_count.innerHTML = activeTodos.length;
    completed_count.innerHTML = completedTodos.length;
}
statusCounter();

arrow.addEventListener("click", function handleHeaderCheckBox(event) {
    let todo = getTodos();
    if (event.target.name !== "textInput") {
        const isAllChecked = todo.every((item) => item.checked);
        todo.forEach((item) => {
            item.checked = !isAllChecked;
        });
    }
    setTodos(todo);
    renderTodosByStatus();
})

document.forms.statusForm.addEventListener("change", function handleChecked(event) {
    if (event.target.type === "radio") {
        const value = event.target.value;
        setStatus(value);
        renderTodosByStatus();
    }
});

renderTodosByStatus();

formContainer.addEventListener("click", function handleCheckBoxChange(event) {
    if (event.target.type === "checkbox") {
        const id = +event.target.parentElement.dataset.key;
        let todos = getTodos();
        todos.forEach((item) => {
            if (item.id === id) {
                item.checked = !item.checked;
            }
        });
        setTodos(todos);
        renderTodosByStatus();
    }
});

formContainer.addEventListener("click", function handleRowDeleteBtn(event) {
    if (event.target.name === "rowDeleteBtn") {
        const id = +event.target.parentElement.dataset.key;
        let todos = getTodos().filter(item => item.id !== id)
        setTodos(todos);
        renderTodosByStatus();
    }
})

formContainer.addEventListener("click", function handleRowEditeBtn(event) {
    if (event.target.name === "rowEditBtn") {
        modalPopUp.style.display = "block"
        screenBlocker.style.display = "block"
        const id = event.target.parentElement.dataset.key;
        modalPopUp.lastElementChild.innerHTML = id
        modalPopUp.textarea.value = event.target.parentElement.textInput.value
    }
})

modalPopUp.addEventListener("click", function handleModalSubmitBtn() {
    if (event.target.name === "submit") {
        modalPopUp.style.display = "none"
        screenBlocker.style.display = "none"
        let todos = getTodos()
        todos.forEach(item => {
            if (item.id === +modalPopUp.lastElementChild.innerHTML)
                item.text = modalPopUp.textarea.value
        })
        setTodos(todos);
        renderTodosByStatus();
    }
})

modalPopUp.addEventListener("click", function handleModalCloseBtn() {
    if (event.target.name === "cancel") {
        modalPopUp.style.display = "none"
        screenBlocker.style.display = "none"
    }
})

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

clearAllButton.addEventListener("click",function(event){
    let todo = getTodos();
    todo.length = 0;
    setTodos(todo);
    renderTodosByStatus();
})
clearComplitedButton

clearComplitedButton.addEventListener("click",function(event){
    let todo = getTodos();
    todo = todo.filter(item => !item.checked);
    setTodos(todo);
    renderTodosByStatus();
})





















