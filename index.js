const url = "https://boolean-api-server.fly.dev/Hamada-AB/todo/";

const form = document.querySelector("#form");
const input = document.querySelector("#title");
const list = document.querySelector("#todo-list");

function createTodoItem(todo) {
  list.insertAdjacentHTML(
    "beforeend",
    `<li
          class="todo"
          data-id="${todo.id}"
          data-title="${todo.title}"
          data-completed=${todo.completed}>
          ${todo.title}
          </li>`
  );
  const titles = document.querySelectorAll(".todo");
  isCompleted(titles);
}

function isCompleted(titles) {
  titles.forEach((title) => {
    if (title.dataset.completed === "true") {
      title.classList.add("completed");
    }
  });
}

async function getAllTodos() {
  const response = await fetch(url);
  const json = await response.json();

  list.innerHTML = "";
  json.forEach((todo) => createTodoItem(todo));
}

async function onSubmit(event) {
  event.preventDefault();

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: input.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  getAllTodos();
  input.value = "";
}

form.addEventListener("submit", onSubmit);

list.addEventListener("click", (event) => {
  let clickedTitle = event.target;
  let titleId = +clickedTitle.dataset.id;
  let title = clickedTitle.dataset.title;
  let completed = clickedTitle.dataset.completed;

  clickedTitle.classList.toggle("completed");
  updateTodo(titleId, title, completed);
});

async function updateTodo(titleId, title, completed) {
  if (completed === "true") {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        id: titleId,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(url + titleId, options);
    const json = await response.json();
  }

  if (completed === "false") {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        id: titleId,
        completed: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(url + titleId, options);
    const json = await response.json();
  }
}

getAllTodos();
