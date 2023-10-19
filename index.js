const state = {
    todos: [],
}

const root = 'http://localhost:3000'
const form = document.querySelector('form')
const todoUl = document.querySelector('#todo-list')

function getAndRender() {
    fetch(`${root}/todos`)
    .then((res) => res.json())
    .then((data) => {
        state.todos = data
        removeCurrentTodo()
        renderTodoList()
    })
}

function renderTodoList(){
    state.todos.forEach((todo) => {
        const list = document.createElement('li')
        list.innerText = todo.title

        list.addEventListener('click', () => {
            updateTodo(todo.id, todo.completed)
            if (todo.completed){
                list.className = 'completed'
            }
            // list.classList.toggle('completed')
        })

        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete Task"

        deleteButton.addEventListener('click', () => {
            deletTodo(todo.id)
        })   
        todoUl.append(list, deleteButton)
    })
}

function removeCurrentTodo(){
    const allLists = todoUl.querySelectorAll('*')
    allLists.forEach((list) => list.remove())
}

function createTodoRequest(event) {
    const data = {
        completed: false,
        title: event.target[0].value,
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos`, options)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        getAndRender()
    })

    event.target[0].value = ''
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    createTodoRequest(event)
})

const updateTodo = (id, completed) => {
    const data = {
        completed: !completed
    }

    const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos/${id}`, options)
    .then((res) => res.json())
    .then((data) => {
        console.log("Update data", data)
        getAndRender()
    })

}

const deletTodo = (id) => {
    const options = {
        method: 'DELETE'
    }

    fetch(`${root}/todos/${id}`, options)
    .then((res)=> res.json())
    .then((data) => getAndRender())
}

getAndRender()