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

// TODO LIST CLEAR/REFRESH
function removeToDoItems() {
    toDoList.innerHTML = ''
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
        const buttonDiv = document.createElement('div')
        const completeButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        buttonDiv.classList.add('button-div')

        completeButton.innerText = 'Complete' 
        completeButton.addEventListener('click', () => {
            completeToDo(toDo.id, toDo.completed)
        })

        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', () => {
            deleteToDoItem(toDo.id)
        })
        buttonDiv.append(deleteButton)

        if (toDo.completed) {
            toDoLi.classList.add('completed')
            toDoLi.innerText = toDo.title
        }
        else {
            toDoLi.innerText = toDo.title
            buttonDiv.append(completeButton)
        }

        toDoList.append(toDoLi)
        toDoLi.append(buttonDiv)
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

// DELETE TODO ITEM
function deleteToDoItem(id) {
    const options = {
        method: 'DELETE'
    }

    fetch(`${root}/todos/${id}`, options)
    .then((res) => res.json())
    .then((data) => renderToDos())
}

render()