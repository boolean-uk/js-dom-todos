const state = {
    toDos: []
}

const toDoList = document.querySelector(`#todo-list`)
const newForm = document.querySelector(`form`)

// Pull todos from server
// Render todos on page

function getToDos() {
    // console.log(`getToDos is running`)

    fetch(`http://localhost:3000/todos`)
    .then(function (response) {
        // console.log(`response...`, response)
        return response.json()
    })
    .then(function (data) {
        // console.log(`data...`, data)
        state.toDos = data
        renderToDos()
    })
}

function renderToDos() {
    toDoList.innerHTML = ``
    // console.log(`state`, state.toDos)
    state.toDos.forEach(toDo => {
        const li = document.createElement(`li`)
        li.innerText = toDo.title

        if (toDo.completed) {
            li.classList.add(`completed`)
        }

        toDoList.append(li)
    })
}

getToDos()