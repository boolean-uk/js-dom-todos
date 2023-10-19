const state = {
    task : []
}

const root = 'http://localhost:3001'
const taskForm = document.querySelector('form')
const taskList = document.querySelector('#todo-list')

const getAndRender = () => {
    fetch(`${root}/todos`)
    .then((response) => response.json())
    .then(data => {
        console.log("render all tasks", data)
        state.task = data
        renderTasks()
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

getAndRender()