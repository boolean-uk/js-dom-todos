const state = {
    todos: []
}

const toDoList = document.querySelector('#todo-list')
const form = document.querySelector('form')

// Function to fetch todos from the server
async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/todos')
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`)
        }
        const data = await response.json()
        state.todos = data
        renderTodoList()
    } catch (error) {
        console.error(error)
    }
}

// Function to render the todo list
function renderTodoList() {
    toDoList.innerHTML = ''
    state.todos.forEach(todo => {
        const listItem = document.createElement('li')
        listItem.innerText = todo.title
        toDoList.appendChild(listItem)
    })
}

// Function to add a new todo
async function addTodo(newTitle) {
    try {
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
        const response = await fetch('http://localhost:3000/todos', postOptions)
        if (!response.ok) {
            throw new Error(`Failed to add a new todo: ${response.status}`)
        }
        const data = await response.json()
        state.todos.push(data)
        renderTodoList()
    } catch (error) {
        console.error(error)
    }
}

// Event listener for form submission
form.addEventListener('submit', async event => {
    event.preventDefault()
    const input = form.querySelector('input')
    const newTodo = input.value
    await addTodo(newTodo)
    form.reset()
})

// Initial fetch of todos
fetchTodos();