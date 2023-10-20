const form = document.querySelector("form");
const input = document.querySelector("input");
const todoUl = document.querySelector("#todo-list");
// STATE
const state = {
  todos: [],
};

function getTodos() {
  fetch(`http://localhost:3000/todos`)
    .then((res) => res.json())
    .then((data) => {
      state.todos = data;
      todoUl.innerHTML = "";
      for (let i = 0; i < state.todos.length; i++) {
        // making the lists of todos
        const todoLi = document.createElement("li");
        todoLi.innerText = state.todos[i].title;
        console.log(state.todos[i]);

        if (state.todos[i].completed === true) {
          todoLi.setAttribute("class", "completed");
        }
        todoUl.append(todoLi);
      }
    });
}
getTodos();

function postTodo(todo) {
  fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo,
      completed: false,
    }),
  });
  getTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = input.value;
  postTodo(todo);
});
