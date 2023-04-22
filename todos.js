const toDoList = document.querySelector('ul')
const form = document.querySelector('form')
const titleInput = document.querySelector('input')

const state = {
    todos: []
}

// fetch the json

function getTodoList() {

    fetch("http://localhost:3000/todos")
        
    .then(function (response) {
        console.log('response returned..', response)
        console.log('response body', response.body)
        return response.json()
    })  
        .then(function (data) {
            console.log('To do List', data);
            state.todos = data
            renderTodoList()
        })
    console.log('End of getTodoList');
}

// render code

function renderTodoList() {
    toDoList.innerHTML = ''
    state.todos.forEach(todo => { if (todo.title !== undefined) {
        const li = document.createElement('li');
        li.innerText = `${todo.title}`
        if (todo.completed === true) {
            li.setAttribute('class', 'completed')
        }
        toDoList.append(li)
    }
})

}


function createNewTodo(newTodoitem) {
    const newTodo = {
        title: newTodoitem,
        completed: false
    }
    
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }

    fetch('http://localhost:3000/todos', options)
        .then(function (response) {
        return response.json()
        })
        .then(function (data) {
            state.todos.push(data)
            renderTodoList()
    })

}

// EVENT HANDLES


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const newTodoitem = titleInput.value
    console.log('my todos', state.todos);
    let myTodoInList = false
    state.todos.some(todo => {
        if (newTodoitem === todo.title) {
            console.log("Can't add a repeated item to the list")
            myTodoInList = true
        }
    })

    if (myTodoInList === false) {
        createNewTodo(newTodoitem)
    }
    


     
    
    

    form.reset()
})


getTodoList()
renderTodoList()