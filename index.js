const state = []
const root = "http://localhost:3000"

const myList = document.querySelector('#todo-list') 

//const renderList = () => {}


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


//GET todos

fetch(`${root}/todos`)
.then(response => response.json())
.then(data => {
    state.todos = data
    renderListItems()
    })

//render state as a ul

//

