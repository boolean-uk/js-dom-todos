const todoList = document.querySelector('#todo-list')
const form = document.querySelector('#form')
const todoInput = document.querySelector('#input')
async function getTodo() {
    const response = await fetch('https://boolean-api-server.fly.dev/Shaun-Harris/todo')
    const data = await response.json()
    makeTodoList(data)
}


function makeTodoList(todoData) {
    todoList.innerHTML = ''
    todoData.forEach((item) => {
        const todoLi = document.createElement('li')
        const deleteButton = createDeleteButton()
        todoLi.innerText = item.title
        if (item.completed) {
            todoLi.classList.add('completed')
        }
        if (!item.completed) {
            const completeButton = createCompleteButton()
            todoLi.append(completeButton)
            completeButton.addEventListener('click', () => {
                completeTodo(item)
            })
        }
        
        todoLi.prepend(deleteButton)
        todoList.append(todoLi)

        deleteButton.addEventListener('click', () => {
            deleteTodo(item)
        })

    });

}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    createTodo()
})

async function createTodo() {
    try {
        const url = 'https://boolean-api-server.fly.dev/Shaun-Harris/todo'
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
    
    if(response.status >= 400) {
        throw new Error ('Failed to create new todo')
    }
    
    } catch(error) {
    alert(error.message)
    }
}


function createCompleteButton() {
    const completeButton = document.createElement('button')
    completeButton.classList.add('complete-button')
    completeButton.innerText = 'Complete'
    return completeButton
}
async function completeTodo(item) {
    try {
        const url = `https://boolean-api-server.fly.dev/Shaun-Harris/todo/${item.id}`
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

        if(response.status >= 400) {
            throw new Error ('Failed to complete todo')
        }
    } catch(error) {
        alert(error.message)
    }
}


function createDeleteButton() {
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerText = 'Delete'
    return deleteButton
}

async function deleteTodo(item) {
    try {
        const url = `https://boolean-api-server.fly.dev/Shaun-Harris/todo/${item.id}`
        const options = {
            method: 'DELETE',
            body: JSON.stringify({
                title: item.title,
                completed: item.completed
            }),
            headers: {
                'Content-type': 'application/json',
            },
        }
        
        const response = await fetch(url, options)
        const json = await response.json()

    getTodo()

        if(response.status >= 400) {
            throw new Error ('Failed to delete todo')
        }

    } catch(error) {
        alert(error.message)
    }
}

getTodo()