const todoList = document.querySelector('#todo-list')

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

getTodo()