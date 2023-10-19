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


function addToDo (newToDo) {
    const newtodo = {
        title: newItem,
        completed: false
    }


}

form.addEventListener('submit', (event) => {
    const newToDo = input.value
    addToDo(newToDo)
    form.reset()
})





