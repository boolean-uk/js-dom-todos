// Instructions

// Make a GET request with fetch to http://localhost:3000/todos to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.
// When the form is submitted, make POST request with fetch to http://localhost:3000/todos to create a new Todo. Update the list of Todos without reloading the page.

// Create state variable
const state = {
  todos: [],
};

// Create root variable for the api base url
const root = "http://localhost:3000/todos";
// Select the form
const form = document.querySelector("form");
// Select todo-list container
const todoListContainer = document.querySelector("#todo-list");

// GET - READ
function getTodoList() {
  fetch(`${root}`)
    .then((response) => response.json())
    .then((data) => {
      state.todos = data;
      renderTodoList();
    });
}
getTodoList();

// Rendering todo
function renderTodoList() {
  // Render the todo list
  // Reset container
  todoListContainer.innerText = "";

  state.todos.forEach((eachtodo) => {
    // Create the li's
    const todoLi = document.createElement("li");
    todoLi.innerText = eachtodo.title;
    todoListContainer.append(todoLi);

    // Give the completed class, todos of completed true
    if (eachtodo.completed) {
      todoLi.setAttribute("class", "completed");
    }
  });
}

// POST - CREATE
const createANewTodo = (e) => {
  e.preventDefault();

  // Get the data
  // Data will be in the form of POJO --> stringify
  const data = {
    id: state.todos.length + 1,
    title: e.target[0].value,
    completed: false,
  };

  // Options
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  //http://localhost:3000/todos
  fetch(`${root}`, options)
    .then((response) => response.json())
    .then((data) => {
      getTodoList();
    });
};
form.addEventListener("submit", createANewTodo);
