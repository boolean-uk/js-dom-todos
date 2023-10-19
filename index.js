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
  FORM.addEventListener("submit", (e) => buttonAddPostAsync(e));
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
  FORM.reset();
  await requestServerAsync();
  renderTodoList();
}

async function buttonCompleteTaskAsync(event) {
  event.preventDefault();

  const payload = {
    completed: true,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  await patchServerAsync(options, event.target.parentElement.id);
  await requestServerAsync();
  renderTodoList();
}

async function buttonDeleteTaskAsync(event) {
  event.preventDefault();

  const options = {
    method: "DELETE",
  };

  await deleteServerAsync(options, event.target.parentElement.id);
  await requestServerAsync();
  renderTodoList();
}

async function getServerRootAsync() {
  const res = await fetch("json-server.json");
  const data = await res.json();
  STATE.root = `http://${data.host}:${data.port}`;
}

async function requestServerAsync(options, attempts) {
  const res = await fetch(`${STATE.root}/todos`, options);

  if (!res.ok && (attempts < 5 || !attempts)) {
    requestServerAsync(options, attempts ? ++attempts : 1);
  } else if (attempts >= 5) {
    const button = FORM.querySelector(`[value=Add]`);
    console.log("button :>> ", button);
    button.classList.add("error");
    button.value = "Error!";
    throw new Error("damn unlucky, looks like the server stuffed it");
  }
  const data = await res.json();
  (STATE.todo = data);
}

async function patchServerAsync(options, id, attempts) {
  const res = await fetch(`${STATE.root}/todos/${id}`, options);

  if (!res.ok && (attempts < 5 || !attempts)) {
    patchServerAsync(options, id, attempts ? ++attempts : 1);
  } else if (attempts >= 5) {
    const li = document.getElementById(id);
    const button = li.querySelector(".completeButton");
    button.innerText = "Error!";
    button.classList.add("error");
    throw new Error("damn unlucky, looks like the server stuffed it");
  }
}

async function deleteServerAsync(options, id, attempts) {
  const res = await fetch(`${STATE.root}/todos/${id}`, options);

  if (!res.ok && (attempts < 5 || !attempts)) {
    deleteServerAsync(options, id, attempts ? ++attempts : 1);
  } else if (attempts >= 5) {
    const li = document.getElementById(id);
    const button = li.querySelector(".deleteButton");
    button.innerText = "Error!";
    button.classList.add("error");
    throw new Error("damn unlucky, looks like the server stuffed it");
  }
}

function renderTodoList() {
  clearElement(TODO_LIST);
  STATE.todo.forEach((task) => renderTask(task));
}

function renderTask(task) {
  const li = document.createElement("li");
  li.innerText = task.title;
  li.id = task.id;

  if (task.completed) {
    li.classList.add("completed");
  } else {
    const completeButton = document.createElement("button");
    completeButton.innerText = "complete";
    completeButton.classList.add("completeButton");
    completeButton.addEventListener("click", (e) => buttonCompleteTaskAsync(e));
    li.append(completeButton);
  }

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => buttonDeleteTaskAsync(e));
  li.append(deleteButton);

  TODO_LIST.append(li);
}

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

initAsync();
