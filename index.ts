const GET_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo'
const POST_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo'
const PATCH_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo/'
const DELETE_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo/'

type TodoItem = {
    id: number
    title: string
    completed: Boolean
}

type TodoItems = TodoItem[]

async function getAllTodos(): Promise<any> {
    fetch(GET_URL)
        .then(async (response) => {
            const todos = await response.json()
            renderTodoList(todos)
        })
        .catch((error) => {
            alert('ERROR: Could not fetch todos: ' + error)
            throw new Error('ERROR: Could not fetch todos: ' + error)
        })
}

async function addTodo(todo: TodoItem['title']): Promise<any> {
    const postResponse = await fetch(POST_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo }),
    })

    const todoContent = await postResponse.json()
    console.log(todoContent)
}

async function updateTodo(
    todo: TodoItem,
    completed: TodoItem['completed']
): Promise<any> {
    const postResponse = await fetch(PATCH_URL + todo.id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo.title, completed: completed }),
    })

    const todoContent = await postResponse.json()
    console.log(todoContent)
}

async function deleteTodo(todo: TodoItem): Promise<any> {
    const postResponse = await fetch(DELETE_URL + todo.id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo.title }),
    })

    const todoContent = await postResponse.json()
    console.log(todoContent)
}

function render(): void {
    const form = document.querySelector('form')

    if (!form) {
        throw new Error('ERROR: No form found in DOM')
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const newTodo = new FormData(form)
        let newData = newTodo.get('title')
        if (newData === null) {
            console.error('ERROR: Input is invalid')
        } else {
            newData = newData.toString()
            await addTodo(newData)
                .then(() => {
                    getAllTodos()
                })
                .catch((err) => {
                    alert(`ERROR: Could add todo}: ${err}`)
                    throw new Error(`ERROR: Could add todo: ${err}`)
                })
        }
    })
}

function renderTodoList(todos: TodoItems): void {
    const todoList = document.getElementById('todo-list')

    if (!todoList) {
        throw new Error('ERROR: No todo-list found in DOM')
    }

    todoList.innerHTML = ''

    todos.forEach((todo) => {
        const listItem = document.createElement('li')
        listItem.classList.add('todo-item')

        const todoTitle = document.createElement('span')
        todoTitle.innerText = todo.title
        listItem.appendChild(todoTitle)

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        listItem.appendChild(checkbox)

        const deleteButton = document.createElement('span')
        deleteButton.classList.add('delete-button', 'material-symbols-outlined')
        deleteButton.innerText = 'delete'
        listItem.appendChild(deleteButton)

        if (todo.completed) {
            todoTitle.classList.add('completed')
            checkbox.checked = true
        } else {
            todoTitle.classList.remove('completed')
            checkbox.checked = false
        }

        checkbox.addEventListener('click', async (): Promise<any> => {
            if (!todo.completed) {
                await updateTodo(todo, true)
                    .then(() => {
                        todoTitle.classList.add('completed')
                        getAllTodos()
                    })
                    .catch((err) => {
                        alert(`ERROR: Could not update ${todo.title}: ${err}`)
                        throw new Error(
                            `ERROR: Could not update ${todo.title}: ${err}`
                        )
                    })
            } else {
                await updateTodo(todo, false)
                    .then(() => {
                        todoTitle.classList.remove('completed')
                        getAllTodos()
                    })
                    .catch((err) => {
                        alert(`ERROR: Could not update ${todo.title}: ${err}`)
                        throw new Error(
                            `ERROR: Could not update ${todo.title}: ${err}`
                        )
                    })
            }
        })

        deleteButton.addEventListener('click', async (): Promise<any> => {
            await deleteTodo(todo)
                .then(() => {
                    getAllTodos()
                })
                .catch((err) => {
                    alert(`ERROR: Could not delete ${todo.title}: ${err}`)
                    throw new Error(
                        `ERROR: Could not delete ${todo.title}: ${err}`
                    )
                })
        })

        todoList.appendChild(listItem)
    })
}

render()
getAllTodos()
