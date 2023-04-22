const todoUl = document.querySelector('ul')
const form = document.querySelector('form')
const todoInput = document.querySelector('input')

const state = {
   todos: []
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const newTodo = todoInput.value
    console.log(newTodo)
    postTodos(newTodo)
    form.reset()
})
const getTodos = () => {
    fetch('http://localhost:4000/todos')
    .then(function (response) {
        return response.json()
      })
    .then(function(todos){
        state.todos = todos
        renderTodos()
    })
}
const postTodos = (newTodo) => {
    const todo = {
        title: newTodo,
        completed: false
      }
    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
    }
    
    fetch("http://localhost:4000/todos", options)
    .then(function (response) {
    return response.json()
    })
    .then(function(todo) {
    state.todos.push(todo)
    renderTodos()
    })
}
const updateTodo = (todo) => {
        const updatedTodo = {
        completed: true
        }
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodo)
    }
    console.log(todo.id)
    fetch(`http://localhost:4000/contacts/${todo.id}`, options)
    .then(function (response) {
      return response.json()
    })
    .then((data) => {
        if (todo.completed === true) {
            return todo.completed = false
        }
        if (todo.completed === false) {
            return todo.completed = true
        }
    })
    renderTodos()
  }
  // really ill with 39 degrees so i don't have energy for this anymore, sorry :(
const renderTodos = () => {
    todoUl.innerHTML = ""
    state.todos.forEach(todo => {
        const li = document.createElement('li')
        const button = document.createElement('button')
        const delButton = document.createElement('button')
        delButton.innerText = 'Delete'
        li.innerText = `${todo.title}`
        button.innerText = 'Uncomplete'
        if (todo.completed === true) {
            li.style.textDecoration = 'line-through'
            li.style.color = 'grey'
            button.innerText = 'Completed'
        }
        button.addEventListener('click', () => {
            updateTodo(todo)
        })
        todoUl.append(li)
        li.append(button, delButton)
    })
}
getTodos()