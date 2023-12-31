
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#inputTodo");
const lists = document.getElementById("lists");
const messageElement = document.getElementById("message");

//create To do
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.classList.add("li-style");
    todoElement.id = todoId;
    todoElement.innerHTML = `
    <span> ${todoValue}</span>
    <span> <button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;


    lists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)
};

//delete todo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement;

    lists.removeChild(selectedTodo);
    showMessage("To do is deleted", "danger");


    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id)
    localStorage.setItem("mytodos", JSON.stringify(todos));
};


//show message
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 2000);
};


//get todos from localstorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.
        parse(localStorage.getItem("mytodos")) : [];
};

//add function
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = inputTodo.value;

    //unique Id
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage("todo is added", "success");

    //adding to localStorage
    const todos = getTodosFromLocalStorage();

    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos)
    );
    inputTodo.value = "";
};

//load todo
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
};

//add listener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);