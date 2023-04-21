const getToDoList = document.querySelector('ul')
const li = document.createElement('li')

let state = {}
let tasks

function renderToDo() {
  getToDoList.innerHTML = ''
  for (let i = 0; i < state.tasks.length; i++) {
    let taskTitle
    taskTitle = state['tasks'][i]['title']
    const liEl = document.createElement('li')
    liEl.innerText = taskTitle
    if (state['tasks'][i]['completed'] === true) {
      liEl.style.color = 'grey'
      liEl.style.textDecoration = 'line-through'
    }
    getToDoList.append(liEl)
  }
  console.log('Finished render')
}

tasks = fetch("http://localhost:3000/todos")
  .then(function(response) {
    console.log(response)
    return response.json()
  })
  .then(function(data) {
    console.log("To do date:", data)
    state.tasks = data
    console.log("state", state)
    renderToDo()
  })


const textInput = document.querySelector('input')
const form = document.querySelector('form')
console.log(form)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const userInput = textInput.value
  const sendData = {
    title: userInput,
    completed: false
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sendData)
  }

  fetch('http://localhost:3000/todos', options).then(function() {
    renderToDo()
    console.log('POST has finished')
  })

  form.reset()
})
