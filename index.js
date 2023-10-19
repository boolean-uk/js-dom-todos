const state = {
    todos: []
}

// HIGH LEVEL VARIABLES
const root = 'http://localhost:3000'
const toDoList = document.querySelector('#todo-list')
const form = document.querySelector('form')

// FULL PAGE RENDER
function render() {
    renderToDos()
}

// RENDER TODO LIST FUNCTION
function renderToDos() {
    fetch(`${root}/todos`)
    .then((res) => res.json())
    .then((data) => {
        state.todos = data
        removeToDoItems()
        renderToDoItems()
    })
}

// RENDER TODO ITEMS FUNCTION
function renderToDoItems() {
    state.todos.forEach((toDo) => {
        const toDoLi = document.createElement('li')
        const completeButton = document.createElement('button')
        completeButton.innerText = 'Complete'

        completeButton.addEventListener('click', () => {
            completeToDo(toDo.id, toDo.completed)
        })

        if (toDo.completed) {
            toDoLi.classList.add('completed')
            toDoLi.innerText = toDo.title
        }
        else {
            toDoLi.innerText = toDo.title
            toDoLi.append(completeButton)
        }
        toDoList.append(toDoLi)
    })  
}

// CREATE NEW TODO ITEM FUNCTION

function addNewToDo(event) {
    const data = {
        title: event.target[0].value,
        completed: false,
    }

    const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos`, options) 
    .then((res) => res.json())
    .then((data) => renderToDos())
}

// FORM SUBMIT EVENT LISTENER
form.addEventListener('submit', (event) => addNewToDo(event))

// REMOVE TODOS 
function removeToDoItems() {
    toDoList.innerHTML = ''
}

// UPDATE TODO COMPLETION STATUS
function completeToDo(id, completed) {
    const data = {
        completed: !completed,
    }

    const options = {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos/${id}`, options)
    .then((res) => res.json())
    .then((data) => renderToDos())
}

render()