const state = {
    todos: []
}

const toDoList = document.querySelector('#todo-list')
const form = document.querySelector('form')

function fetchTodos() {
    fetch('http://localhost:3000/todos')
        .then((response) => response.json())
        .then((data) => {
            state.todos = data
            renderTodoList()
        });
}

function renderTodoList() {
    toDoList.innerHTML = ''
    state.todos.forEach((todo) => {
        const listItem = document.createElement('li')
        listItem.innerText = todo.title
        toDoList.appendChild(listItem)
    })
}

async function addTodo(newTitle) {
    const newAddition = {
        title: newTitle,
        completed: false
    }
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAddition)
    }
    fetch('http://localhost:3000/todos', postOptions)
        .then((response) => response.json())
        .then((data) => {
            state.todos.push(data)
            renderTodoList()
        })
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const input = form.querySelector('input')
    const newTodo = input.value
    await addTodo(newTodo)
    form.reset()
})

fetchTodos();
