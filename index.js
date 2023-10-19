const state = {
    tasks: []
}
const taskUL = document.querySelector("#todo-list")
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTaskTitle = document.querySelector('input').value
    createNewTask(newTaskTitle)
})
const getTasks = () => {
    fetch("http://localhost:3000/todos")
        .then((res) => {return res.json()})
        .then((tasks) => {
            state.tasks = tasks
            renderTasks()
        })
        .catch((error) => {
            alert(error)
        })
}
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
const getCompletedBtnText = (task) => {
    console.log(task)
    return task ? "Incomplete" : "Complete"
}
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
        .catch((error) => {
            alert(error)
        })
}

const deleteTask = (task) => {

    const options = {
        method: "DELETE"
    }
    
    fetch(`http://localhost:3000/todos/${task.id}`, options)
        .then(getTasks)
        .catch((error) => {
            alert(error)
        })
}

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
        .catch((error) => {
            alert(error)
        })
}

getTasks()