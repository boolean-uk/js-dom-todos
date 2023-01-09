// STATE
const state = {
    tasks: [],
}

// SELECT EXISTING HTML ELEMENTS
const toDoUL = document.querySelector("#todo-list")
const newTaskForm = document.querySelector("form")


// EVENT LISTENERS

newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event)
    const newTaskOBJ = {
        title: event.target.title.value,
        completed: false
    }
    const newTaskAsJSON = JSON.stringify(newTaskOBJ)
    const options = {
        method: "POST",
        body: newTaskAsJSON,
        headers: {
            "Content-Type": "application/json"
        },
    }

    fetch("http://localhost:3000/todos", options)
        .then((res) => res.json())
        .then((task) => {
            console.log("New Task=", task)
            console.log("all tasks", state.tasks)
            getAllTasks()
        })
})

// NETWORKING
function getAllTasks() {
    fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((responseData) => {
            console.log("received ToDOs", responseData)
            state.tasks = responseData
            renderTasks()
        })
}

// RENDERING

function renderTasks() {
    toDoUL.innerHTML = "";

    state.tasks.forEach((task) => {
        const li = document.createElement("li")
        li.innerText = task.title
        

        if(task.completed) {
            li.setAttribute("class", "completed")
        }

        toDoUL.append(li)
    })
}


// on refresh load all.

getAllTasks()