// SELECT HTML ELEMENTS SO WE CAN WRITE TO THE PAGE
const list = document.querySelector(".todo-list");
const form = document.querySelector(".todo-form");
const errorElement = document.querySelector(".error");

// WORKSHOP OBJECTIVES
// Review how to organise and plan our work
// as we get started
// Demonstrate code to set up LOCAL STATE
// Review FETCH

// OBJ 1
// Make a GET request with fetch to http://localhost:3000/todos to
// load all Todos from the server and render them in a list.
// Completed Todos should be grey and scored out.

// OBJ 2
// when user clicks add, POST a new todo item
// option 1: detect form submit event; prevent default behaviour; send fetch POST reuqest for a new todo
// when repsonse comes back, add todo to state.todods and re-render list
// option 2: detect form input events and store the title of the new todo in state
// then continue with option 1

// OBJ 3
// add a button to complete a todo
// when clicked, the todo will be updated via PATCH setting it to completed and the frontend will be re-rendered

// STATE
const state = {
  todos: [],
};

// HANDLE ACTIONS CODE
// OBJ 2
// detect form submit event
form.addEventListener("submit", (event) => {
  // prevent default behaviour;
  event.preventDefault();

  // read the new title
  // event.target is the <form>
  // event.target[0] is the first <input> in the form
  const newTitle = event.target[0].value;
  const newTodoData = {
    title: newTitle,
    completed: false,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodoData),
  };

  // send fetch POST reuqest for a new todo
  fetch("http://localhost:3000/todos", requestOptions)
    .then((res) => res.json())
    .then((newTodo) => {
      // when repsonse comes back add todo to state.todos
      state.todos.push(newTodo);
      // and re-render list
      renderAllTodos();
    });

  // reset form as soon as we are submitting it
  form.reset();
});

function completeTodo(todo) {
  // send a PATCH request to update this specific todo
  // setting the completed property = true
  const updatedData = {
    completed: true,
  };
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  };

  const url = `http://localhost:3000/todos/${todo.id}`;

  // send fetch POST reuqest for a new todo
  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((updatedTodo) => {
      // when repsonse comes back update our local state todo
      todo.completed = true; // note: todo JS object was given to us and is the one in Local State
      // and re-render list
      renderAllTodos();
    });
}

function deleteTodo(todo) {
  // send a DELETE request to remove this specific todo
  const requestOptions = {
    method: "DELETE",
  };

  const url = `http://localhost:3000/todos/${todo.id}`;

  // send fetch POST reuqest for a new todo
  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      // when repsonse comes back update our local state todo
      // filtering out the `todo` that was deleted (ie. keeping in all the rest)
      const remainingTodos = state.todos.filter(
        (localTodo) => localTodo.id !== todo.id
      );
      state.todos = remainingTodos;

      todo.completed = true; // note: todo JS object was given to us and is the one in Local State
      // and re-render list
      renderAllTodos();
    });
}

// RENDER CODE
function createTodoLI(todo) {
  const li = document.createElement("li");
  li.innerText = todo.title;

  // if todo.complted === true, we strikethrough
  if (todo.completed === true) {
    li.setAttribute("class", "completed");
  }

  // add a complete button
  // on click, call the completeTodo function
  const completeButton = document.createElement("button");
  completeButton.innerText = "Complete";
  completeButton.addEventListener("click", () => completeTodo(todo));
  li.appendChild(completeButton);

  // add a delete button
  // on click, call the deleteTodo function
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(todo));
  li.appendChild(deleteButton);

  return li;
}

function renderAllTodos() {
  // 3) when LOCAL state is updated, call a function to render the TODOS
  // a) clear the original list of todos
  list.innerHTML = "";
  // b) for each todo, I want to render a new todo
  state.todos.forEach((todo) => {
    // c) create a function that creates one HTML <li> for each todo
    const li = createTodoLI(todo);
    // d) add li to the list <ul>
    list.appendChild(li);
  });
}

// INIT - the first thing that is always run, when your page first loads
// 1) when page loads, call a function that makes a GET request for all TODOS
// fetch http://localhost:3000/todos with GET
function getAllTodosFromServer() {
  // this is a GET, no need to pass OPTIONS to fetch
  // call the fetch function
  fetch("http://localhost:3000/todos")
    // when I get a response, run the following 2 functions
    .then((responseFromServer) => {
      // check if my response was problematic:
      if (responseFromServer.status !== 200)
        throw Error("There was some problem GETting all Todos");
      // extracts the JSON data from the response and returns it from this function
      // the JSON data is returned as JS arrays and JS objects
      // what we return here becomes the parameter for the next then() function
      return responseFromServer.json();
    })
    .then((arrayOfTodos) => {
      // 2) on response from GET, update LOCAL state with the todos
      // state.todos is an array of all todos from the server
      state.todos = arrayOfTodos;
      // re-render my todo list
      renderAllTodos();
    })
    .catch((error) => {
      console.log("ERROR", error);
      errorElement.innerText = error.message;
    });
}

getAllTodosFromServer();
