//- Make a `GET` request with `fetch` to `http://localhost:3000/todos` to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.
const form = document.querySelector('form')
const input = document.querySelector('input')
const todoListUl = document.querySelector('#todo-list')

// STATE

const state = {
    todos: []
}


function GETTodos() {
    fetch(`http://localhost:3000/todos`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            state.todos = data
            console.log(state.todos)
            renderTodos()
        })
}
function renderTodos() {
    todoListUl.innerHTML = ''
    for (let i = 0; i < state.todos.length; i++) {
        const initialTodoLi = document.createElement('li')
        initialTodoLi.innerText = state.todos[i].title
        todoListUl.append(initialTodoLi)
        if (state.todos[i].completed === true) {
            initialTodoLi.setAttribute('class', 'completed')
        }
    }
}

// - When the form is submitted, make `POST` request with `fetch` to `http://localhost:3000/todos` to create a new Todo. Update the list of Todos without reloading the page.


function createNewTodos(newTask) {
    const newTodo = {
        title: newTask,
        completed: false
    }
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }
    fetch(`http://localhost:3000/todos`, options)
        .then(GETTodos())
}
form.addEventListener('submit', (event) => {

    event.preventDefault()
    const todo = input.value
    createNewTodos(todo)
})
GETTodos()