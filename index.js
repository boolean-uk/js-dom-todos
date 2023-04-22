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
const renderTodos = () => {
    todoUl.innerHTML = ""
    state.todos.forEach(todo => {
        const li = document.createElement('li')
        li.innerText = `${todo.title}`
        if (todo.completed === true) {
            li.style.textDecoration = 'line-through'
            li.style.color = 'grey'
        }
        todoUl.append(li)
    })
}
getTodos()