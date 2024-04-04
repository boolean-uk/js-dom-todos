const todoList = document.querySelector('#todo-list')
const form = document.querySelector('#form')
const todoInput = document.querySelector('#input')

async function getTodo() {
    const response = await fetch('https://boolean-api-server.fly.dev/MyrtheDullaart/todo')
    const data = await response.json()

    console.log(data)
    makeTodoList(data)
}

function makeTodoList(todoData) {
    todoList.innerHTML = ''
    todoData.forEach((item) => {
        const todoLi = document.createElement('li')

        todoLi.innerText = item.title

        if (item.completed) {
            todoLi.classList.add('completed')
        }

        todoList.append(todoLi)
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

    getTodo()
}


getTodo()