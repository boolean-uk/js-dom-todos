const idTodoList = document.querySelector('#todo-list')

function readTodos() {
  idTodoList.innerHTML = ''
  fetch('http://localhost:3000/todos')
      .then(function (response) {
          return response.json()
      })
      .then(function (todos) {
          todos.forEach(function (todoList) { insertIntoListToView(todoList); });
      })
}

function insertIntoListToView(todoList) {
    const listOfEl = document.createElement('li')

    const todoInput = document.createElement('input')
    todoInput.setAttribute('type', 'checkbox')
    todoInput.setAttribute('name', 'checkbox_' + todoList.id)
    todoInput.setAttribute('id', 'checkbox_' + todoList.id)
    todoInput.checked = todoList.completed

    const todoInputLabel = document.createElement('label')
    todoInputLabel.setAttribute('for', 'checkbox_' + todoList.id)
    if (todoList.completed) {
        todoInputLabel.setAttribute('class', 'completed')
    }
    todoInputLabel.innerText = todoList.title

    listOfEl.appendChild(todoInput)
    listOfEl.appendChild(todoInputLabel)

    idTodoList.appendChild(listOfEl)

    todoInput.addEventListener('change', (event) => {
        todoList.completed = todoInput.checked
        if (todoInput.checked) {
            todoInputLabel.setAttribute('class', 'completed')
        } else {
            todoInputLabel.classList.remove('completed')
        }
        fetch('http://localhost:3000/todos/' + todoList.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: todoList.title, completed: todoList.completed, })
        })
    })

}



function setup() {
    readTodos()

    const todo_form = document.querySelector('#todo-form')

    todo_form.addEventListener('submit', function (event) {
        event.preventDefault()
        const valueOutputList = todo_form.querySelector('#toDoTxt').value
        if (valueOutputList.length > 0) {
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: valueOutputList,
                    completed: false
                })
            })
                .then(function () {
                    readTodos()
                })
        }
    })
}

setup()
// function readTodos() {
//   idTodoList.innerHTML = ''
//   fetch("http://localhost:3000/todos")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (todos) {
//       todos.forEach(function(todoItem){insertIntoListView(todoItem); })
//     });
// }
// readTodos()