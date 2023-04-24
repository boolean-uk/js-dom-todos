const toDoUl = document.querySelector('#todo-list')
const form = document.querySelector('form')
const input = document.querySelector('input')

const state = {
  todos: []
}
// getting all the data from json
function allToDos() {
  fetch('http://localhost:3000/todos')
    .then(function (response) {
      //   console.log(response)
      return response.json()
    })
    .then(function (data) {
      state.todos = data
      //   console.log(data)
      rendertoDos()
    })
}
function rendertoDos() {
  toDoUl.innerHTML = ''
  state.todos.forEach((toDoItems) => {
    const listItems = document.createElement('li')
    listItems.innerText = toDoItems.title
    toDoUl.append(listItems)
  })
}
function createToDo(newTitle) {
  const newToDo = {
    title: newTitle,
    completed: false
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToDo)
  }
  fetch('http://localhost:3000/todos', options)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      state.todos.push(data)
      rendertoDos()
    })
}
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const newTitle = input.value
  createToDo(newTitle)
  form.reset()
})
allToDos()
rendertoDos()
