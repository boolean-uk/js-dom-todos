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

        const completeButton = document.createElement("button")
        completeButton.innerText = "Complete Toggle"

        // Event listener for Complete Button
        completeButton.addEventListener("click", () => {
            // grab ID
            const todoID = task.id
            const completed = !task.completed
            // Create object in same format as OG database
            const updateCompleted = {
                id: todoID,
                title: task.title,
                completed: completed
            }
            // create Updated options for Request.
            // And turn jsobj into JSON.
            const updateOptions = {
                method: "PATCH",
                body: JSON.stringify(updateCompleted),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            fetch(`http://localhost:3000/todos/${todoID}`, updateOptions)
                .then((res) => res.json())
                .then(() => {
                    getAllTasks()
                })
        })
        
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"

        deleteButton.addEventListener("click", () => {
            // grab ID
            const todoID = task.id
            // Create object in same format as OG database
            const options = {
                method: "DELETE"
            }
            fetch(`http://localhost:3000/todos/${todoID}`, options)
                .then((res) => res.json())
                .then(() => {
                    getAllTasks()
                })
        })

        if(task.completed) {
            li.setAttribute("class", "completed")
        }
        li.append(completeButton, deleteButton)
        toDoUL.append(li)
    })
}


// on refresh load all.

getAllTasks()