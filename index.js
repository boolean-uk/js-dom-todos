const root = `http://localhost:3000`
const state = {
    todos: [],
}

// for linking
const form = document.querySelector('form')
const todoListUl = document.querySelector("#todo-list")

function removeListItems(){
    todoListUl.innerHTML=''
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    //get data fron form
    const data = {
        title: event.target.title.value
    }

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        //body needs tobe a json form data
        body: JSON.stringify(data)
    }

    fetch(`${root}/todos`, options)
        .then((response) => response.json())
        .then((data) => {
            state.todos = data
            //state.todos.push(response);  
            console.log(data)
            fetchRender()
        })


})


const renderTodos = () => {
   // console.log(state.todos)
    state.todos.forEach(value => {
        const li = document.createElement('li')
        li.innerText = value.title
        todoListUl.append(li)
    })
}
function fetchRender(){
 fetch(`${root}/todos`)
    .then((response) => response.json())
    .then((data) => {
        state.todos = data
        console.log(data)
        removeListItems()
        renderTodos()

    })
}
fetchRender()