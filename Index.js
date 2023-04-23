// - Make a `GET` request with `fetch` to `http://localhost:3000/todos` to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.

// - When the form is submitted, make `POST` request with `fetch` to `http://localhost:3000/todos` to create a new Todo. Update the list of Todos without reloading the page.

const inputs = document.querySelectorAll('input')
const addTodos = inputs[1]
const toDoList = document.querySelector('#todo-list')
const listSelector = () => {
    return document.querySelectorAll('li')
}
const form = document.querySelector('form')
const buttonSelector = () => {
    return document.querySelectorAll('button')
}
const state = {
    todos: []
}

const findPositions = (first, second) => {
    const indicies = [];
    first.forEach((element, index) => {
        if(second.includes(element)){
            indicies.push(index);
        };
    });
    return indicies;
};


// FETCH TODO TITLES
function getTodos(){

    fetch("http://localhost:3000/todos")
    .then(function (response) {
        
        return response.json()
    })
    
    .then(function (data){
        
        state.todos = data
        renderTodos()
        
    })
    
}

// ADD A TODO ON THE LIST
function addTodo(toDo){

    const newTodo = {
        title: toDo,
        completed: false
    }

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }

    fetch("http://localhost:3000/todos", options)
    .then(function (response){
        
        return response.json()
    })
    .then(function(data){
        
        state.todos.push(data)
        

    })
}

function completeTodo(element){
    
    
    const newTodo = {
        completed: true
    }

    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }

    fetch(`http://localhost:3000/todos/${state.todos[element].id}`, options)
    .then(function (response){
        
        return response.json()
    })
    .then(function(data){
            
        state.todos.push(data)
            
    
    })

}

function deleteTodo(element){
    const options = {
        method: "DELETE"
    }

    fetch(`http://localhost:3000/todos/${state.todos[element].id}`, options)
    .then(function (response){
        
        return response.json()
    })
    .then(function(data){
            
        state.todos.push(data)
            
    
    })
    

}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const toDo = inputs[0].value
    addTodo(toDo)

    form.reset()
})

function findTruthValues() {
    let truthValues = []
    for (let i = 0; i < state.todos.length; i++){
        const toDoValues = Object.values(state.todos[i])
        truthValues.push(toDoValues[findPositions(toDoValues, [false, true])[0]])
    }
    return truthValues
}

// Render the toDo list on the page
function renderTodos(){
    
    
    
    for (let i = 0; i < state.todos.length; i++){
        const toDoListItem = document.createElement('li')
        
        toDoListItem.innerText = state.todos[i].title
        toDoList.append(toDoListItem)

    }

    
    findPositions(findTruthValues(), [false, true]).forEach(element => {
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        listSelector()[element].append(deleteButton)
        deleteButton.addEventListener('click', (event)=> {
            event.preventDefault()
            deleteTodo(element)
        })

    })
   
    
    // - Add a "Complete" button to each uncompleted Todo. 
    findPositions(findTruthValues(), [false]).forEach(element => {
        const completeButton = document.createElement('button')
        completeButton.innerText = 'Complete'
        listSelector()[element].append(completeButton)
        completeButton.addEventListener('click', (event) => {
            event.preventDefault()
            completeTodo(element)
        })
        
    })



    for (let i = 0; i < findPositions(findTruthValues(), [true]).length; i++){
        listSelector()[findPositions(findTruthValues(), [true])[i]].setAttribute('class', 'completed')
        
    }
    
    
}

// LOADED ON THE PAGE

getTodos()
renderTodos()




