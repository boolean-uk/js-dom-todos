// constants
const mainAddress = "http://localhost:3000/todos/";

// IMPORTS
const todoListContent = document.querySelector("#todo-list");
const form = document.querySelector("form");

// state
const state = {
    todos: [],
};

// render function
const renderTodos = () => {
    // Clean todo list content and delete all of the element from it
    todoListContent.querySelectorAll("li").forEach((item) => item.remove());

    state.todos.forEach((todo) => {
        // main block of todo item
        const todoItem = document.createElement("li");
        todoItem.setAttribute(
            "class",
            `todo-item ${todo.completed ? "todo-item--completed" : ""}`
        );
        todoItem.innerText = todo.title;

        // complete button

        if (!todo.completed) {
            const completeButton = document.createElement("button");
            completeButton.innerText = "Complete";
            completeButton.setAttribute("class", "todo-btn");

            completeButton.addEventListener("click", () =>
                postCompleteTodo(todo.id)
            );

            todoItem.append(completeButton);
        }

        // delete button

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("class", "todo-btn");

        deleteButton.addEventListener("click", () => deleteTodo(todo.id));

        todoItem.append(deleteButton);

        // main configuration

        todoListContent.append(todoItem);
    });
};

// FETCH REQUESTS

// get data
const fetchData = () =>
    fetch(mainAddress)
        .then((response) => response.json())
        .then((data) => {
            state.todos = data;
            renderTodos();
        });

// post complete todo
const postCompleteTodo = (id) => {
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
    };

    fetch(mainAddress + id, options).then(() => fetchData());
};

// delete todo
const deleteTodo = (id) =>
    fetch(mainAddress + id, { method: "DELETE" }).then(() => fetchData());

// form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        id: Date.now(),
        title: e.target[0].value,
        completed: false,
    };

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    fetch(mainAddress, options).then(() => fetchData());

    e.target[0].value = "";
});

fetchData();
