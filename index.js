const STATE = {};
const FORM = document.querySelector("form");
const TODO_LIST = document.querySelector("#todo-list");

async function initAsync() {
  await getServerRootAsync();
  formInit();
  await requestServerAsync();
  renderTodoList();
}

function formInit() {
  FORM.addEventListener("submit", (e) => {
    buttonAddPostAsync(e);
  });
}

async function buttonAddPostAsync(event) {
  event.preventDefault();

  const input = FORM.querySelector("[name=title]");

  const payload = {
    title: input.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  await requestServerAsync(options);
  await requestServerAsync();
  renderTodoList();
}

async function getServerRootAsync() {
  const res = await fetch("json-server.json");
  const data = await res.json();
  STATE.root = `http://${data.host}:${data.port}`;
}

async function requestServerAsync(options) {
  const res = await fetch(`${STATE.root}/todos`, options);
  const data = await res.json();
  await (STATE.todo = data);
}

function renderTodoList() {
  clearElement(TODO_LIST);
  STATE.todo.forEach((task) => renderTask(task));
  return;
}

function renderTask(task) {
  console.log("renderTask");
  const li = document.createElement("li");
  li.innerText = task.title;
  li.classList.add(task.completed ? "completed" : null);
  TODO_LIST.append(li);
}

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

initAsync();
