const state = {
  todos: [],
};

//select exiting html elements
const todosUl = document.querySelector("#todo-list");
//networking
function getAllToDos() {
  fetch("http://localhost:3000/todos")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      console.log("Received todos", responseData);
      state.todos = responseData;
      renderTodos();
    });
}
//rendering
function renderTodos() {
  todosUl.innerHTML = "";
  state.todos.forEach((todos) => {
    const li = document.createElement("li");
    li.innerText = `${todos.title}`;

    // append li onto ul
    todosUl.append(li);
    if (todos.completed === true) {
      return li.setAttribute("class", "completed");
    }
  });
}

//when we load the page,send a get request to fetch all the todos
//as soon as page loads:fetch all todos
getAllToDos();

// convert JS object to a JSON string

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newItem = event.target.title.value;
  const newTodos = {
    title: event.target.title.value,
    completed: false,
  };
  const newTodosAsJSONString = JSON.stringify(newTodos);

  const options = {
    method: "POST",
    body: newTodosAsJSONString, // what data we want to send to server: the JSON version of newTodo
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3000/todos", options)
    .then((res) => {
      return res.json(); // if after delete there is any resposne, convert to JSON
    })
    .then((todos) => {
      // usually data might just be empty
      console.log("Created new todos=", todos);
      console.log(
        "TODO: actually add person locally (update state + change UI)"
      );
    });
  getAllToDos();
});
