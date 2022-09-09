const todoList = document.querySelector('#todo-list')

function insertIntoTodoListView(todoItem) {
    const listElement = document.createElement('li')

    const todoCompleted = document.createElement('input')
    todoCompleted.setAttribute('type', 'checkbox')
    todoCompleted.setAttribute('name', 'checkbox_' + todoItem.id)
    todoCompleted.setAttribute('id', 'checkbox_' + todoItem.id)
    todoCompleted.checked = todoItem.completed

    const todoCompletedLabel = document.createElement('label')
    todoCompletedLabel.setAttribute('for', 'checkbox_' + todoItem.id)
    todoCompletedLabel.innerText = todoItem.title

    listElement.appendChild(todoCompleted)
    listElement.appendChild(todoCompletedLabel)

    todoList.appendChild(listElement)
}

function readTodoListData() {
    todoList.innerHTML = ''
    fetch('http://localhost:3000/todos')
        .then(function (response) {
            return response.json()
        })
        .then(function (todos) {
            todos.forEach(function (todoItem) { insertIntoTodoListView(todoItem); });
        })

}

function setup() {
    readTodoListData()

    const todoForm = document.querySelector('#todoForm')
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const valueInputField = todoForm.querySelector('#todoText').value
        if (valueInputField.length > 0) {
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: valueInputField,
                    completed: false
                })
            })
                .then(function () {
                    readTodoListData()
                })
        }
    })

}

setup()