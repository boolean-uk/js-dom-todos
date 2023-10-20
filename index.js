const state = {
  todosList: [],
};

// variables

const root = "http://localhost:3000";
const theTodoLists = document.querySelector("#todo-list");
const form = document.querySelector("form");

// render function

function renderThePage() {
  renderTheToDos();
}

// clear the todo list

function removeTheTodoItems() {
  theTodoLists.innerHTML = "";
}

//Render list function

function renderTheToDos() {
  fetch(`${root}/todos`)
    .then((res) => res.json())
    .then((data) => {
      state.todosList = data;
      removeTheTodoItems();
      renderTheToDoItems();
    });
}
function renderTheToDoItems() {
  state.todosList.forEach((todo) => {
    const list = document.createElement("li");
    const div = document.createElement("div");
    const completedBtn = document.createElement("button");
    const deletedBtn = document.createElement("button");
    div.classList.add("btn__div");
    completedBtn.innerText = "complete";
    completedBtn.addEventListener("click", () => {
      theCompletedTodo(todo.id, todo.completed);
    });
    deletedBtn.innerText = "Delete";
    deletedBtn.addEventListener("click", () => {
      theDeletedToDo(todo.id);
    });
    div.append(deletedBtn);
    if (todo.completed) {
      list.classList.add("completed");
      list.innerText = todo.title;
    } else {
      list.innerText = todo.title;
      div.append(completedBtn);
    }
    theTodoLists.append(list);
    list.append(div);
  });
}

// new todo

function newTodoItem() {
  const data = {
    title: event.target[0].value,
    completed: false,
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(`${root}/todos`, options)
    .then((res) => res.json())
    .then((data) => renderTheToDos());
}

// FORM SUBMIT EVENT LISTENER

form.addEventListener("submit", (event) => newTodoItem(event));
// completed todo
function theCompletedTodo(id, completed) {
  const data = {
    completed: !completed,
  };

  const options = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(`${root}/todos/${id}`, options)
    .then((res) => res.json())
    .then((data) => renderTheToDos());
}

//delete todo
function theDeletedToDo(id) {
  const options = {
    method: "DELETE",
  };

  fetch(`${root}/todos/${id}`, options)
    .then((res) => res.json())
    .then((data) => renderTheToDos());
}

renderThePage();
