const todoList = document.querySelector('#todo-list')
const form = document.querySelector('#form')
const todoInput = document.querySelector('#input')

async function getTodo() {
    const response = await fetch('https://boolean-api-server.fly.dev/MyrtheDullaart/todo')
    const data = await response.json()

    makeTodoList(data)
}

function makeTodoList(todoData) {
    todoList.innerHTML = ''
    todoData.forEach((item) => {
        const todoLi = document.createElement('li')
        const completeButton = createCompleteButton()

        todoLi.innerText = item.title

        if (item.completed) {
            todoLi.classList.add('completed')
        }

        todoLi.prepend(completeButton)
        todoList.append(todoLi)

        completeButton.addEventListener('click', () => {
            completeTodo(item)
        })
    });
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    createTodo()
})

async function createTodo() {
    const url = 'https://boolean-api-server.fly.dev/MyrtheDullaart/todo'
    const options = {
        method: 'POST',
        body: JSON.stringify({
            title: todoInput.value,
            completed: false
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }

    const response = await fetch(url, options)
    const json = await response.json()

    todoInput.value = ''

    getTodo()
}

function createCompleteButton() {
    const completeButton = document.createElement('button')

    completeButton.classList.add('complete-button')
    completeButton.innerText = 'Complete'

    return completeButton
}

async function completeTodo(item) {
    const url = `https://boolean-api-server.fly.dev/MyrtheDullaart/todo/${item.id}`
    const options = {
        method: 'PUT',
        body: JSON.stringify({
            title: item.title,
            completed: !item.completed
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }

    const response = await fetch(url, options)
    const json = await response.json()

    getTodo()
}

getTodo()