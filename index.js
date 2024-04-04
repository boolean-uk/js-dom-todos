//Build list item
const buildLi = (item) => {
    const li = document.createElement('li')
    li.innerText = item.title
    if (item.completed) {
        li.style.textDecoration = 'line-through'
        li.style.color = 'grey'
    }
    return li
}

//Render todo list
const getToDos = async () => {
    const rawData = await fetch('https://boolean-api-server.fly.dev/MrStashy/todo')
    const data = await rawData.json()

    const toDoList = document.querySelector("#todo-list")
    toDoList.innerHTML = ''

    data.forEach(el => {
        const li = buildLi(el)
        toDoList.append(li)
    })
}

//Add event listener to form
const addForm = document.querySelector('form')
    addForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newToDo = document.querySelector('input[name="title"]')
    postToDo(newToDo.value)
})

//Post to do
const postToDo = async newToDo => {
    const url = 'https://boolean-api-server.fly.dev/MrStashy/todo'
    const options = {method: 'POST',
        body: JSON.stringify({
        title: newToDo,
        completed: false,
    }),
        headers: {
            'content-type': 'application/json'
        },
    }
    const response = await fetch(url, options)
    getToDos()
}

getToDos()
