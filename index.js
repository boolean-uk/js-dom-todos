const state = {
    todos: []
}

const root = 'http://localhost:3000'
const toDoList = document.querySelector('#todo-list')

function render() {
    renderToDos()
}


function renderToDos() {
    fetch(`${root}/todos`)
    .then((res) => res.json())
    .then((data) => {
        state.todos = data
        renderToDoItems()

    })
}

function renderToDoItems() {
    state.todos.forEach((toDo) => {
        const toDoLi = document.createElement('li')

        if (toDo.completed) {
            toDoLi.innerText = toDo.title
        }
        else {
            toDoLi.classList.add('strike-through')
            toDoLi.innerText = toDo.title
        }
        toDoList.append(toDoLi)
    })  
}


render()