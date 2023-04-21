const state = {
  todos: [],
};

const ul = document.querySelector("#todo-list");

// GET request 

function toDoList() {
  fetch("http://localhost:3000/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.todos = data;
      console.log("data", data);
      displayActivities();
    });
}
toDoList();

function displayActivities() {
  state.todos.forEach((toDoItems) => {
    const list = document.createElement("li");

    list.innerText = toDoItems.title;
    ul.append(list);
  });
}

// POST request


