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
    const taskInput = event.target.title.value

    if(taskInput.length > 1) {
        const newTaskOBJ = {
            title: taskInput,
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
            .then((res) => {
                console.log("Server Response to POST Fetch Status:", res.status)
                return res.json()
            })
            .then((task) => {
                getAllTasks()
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Task Input must be greater than 1 character")
        console.log("Task Input must be greater than 1 character")
    }
})

// NETWORKING
function getAllTasks() {
    fetch("http://localhost:3000/todos")
    .then((res) => {
        console.log("Server Response to getAllTasks Function - GET Fetch Status:", res.status)
        return res.json()
    })
    .then((responseData) => {
        state.tasks = responseData
        renderTasks()
    })
    .catch((error) => {
        alert(error)
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
            .then((res) => {
                console.log("Server Response to PATCH Fetch Status:", res.status)
                return res.json()
            })
            .then(() => {
                getAllTasks()
            })
            .catch((error) => {
                alert(error)
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
            .then((res) => {
                console.log("Server Response to DELETE Fetch Status:", res.status)
                return res.json()
            })
            .then(() => {
                getAllTasks()
            })
            .catch((error) => {
                alert(error)
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