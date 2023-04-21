const state = {
  todos: [],
};

// Select the ul element on the page
const todosUL = document.querySelector("ul");
const form = document.querySelector("form");
const todoInput = document.querySelector("input");

// NETWORK CODE
// Use the GET method to fetch all the list of todos from the server
const getAllTodos = () => {
  // Pass the /todos endpoint to the fetch API.
  fetch("http://localhost:5000/todos")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Save the data returned in our state.todos array.
      state.todos = data;
      renderTodos();
    });
};

// Create a new function and set a default value for the isComplete
const createNewTodo = (inputValue, isComplete = false) => {
  const newTodo = {
    todoName: inputValue,
    isComplete
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  };

  fetch("http://localhost:5000/todos", options)
    .then((response) => response.json())
    .then((data) => {
      state.todos.push(data);
      renderTodos();
    });
};

// Complete form submission.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = todoInput.value;
  // If form is submitted with no data, don't do anything.
  if (inputValue === "") {
    return;
  } else {
    createNewTodo(inputValue);
  }

  form.reset();
});

// RENDER TODO LIST
// Create a function to render the todos
const renderTodos = () => {
  // Clear the ul element.
  todosUL.innerHTML = "";
  // Loop through the list of todos and display with li
  state.todos.forEach((todo) => {
    // Create a new li element for each list
    const todoLI = document.createElement("li");
    // Check if task is completed. If yes, apply style
    if (todo.isComplete === true) {
      todoLI.style.color = "#80898f";
      todoLI.style.textDecoration = "line-through";
    }
    // Set the text content of the li
    todoLI.textContent = todo.todoName;
    // Append the list to the ul
    todosUL.append(todoLI);
  });
};

getAllTodos();
renderTodos();
