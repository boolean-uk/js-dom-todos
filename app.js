document.addEventListener("DOMContentLoaded", function () {
    const todo = document.getElementById("todolist");
    const todoInput = document.getElementById("todo-input");
    const errorNotification = document.getElementById("error-notification"); // error notification
  
    // Function to fetch and render js-dom-todos
    const fetchAndRenderTodos = () => {
      fetch("http://localhost:3000")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
  
          }
          return response.json();
        })
        .then((data) => {
          todo.innerHTML = "";
          data.forEach((todo) => {
            const listItem = document.createElement("li");
            listItem.textContent = todo.text;
  
            // Create "Complete" button for uncompleted todos
            if (!todo.completed) {
              const completeButton = document.createElement("button");
              completeButton.textContent = "Complete";
              completeButton.addEventListener("click", () => {
                completeTodo(todo.id);
              });
              listItem.appendChild(completeButton);
            }
  
            // Create "Delete" button for all todos
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
              deleteTodo(todo.id);
            });
  
            listItem.appendChild(deleteButton);
  
            if (todo.completed) {
              listItem.style.textDecoration = "line-through";
              listItem.style.color = "grey";
            }
            todo.appendChild(listItem);
          });
        })
        .catch((error) => showError("Error fetching todos: " + error.message));
    };
    
    // Initial fetch and render
    fetchAndRenderTodos();
  
    // Event listener for form submission
    todo.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodo = todoInput.value;
      if (newTodo) {
        fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTodo, completed: false }),
        })
          .then(() => {
            todoInput.value = ""; // to clear input
            fetchAndRenderTodos(); // Fetch and render updated todos
          })
          .catch((error) => showError("Error adding todo: " + error.message));
      }
    });
  
    // Function to display error message
    function showError(message) {
      errorNotification.textContent = message;
      setTimeout(() => {
        errorNotification.textContent = "";
      }, 5500);
    }
  
    // Function to complete a todo
    const completeTodo = (todoId) => {
      fetch(`http://localhost:3000/js-dom-todos/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      })
        .then(() => fetchAndRenderTodos()) // Fetch and render updated todos
        .catch((error) => showError("Error completing todo: " + error.message));
    };
  
    // Function to delete a todo
    const deleteTodo = (todoId) => {
      fetch(`http://localhost:3000/js-dom-todos/${todoId}`, {
        method: "DELETE",
      })
        .then(() => fetchAndRenderTodos()) // Fetch and render updated todos
        .catch((error) => showError("Error deleting todo: " + error.message));
    };
  
    // Event listener for add on add todo form
    todo.addEventListener("Add", (e) => {
      e.preventDefault();
      const newTodo = todoInput.value;
      if (newTodo) {
        fetch("http://localhost:3000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTodo, completed: false }),
        })
          .then(() => {
            todoInput.value = ""; // to the input
            fetchAndRenderTodos(); // Fetch and render updated todos
          })
          .catch((error) => showError("Error adding todo: " + error.message));
      }
    });
  });
    // Function to delete a todo
    const deleteTodo = (todoId) => {
        fetch(`http://localhost:3000/todos/${todoId}`, { // Corrected the URL
          method: "DELETE",
        })
          .then(() => {
            fetchAndRenderTodos(); // Fetch and render updated todos after deletion
          })
          .catch((error) => showError("Error deleting todo: " + error.message));
      };
    
      