const state = []
const root = "http://localhost:3000"

const form = document.querySelector('form')
const myList = document.querySelector('#todo-list') 

const removeList = () => {
    const listItems = myList.querySelectorAll('*');
    listItems.forEach(item => item.remove());
  }


//GET: FETCH AND RENDER TODOS

const renderListItems = () => {
    state.todos.forEach((item) => {
        const listItem = document.createElement('li')
        myList.append(listItem)

        const itemTitle = document.createElement
        ('p')
        itemTitle.innerText = item.title
        listItem.append(itemTitle)

        if (item.completed) {
            itemTitle.setAttribute('class', 'completed')
        }
        addCompleteButton(item, listItem, item.completed, item.id)
        addDeleteButton(listItem, item.id)
    })
    
} 

const getAndRenderListItems = () => {

    fetch(`${root}/todos`)
    .then(response => response.json())
    .then(data => {
    state.todos = data
    removeList() 
    renderListItems()
    })
}




    
//POST: ADD NEW DATA, RENDER IT

form.addEventListener('submit', event => {

    event.preventDefault()

    const newTodo = {
        title: event.target[0].value,
        completed: false
    }

    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newTodo)
    }

    fetch(`${root}/todos`, option)
    .then(response => response.json())
    .then(() => {
        getAndRenderListItems()
        })
})



const addCompleteButton = (todo, listItem, completed, id) => {
    
    if (todo.completed === false){
        const completeButton = document.createElement('button')
        completeButton.innerText = 'Complete'       
        listItem.append(completeButton)
        completeButton.addEventListener('click', () => {
        
        const newCompleteStatus = {
         completed: !completed,
        }

        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify(newCompleteStatus)  
        }
        fetch(`${root}/todos/${id}`, options)
        .then(response => response.json())
        .then(getAndRenderListItems())
        })
    } 
}


const addDeleteButton = (listItem, id) => {
    
    const completeButton = document.createElement('button')
    completeButton.innerText = 'Delete'       
    listItem.append(completeButton)
    completeButton.addEventListener('click', () => { 
   
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}, 
    }
    fetch(`${root}/todos/${id}`, options)
    .then(response => response.json())
    .then(getAndRenderListItems())
        })

}

getAndRenderListItems()
