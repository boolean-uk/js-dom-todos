const input = document.querySelector("input[name='title']")
const form = document.querySelector('form')
const add = document.querySelector("input[type='submit']")
const todoUl = document.querySelector('#todo-list')

const state = {
    todo: []
}

//NETWORK CODE

//GET all of the todos from the json
function getAllTodos() {
    console.log('About to send GET request to /todos')
    fetch('http://localhost:3000/todos')
//confirm that you've found the server and data is okay to use
    .then(function (response) {
        console.log('response returned..', response)
        return response.json()
    })
//store the data you found into the state.todo array
    .then(function (data){
        console.log('Todo data', data)
        state.todo = data
//render the todos
        renderTodos()
    })
    console.log('end of getAllTodos')
}

function createNewTodo(newTask) {
    console.log('called: addNewTodo')
    const newTodo = {
        title: newTask,
        completed: false,
    }
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }
    console.log('About to send POST request to /todos')
    fetch('http://localhost:3000/todos', options)
    .then(function (response) {
        console.log('response returned..', response)
        return response.json()
    })
    .then(function(data) {
        console.log("New Todo:", data)
        state.todo.push(data)
        renderTodos()
    })
}

//RENDER CODE

//render the todos based on the state.todo array
function renderTodos() {
    todoUl.innerHTML = ''
    state.todo.forEach(todo => {
        const li = document.createElement('li')
        li.innerText = `${todo.title}`
// logic to handle if completed = true, assign .completed class
        if (todo.completed) {
            li.setAttribute('class', 'completed')
        }
        todoUl.append(li)
    })
}

//EVENT HANDLERS

//when add is clicked, don't reload the page, createNewTodo
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const newInput = input.value
    createNewTodo(newInput)
    form.reset()
})

// as soon as we load the page, we call getAllTodos
getAllTodos()
renderTodos()
console.log('js loaded')