const toDoList = document.querySelector("#todo-list");
const root = "http://localhost:3000";
const addTodo = document.querySelector("form");

// state for storing data for page display //
const state = {
    todos: [],
};

// removal function //
const removeTodos = () => {
    const toDoContainer = toDoList.querySelectorAll("*");
    toDoContainer.forEach((child) => child.remove());
};

// intial fetch, update of state and display of todos on page //
function getTodos() {
    fetch(`${root}/todos`)
        .then((response) => response.json())
        .then((data) => {
            state.todos = data;
            removeTodos();
            renderTodos();
        });
}

// adding list items into html for all items in state //
const renderTodos = () => {
    state.todos.forEach((todo) => {

        const li = document.createElement("li");
        li.innerText = todo.title;

        // const completed = document.createElement('input')
        // completed.type = 'checkbox'

        // toDoList.append(completed)
        toDoList.append(li);
    });
};

// when submit happens this should add todo into state and thus page //
addTodo.addEventListener("submit", (e) => {
    e.preventDefault();

    // NEW DATA TO ADD INTO STATE, added from when input button is submited and taking value //
    const data = {
        title: e.target[0].value,
        completed: false,
    };

    // The information for a post request //
    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    };

    // posting new todo to json and then adding to html //
    fetch(`${root}/todos`, options)
        .then((res) => res.json())
        .then((data) => {
            getTodos()
        });
});

getTodos();

