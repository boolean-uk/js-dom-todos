// State variable 
const state = {
    tasks: []
}

// Selectors

const taskUL = document.querySelector("#todo-list")
const form = document.querySelector('form')

// Form submit eventlistener
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTaskTitle = document.querySelector('input').value
    createNewTask(newTaskTitle)
})

// Fetch data
const getTasks = () => {
    fetch("http://localhost:3000/todos")
        .then((res) => {return res.json()})
        .then((tasks) => {
            state.tasks = tasks
            renderTasks()
        })
}


// render function for the Task list
const renderTasks = () => {
    taskUL.innerHTML = ''
    state.tasks.forEach((task) => {
        const li = document.createElement('li')

        const completeBtn = document.createElement('button')
        completeBtn.innerText = getCompletedBtnText(task.completed)
        completeBtn.addEventListener('click', () => {
            updateTaskCompletion(task)
        })
        if(task.completed) {
            li.className = 'completed'
        }

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', () => {
            deleteTask(task)
        })

        li.append(completeBtn)
        li.append(deleteBtn)
        li.append(task.title)
        taskUL.append(li)
    })
}


// retruns the Text the completed button should be set to
const getCompletedBtnText = (task) => {
    console.log(task)
    return task ? "Incomplete" : "Complete"
}


// upadtes task completions then rerenders the tasks 
const updateTaskCompletion = (task) => {

    const newState = {
        completed: !task.completed
    }

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newState)
    }

    fetch(`http://localhost:3000/todos/${task.id}`, options)
        .then(getTasks)
}


// deletes the corresponding task
const deleteTask = (task) => {

    const options = {
        method: "DELETE"
    }
    
    fetch(`http://localhost:3000/todos/${task.id}`, options)
        .then(getTasks)
}


// creates a new task in the DB then rerenders the list
const createNewTask = (newTaskTitle) => {

    const taskToAdd = {
        title: newTaskTitle,
        completed: false
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskToAdd)
    }

    fetch("http://localhost:3000/todos", options)
        .then(getTasks)
}


// inital function call
getTasks()