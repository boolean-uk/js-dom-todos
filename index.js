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

        toDoList.append(newItem)
    })
}

render()

form.addEventListener("submit", (e) => {
    e.preventDefault()
    taskTitle = e.currentTarget.children[0].children[0].value
    console.log(taskTitle)
    newTask(taskTitle)
})

async function newTask(taskTitle) {
    
    
    const options = {
        method: 'POST',
        body: `{"title":"${taskTitle}"}`,
        headers: {
            'Content-type': 'application/json',
        },
      }
    
    fetch("https://boolean-api-server.fly.dev/angustownsley/todo/", options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response) 
            render()
        })
        .catch((err) => console.error(err))
}
