const form = document.querySelector("#new-task")
const toDoList = document.querySelector("#todo-list")

async function render() {
    const toDos = await fetch(
        "https://boolean-api-server.fly.dev/angustownsley/todo/"
    )
        .then((response) => response.json())
        .then((response) => buildList(response))
        .catch((err) => console.error(err))
}

function buildList(arr) {
    toDoList.innerHTML = ""
    arr.forEach((element) => {
        const newItem = document.createElement("li")
        newItem.innerHTML = element.title
        if (element.completed === true) {
            newItem.style.textDecorationLine = "line-through"
            newItem.style.color = "gray"
        }

        const id = element.id
        const title = element.title

        const compButton = document.createElement("button")
        compButton.addEventListener("click", () => {
            completeTask(title, id)
        })
        compButton.innerHTML = "&#x2705"

        const delButton = document.createElement("button")
        delButton.addEventListener("click", () => {
            deleteTask(id)
        })
        delButton.innerHTML = "&#10060"

        newItem.prepend(delButton)
        newItem.append(compButton)

        toDoList.append(newItem)
    })
}

render()

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const textBox = e.currentTarget.children[0].children[0]
    const taskTitle = textBox.value
    textBox.value = ""
    newTask(taskTitle)
})

async function newTask(taskTitle) {
    const options = {
        method: "POST",
        body: `{"title":"${taskTitle}"}`,
        headers: {
            "Content-type": "application/json",
        },
    }

    fetch("https://boolean-api-server.fly.dev/angustownsley/todo/", options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            render()
        })
        .catch((err) => {
            console.error(err)
            alert("Task not created, please try again")
        })
}

async function deleteTask(id) {
    const options = {
        method: "DELETE",
    }

    fetch(
        `https://boolean-api-server.fly.dev/angustownsley/todo/${id}`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            render()
        })
        .catch((err) => {
            console.error(err)
            alert("Task not deleted, please try again")
        })
}

async function completeTask(title, id) {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: `${title}`,
            completed: true,
        }),
    }

    console.log(options)

    fetch(
        `https://boolean-api-server.fly.dev/angustownsley/todo/${id}`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            render()
        })
        .catch((err) => {
            console.error(err)
            alert("Task not marked as complete, please try again")
        })
}
