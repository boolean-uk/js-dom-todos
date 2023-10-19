const state = []
const root = "http://localhost:3000"

const form = document.querySelector('form')
const myList = document.querySelector('#todo-list') 


//GET: FETCH AND RENDER TODOS

const renderListItems = () => {
    state.todos.forEach((item) => {
        const listItem = document.createElement('li')
        myList.append(listItem)

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        listItem.append(checkbox)

        const itemTitle = document.createElement
        ('p')
        itemTitle.innerText = item.title
        listItem.append(itemTitle)

        if (item.completed) {
            itemTitle.setAttribute('class', 'completed')
        }
    })
}

fetch(`${root}/todos`)
.then(response => response.json())
.then(data => {
    state.todos = data
    renderListItems()
    })

//POST: ADD NEW DATA, RENDER IT

form.addEventListener('submit', event => {

    const newTodo = {
        title: event.target[0].value
    }

    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newTodo)
    }

    fetch(`${root}/todos`, option)
    .then(response => response.json())
    .then(() => 
        renderListItems())
})

   


