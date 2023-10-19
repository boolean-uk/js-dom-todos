const state = {
    todos: []
};

const todoList = document.querySelector("#todo-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

let todos = state.todos;
const root = "http://localhost:3000";

// GET
const getTodosAndRender = () => {
  fetch(`${root}/todos`)
    .then(res => res.json())
    .then(data => {
        todos = data;
        clearTodoList();
        renderTodos();
    });
};

const renderTodos = () => {
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerText = todo.title;

        const button = document.createElement("button");
        button.innerText = "Complete";
        button.setAttribute("class", "button");
        button.addEventListener("click",() => {
            editCompletedStatus(todo.id, todo.completed)
        });
        
        todo.completed ? 
        li.setAttribute("class", "completed")
        : li.append(button);

        todoList.append(li);
    })
};

// POST
const clearTodoList = () => {
    const allTodos = todoList.querySelectorAll("*");
    allTodos.forEach(todo => todo.remove());
};

const createTodoRequest = (e) => {
    const newTodoData = {
        title: input.value,
        completed: false
    };

    const opts = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(newTodoData)
    };

    fetch(`${root}/todos`, opts)
      .then(res => res.json())
      .then(data => {
        getTodosAndRender()
      })
};

form.addEventListener("submit", e => {
    e.preventDefault();
    createTodoRequest(e);
    form.reset();
});

// PATCH
const editCompletedStatus = (id, isComplete) => {
    const data = { completed: true };

    const opts = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    fetch(`${root}/todos/${id}`, opts)
      .then(res => res.json())
      .then(data => getTodosAndRender())
};

getTodosAndRender()