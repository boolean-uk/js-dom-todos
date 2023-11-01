const state = {
  todos: []
}

const toDoList = document.querySelector('#todo-list')
const form = document.querySelector('form')

function allToDos() {
  fetch('http://localhost:3000/todos')
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          state.todos = data
          renderToDoList()
      });
}


function renderToDoList() {
  toDoList.innerHTML = ''
  state.todos.forEach((toDoThings) => {
      const listItems = document.createElement('li')
      listItems.innerText = toDoThings.title
      toDoList.appendChild(listItems)
  })
}


async function addToDo(newTitle) {
  const newAddition = {
      title: newTitle,
      completed: false
  };
  const post = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAddition)
  }
  fetch('http://localhost:3000/todos', post)
      .then((response) => response.json())
      .then((data) => {
          state.todos.push(data)
          renderToDoList()
      })
}


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const input = form.querySelector('input')
  const newToDo = input.value
  await addToDo(newToDo)
  form.reset()
})

allToDos();