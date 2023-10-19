const state = {
    task: []
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
            // removeCompleteButton()
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
        const completeButton = addCompleteButton(task)
        taskItem.append(completeButton)
        const deleteButton = addDeleteButton(task)
        taskItem.append(deleteButton)
        taskList.appendChild(taskItem)
    })
}

//function that adds a complete button to each task in the list 
const addCompleteButton = (task) => {
    const completeButton = document.createElement('button')
    console.log(task)
    //argument to change innerText on completed task buttons
    if (task.completed) {
        completeButton.innerText = 'Revisit'
    } else {
        completeButton.innerText = 'Complete'
    }
    //event listener to call my completeTask function that changes the completed status of the task to true
    completeButton.addEventListener('click', (event) => {
        completeTask(task.id, !task.completed)

    })
    return completeButton
}

//function to add a delete button to each task in the list
const addDeleteButton = (task) => {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', (event) => {
        deleteTask(task.id)
    })
    return deleteButton
}

//function that deletes a task from the list
const deleteTask = (id) => {
    const options = {
        method: 'DELETE'
    }

    fetch(`${root}/todos/${id}`, options)
        .then((response) => response.json())
        .then(data => {
            console.log("delete task", data)
            getAndRender()
        })
}

//function that changes the completed status of the task to true
const completeTask = (id, completed) => {
    const data = {
        completed: completed
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos/${id}`, options)
        .then((response) => response.json())
        .then(data => {
            console.log("complete task", data)
            getAndRender()
        })
}

//alternate function that removes the completed button from completed tasks
// const removeCompleteButton = () => {
//     const completedTasks = document.querySelectorAll('.completed')
//     completedTasks.forEach(task => {
//         task.querySelector('button').remove()
//     })
// }

taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    createTask(event)
})

const removeTasks = () => {
    taskList.innerHTML = ''
}

getAndRender()