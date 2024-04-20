const GITHUB_USERNAME = "JOANNABUUMA1";
let toDoList = [];

const getAllToDos = async () => {
  const response = await fetch(
    `https://boolean-api-server.fly.dev/${GITHUB_USERNAME}/todo`
  );
  const responseData = await response.json();
  return responseData;
};

const addNewTodo = async (title) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ title: title }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `https://boolean-api-server.fly.dev/${GITHUB_USERNAME}/todo`,
    options
  );
  const responseData = await response.json();
  toDoList.push(responseData);
  render();
};

const updateToDo = async (id, method) => {
  const task = toDoList.find((item) => {
    return item.id == id;
  });
  const options = {
    method: method,
    body: JSON.stringify({ title: task.title, completed: !task.completed }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `https://boolean-api-server.fly.dev/${GITHUB_USERNAME}/todo/${id}`,
    options
  );
  const responseData = await response.json();
  toDoList = await getAllToDos();
  toDoList = toDoList.map((item) => {
    if (item.id === task.id) {
      return responseData;
    }
    return item;
  });
  render();
};

const handleOnComplete = (id) => updateToDo(id, "PATCH");
const handleOnDelete = (id) => updateToDo(id, "DELETE");

const displayError = (message) => {};

const render = () => {
  let todo_list = document.querySelector("#todo-list");
  todo_list.innerHTML = "";
  toDoList.forEach((element) => {
    let listItem = document.createElement("li");
    listItem.className = `class="item_${element.completed}`;
    listItem.innerHTML = `<div class=${
      element.completed ? "completed" : ""
    }><span>${element.title}</span>
        <button class="check" onclick="handleOnComplete(${
          element.id
        })">&#10004</button>
        <button class="cross" onclick="handleOnDelete(${
          element.id
        })">&#10006</button>
        </div>`;
    todo_list.append(listItem);
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector("form").onsubmit = (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    addNewTodo(title);
  };
  toDoList = await getAllToDos();
  render();
});
