const url = 'https://boolean-api-server.fly.dev/samisalehsaeed/todo'

const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo-input')
const list = document.querySelector('#todo-list')

function renderTodoItem(text) {
    const li = document.createElement('li')
    li.innerText = text
    list.append(li)
}

async function getAllTodos() {
    const response = await fetch(url)
    const json = await response.json()

    list.innerHTML = ''
    json.forEach(todo => renderTodoItem(todo.title))
}

async function onSubmit(event) {
    event.preventDefault()
    
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: input.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    getAllTodos()
    input.value = ''
}

form.addEventListener('submit', onSubmit)

getAllTodos()