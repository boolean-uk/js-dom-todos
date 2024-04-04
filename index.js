const form = document.getElementById('form')
const todoTitle = document.getElementById('todo-title')
const todoList = document.getElementById('todo-list')

function createTodoItem(todo) {
    const todoItem = document.createElement('li')
    todoItem.innerText = todo.title
    if (todo.completed) {
        todoItem.classList.add('completed')
    }
    todoList.append(todoItem)
}

function renderTodos(todos) {
    todos.forEach(todo => {
        createTodoItem(todo)
    })
}

function getAllTodos() {
    fetch('https://boolean-api-server.fly.dev/LeonardoSaraceli/todo')
        .then(res => res.json())
        .then(data => renderTodos(data))
        .catch(error => console.error(error))
}

function addTodo() {
    fetch('https://boolean-api-server.fly.dev/LeonardoSaraceli/todo', {
        method: 'POST',
        body: JSON.stringify({
            title: todoTitle.value,
        }),
        headers: {
            'Content-type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => createTodoItem(data))
    .catch(error => console.error(error))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

getAllTodos()