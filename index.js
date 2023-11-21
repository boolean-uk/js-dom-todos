const toDoList = document.querySelector("#todo-list");
const completedTodos = document.getElementById("completed-todos");
const root = "http://localhost:3000";
const addTodo = document.querySelector("form");

// state for storing data for page display //
const state = {
    todos: [],
};

// removal function //
const removeTodos = () => {
    const toDoContainer = toDoList.querySelectorAll("*");
    const completedListItems = completedTodos.querySelectorAll("li");
    toDoContainer.forEach((child) => child.remove());
    completedListItems.forEach((child) => child.remove());
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
        const completedBox = document.createElement("input");
        completedBox.setAttribute("class", "completedBox");
        completedBox.type = "checkbox";
        completedBox.checked = todo.completed;
        completedBox.value = todo.title;

        const label = document.createElement("label");
        label.append(completedBox);
        label.append(todo.title);

        const li = document.createElement("li");
        li.append(label);
        li.classList = "todoItem";

        if (todo.completed) {
            completedTodos.append(li);
            li.classList = "completedTodoItem"
        } else {
            toDoList.append(li);
        }

        completedBox.addEventListener("change", (event) => {
            console.log("hi");
            const checkboxData = event.target.value;
            console.log(checkboxData);
            state.todos.forEach((todo) => {
                console.log(todo.title)
                if (checkboxData === todo.title) {
                    todo.completed = !todo.completed;
                }
            });
            removeTodos();
            renderTodos();
        });
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
            getTodos();
        });
});

getTodos();
