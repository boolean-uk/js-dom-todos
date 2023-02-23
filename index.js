const list = document.querySelector(".todo-list");
const form = document.querySelector(".todo-form");
const errorElement = document.querySelector(".error");

const state = {
  todos: [],
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = event.target[0].value;
  const newTodoData = {
    title: newTitle,
    completed: false,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodoData),
  };

  fetch("http://localhost:3000/todos", requestOptions)
    .then((res) => res.json())
    .then((newTodo) => {
      state.todos.push(newTodo);
      renderAllTodos();
    });

  form.reset();
});

function createTodoLI(todo) {
  const li = document.createElement("li");
  li.innerText = todo.title;

  if (todo.completed === true) {
    li.setAttribute("class", "completed");
  }

  return li;
}

function renderAllTodos() {
  list.innerHTML = "";
  state.todos.forEach((todo) => {
    const li = createTodoLI(todo);
    list.appendChild(li);
  });
}

function getAllTodosFromServer() {
  fetch("http://localhost:3000/todos")
    .then((responseFromServer) => {
      if (responseFromServer.status !== 200)
        throw Error("There was some problem GETting all Todos");
      return responseFromServer.json();
    })
    .then((arrayOfTodos) => {
      state.todos = arrayOfTodos;
      renderAllTodos();
    })
    .catch((error) => {
      console.log("ERROR", error);
      errorElement.innerText = error.message;
    });
}

getAllTodosFromServer();
