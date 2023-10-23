console.log("linked ok")
const root = "http://localhost:3000"
const listContainer = document.querySelector("#todo-list")

function renderCurrentState () {
    fetch(`${root}/todos`)
        .then((response) => response.json())
        .then((data) => {
         // console.log(data)
            console.log("in get request")
            removeTasks()
            renderTasks(data)
    })
}


function removeTasks () {
    const listItems = listContainer.querySelectorAll("*")
    console.log("in remove")
    // console.log(listItems)
    // This for each will remove the current list displayed
    listItems.forEach((task) => task.remove())
}

function renderTasks (tasks) {
    console.log("in render")
    // console.log(tasks)
    tasks.forEach((data) => {
        // console.log(data)
        const task = document.createElement("ul")
        task.innerText = data.title
        if (data.completed === true) {
            task.setAttribute("class","completed")
        }
        else {
            task.setAttribute("class","")
        }
        listContainer.append(task)
    })
}

renderCurrentState()

// work on creating a post request whenever the todo add button is pressed
// a data container can be made and the title updated
// complete set as no
// after updating state call renderCurrentState

function addTask (task) {
    const newTaskData = {
        completed: false,
        title: task,
    }

    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData)
    }

    // console.log(newTaskData)
    // console.log(options)

    fetch(`${root}/todos`, options)
        .then((response) => response.json())
        .then((newData) => {
            console.log(newData)
            renderCurrentState()
        })

}

const formInputContainer = document.querySelector('input[name="title"]')
// console.log(formInputContainer.value)

const form = document.querySelector("form")
// console.log(form)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("Task been added. Task:", formInputContainer.value)
    addTask(formInputContainer.value)
    formInputContainer.value = ""
})