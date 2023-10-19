const state = {
    task : []
}

const root = 'http://localhost:3001'
const taskForm = document.querySelector('form')
const taskList = document.querySelector('#todo-list')

//GET function to render all tasks
const getAndRender = () => {
    fetch(`${root}/todos`)
    .then((response) => response.json())
    .then(data => {
        console.log("render all tasks", data)
        state.task = data
        removeTasks()
        renderTasks()
    })
}

//POST function to add a new task
const createTask = (event) => {
    const data = {
        id: event.target.id.value,
        title: event.target.title.value,
        completed: false
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }

    fetch(`${root}/todos`, options)
    .then((response) => response.json())
    .then(data => {
        console.log("create new task", data)
        getAndRender()
    })
}

const renderTasks = () => {
    state.task.forEach(task => {
        const taskItem = document.createElement('li')
        if (task.completed) {
            taskItem.classList.add('completed')
        }
        taskItem.innerText = task.title
        taskList.appendChild(taskItem)
    })
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    createTask(event)
})

const removeTasks = () => {
    taskList.innerHTML = ''
}

getAndRender()