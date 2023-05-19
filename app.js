//Selectors
const inputForm = document.querySelector(".form");
const todoForm = document.querySelector(".todo-form");
const selectForm = document.querySelector(".select");
const todoList = document.querySelector(".todo-list-container");
const backDrop = document.querySelector(".backdrop");
const myInput = document.querySelector(".my-input");
const popUp = document.querySelector(".modal");
// let todos = [];
let filterValue = "all";

//EventListener
todoForm.addEventListener("submit", addNewTodo);
selectForm.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  cerateTodo(todos);
  // editTodo()
});

//functions
function addNewTodo(e) {
  e.preventDefault();

  if (!inputForm.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: inputForm.value,
    isCompleted: false,
  };

  // todos.push(newTodo);
  saveTodo(newTodo);

  filterTodos();
}

function cerateTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += ` <div class="todo-list"> 
    <div class="todo">
    <h3 class="todo-text ${todo.isCompleted ? "completed" : ""}">${
      todo.title
    }</h3>
    <div class="items">
      <h4 class="data">${new Date(todo.createdAt).toLocaleDateString(
        "fa-IR"
      )}</h4>
      <i class="check-btn bi bi-check-square-fill" data-todo-id = ${
        todo.id
      }></i>
      <i class="remove-btn bi bi-trash3-fill" data-todo-id = ${todo.id}></i>
    </div>
  </div>
   
  </div>`;
  });
  todoList.innerHTML = result;
  inputForm.value = "";

  const removeBtn = [...document.querySelectorAll(".remove-btn")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtn = [...document.querySelectorAll(".check-btn")];
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos() {
  const todos = getAllTodos();
  if (filterValue === "all") {
    return cerateTodo(todos);
  } else if (filterValue === "completed") {
    const filteredTodos = todos.filter((t) => t.isCompleted);
    return cerateTodo(filteredTodos);
  } else if (filterValue === "uncompleted") {
    const filteredTodos = todos.filter((t) => !t.isCompleted);
    return cerateTodo(filteredTodos);
  }
  return cerateTodo(todos);
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const removeTodo = todos.filter((t) => t.id !== todoId);
  todos = removeTodo;
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

//LocalStorage => web API
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
