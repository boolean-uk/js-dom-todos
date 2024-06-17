document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://boolean-uk-api-server.fly.dev/olaolumcpaul/todo";
  const todoList = document.getElementById("todo-list");
  const form = document.querySelector("form");
  const input = form.querySelector('input[name="title"]');

  // Function to render a single todo item
  const renderTodo = (todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "grey";
    }
    todoList.appendChild(li);
  };

  // Function to clear the todo list
  const clearTodos = () => {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  };

  // Function to fetch and render all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(apiUrl);
      const todos = await response.json();
      clearTodos();
      todos.forEach((todo) => renderTodo(todo));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to handle form submission and create a new todo
  const addTodo = async (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    const newTodo = { title, completed: false };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const todo = await response.json();
        renderTodo(todo);
        input.value = "";
      } else {
        console.error("Error adding todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Fetch and render todos on page load
  fetchTodos();

  // Add event listener to form submission
  form.addEventListener("submit", addTodo);
});
