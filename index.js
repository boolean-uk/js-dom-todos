const state = {
    todos: []
};

const todoList = document.querySelector("#todo-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

let todos = state.todos;
const root = "http://localhost:3000";

const getTodosAndRender = () => {
  fetch(`${root}/todos`)
    .then(res => res.json())
    .then(data => {
        todos = data;

        renderTodos();
    });
};

const renderTodos = () => {
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerText = todo.title;
        
        if (todo.completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "grey";
        };

        todoList.append(li);
    })
};

getTodosAndRender()