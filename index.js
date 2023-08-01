function createTodoItem(todo) {
  const listItem = document.createElement("li");
  listItem.textContent = todo.title;

  if (todo.completed) {
    listItem.style.textDecoration = "line-through";
    listItem.style.color = "grey";
  }

  return listItem;
}

function loadTodos() {
  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = "";

      if (data && Array.isArray(data)) {
        data.forEach((todo) => {
          const id = todo.id || -1;
          const listItem = createTodoItem({ ...todo, id });
          todoList.appendChild(listItem);
        });
      } else {
        console.error("Error: Invalid response data format");
      }
    })
    .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  const addTodoForm = document.getElementById("add-todo-form");
  addTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = this.elements.title;
    const title = titleInput.value.trim();

    if (title) {
      const todo = {
        title,
        completed: false,
      };

      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((response) => response.json())
        .then((data) => {
          titleInput.value = "";
          loadTodos();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  loadTodos();
});
