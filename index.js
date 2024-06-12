const apiUrl = "https://boolean-uk-api-server.fly.dev/gent009/todo";
const todoListElement = document.getElementById("todo-list");
const formElement = document.querySelector("form");

// Function to fetch todos from the server
async function fetchTodos() {
  try {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Failed to fetch todos", error);
    alert("Failed to fetch todos");
  }
}

// Function to render todos on the page
function renderTodos(todos) {
  // Remove all current children
  while (todoListElement.firstChild) {
    todoListElement.removeChild(todoListElement.firstChild);
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);

    const textNode = document.createTextNode(todo.title);
    li.appendChild(textNode);

    if (todo.completed) {
      li.classList.add("completed");
    } else {
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.onclick = () => completeTodoDOM(todo.id);
      li.appendChild(completeButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTodoDOM(todo.id);
    li.appendChild(deleteButton);

    todoListElement.appendChild(li);
  });
}

// Function to add a new todo
async function addTodoDOM(title) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const newTodo = await response.json();
    const li = document.createElement("li");
    li.setAttribute("data-id", newTodo.id);

    const textNode = document.createTextNode(newTodo.title);
    li.appendChild(textNode);

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.onclick = () => completeTodoDOM(newTodo.id);
    li.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTodoDOM(newTodo.id);
    li.appendChild(deleteButton);

    todoListElement.appendChild(li);
  } catch (error) {
    console.error("Failed to add todo", error);
    alert("Failed to add todo");
  }
}

// Function to complete a todo
async function completeTodoDOM(todoId) {
  const apiUrlWithId = `${apiUrl}/${todoId}`;

  try {
    await fetch(apiUrlWithId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });
    const li = todoListElement.querySelector(`li[data-id='${todoId}']`);
    li.classList.add("completed");
  } catch (error) {
    console.error("Failed to complete todo", error);
    alert("Failed to complete todo");
  }
}

// Function to delete a todo
async function deleteTodoDOM(todoId) {
  const apiUrlWithId = `${apiUrl}/${todoId}`;

  try {
    await fetch(apiUrlWithId, {
      method: "DELETE",
    });
    const li = todoListElement.querySelector(`li[data-id='${todoId}']`);
    todoListElement.removeChild(li);
  } catch (error) {
    console.error("Failed to delete todo", error);
    alert("Failed to delete todo");
  }
}

// Event listener for form submission
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = formElement.querySelector("input[name='title']");
  if (titleInput.value) {
    addTodoDOM(titleInput.value);
    titleInput.value = "";
  }
});

// Initial fetch of todos
fetchTodos();
