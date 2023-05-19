//Selectors
const inputForm = document.querySelector(".form");
const todoForm = document.querySelector(".todo-form");
const selectForm = document.querySelector(".select");
const todoList = document.querySelector(".todo-list-container");


let todos = [];

//EventListener
todoForm.addEventListener("submit", addNewTodo);



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

  todos.push(newTodo);

  cerateTodo(todos);
}

function cerateTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += ` <div class="todo-list"> 
    <div class="todo">
    <h3 class="todo-text">${todo.title}</h3>
    <div class="items">
      <h4 class="data">${new Date(todo.createdAt).toLocaleDateString(
        "fa-IR"
      )}</h4>
      <i class="bi bi-check-square-fill" data-todo-id = ${todo.id}></i>
      <i class="bi bi-trash3-fill" data-todo-id = ${todo.id}></i>
    </div>
  </div>
  </div>`;
  });
  todoList.innerHTML = result;
  inputForm.value = "";
}
