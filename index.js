const ultoDo = document.querySelector("#todo-list");
function createTodoItems(toDo) {
  const listTodo = document.createElement("li");
  listTodo.innerText = toDo.title;
  listTodo.classList.add("todo-item");

  const buttonComplete = document.createElement("button");
  buttonComplete.innerText = "Completed";
  buttonComplete.addEventListener("click", () => {
    completeToDo();
    listTodo.classList.toggle("completed");
  });
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteToDo(toDo.id);
  });

  listTodo.appendChild(buttonComplete);
  listTodo.appendChild(deleteButton);
  ultoDo.appendChild(listTodo);
}
async function gettingtoDos() {
  const allToDos = await fetch(
    "https://boolean-api-server.fly.dev/MrAdam11/todo"
  );
  const toDos = await allToDos.json();

  ultoDo.innerHTML = "";

  toDos.forEach((todo) => createTodoItems(todo));
}
const input = document.querySelector("input");

async function addingToDos(event) {
  event.preventDefault();
  await fetch("https://boolean-api-server.fly.dev/MrAdam11/todo", {
    method: "POST",
    body: JSON.stringify({
      title: input.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  gettingtoDos();
  input.value = "";
}
const inputForm = document.querySelector("form");
inputForm.addEventListener("submit", addingToDos);

async function completeToDo(todo) {
  const URL = `https://boolean-api-server.fly.dev/MrAdam11/todo/${todo.id}`;
  await fetch(URL, {
    method: "PUT",
    body: JSON.stringify({
      title: todo.title,
      completed: true,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}
async function deleteToDo(todo) {
  const URL = `https://boolean-api-server.fly.dev/MrAdam11/todo/${todo}`;

  await fetch(URL, {
    method: "DELETE",
  });
  await gettingtoDos();
}
gettingtoDos();
