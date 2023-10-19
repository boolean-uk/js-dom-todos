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
        addCompleteButton(item, listItem)
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

getAndRenderListItems()


    
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
        renderListItems()
        })
})



const addCompleteButton = (todo, listItem) => {
    
    if (todo.completed === false){
        const completeButton = document.createElement('button')
        completeButton.innerText = 'Complete'       
        listItem.append(completeButton)
    } 
}



//PATCH 


// / Edit method - PATCH
// const editDogIsGoodRequest = (id, isGood) => {
//   const data = {
//     isGood: !isGood,
//   }

//   const options = {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     // body needs to be a JSON format of data
//     body: JSON.stringify(data)
//   }

//   console.log(data)
//   // e.g. localhost:3000/dogs/1
//   fetch(`${root}/dogs/${id}`, options)
//     .then((response) => response.json())
//     .then(() => {
//       console.log('edited dog', data)
//       // After the request succeeds, I get the latest data from the DB
//       // and update the page
//       getDogsAndRender();
//     });
// }



