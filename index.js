const state = {};

const addButton = document.querySelector('input[type="submit"]');
const todoListUl = document.querySelector("#todo-list");

async function getTodosAll() {
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/AtikoSpeed/todo"
  );
  state.todos = await response.json();
  renderTodos();
}

async function renderTodos() {
  todoListUl.innerHTML = "";
  for (let i = 0; i < state.todos.length; i++) {
    const currentTodo = state.todos[i];
    const todoLi = document.createElement("li");
    todoLi.textContent = currentTodo.title;
    if (currentTodo.completed == true) {
      todoLi.style = "text-decoration: line-through;";
    }
    todoListUl.appendChild(todoLi);
  }
}

async function postTodo(content) {
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/AtikoSpeed/todo",
    {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        title: content,
      }),
    }
  );
}

addButton.addEventListener("click", () => {
  event.preventDefault();
  let content = document.querySelector("[name='title']").value;
  postTodo(content);
  setTimeout(() => {
    getTodosAll();
  }, 1000);
  content = "";
});

getTodosAll();
