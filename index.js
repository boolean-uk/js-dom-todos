// State for storing all the information.
const state = {
    todos: []
}
// Linking page to JS.
const toDoList = document.querySelector('#todo-list')
const form = document.querySelector('form')
const root = "http://localhost:3000/todos"

// Rendering the Todo list.
function renderToDoList () {
    toDoList.innerHTML = ''
    state.todos.forEach((toDoThings) => {
        const listItems = document.createElement('li')
        listItems.innerText = toDoThings.title
        toDoList.append(listItems)
    })
}


// Adding to the todo list
 async function addToDo (newToDo) {
    const newtodo = {
        title: newItem,
        completed: false
    }

    const post = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newToDo)
    }

    fetch('http://localhost:3000/todos', options)
    .then((response) => response.json())
    .then((data) => {
      state.todos.push(data);
      rendertoDos();
    });
}


// Event listener for the click on Add Todo
form.addEventListener('submit', (event) => {
    const newToDo = input.value
    addToDo(newToDo)
    form.reset()
})





