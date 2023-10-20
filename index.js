const state = {
    todos:[]
}

//linking 
const form = document.querySelector('form')
const toDoList = document.querySelector('#todo-list')

function toDos(){
    fetch('https://localhost:3000/todos')
    .then((response)=>{
        return response.json()
    })
    .then ((data)=>{
        state.todos = data
        renderToDoList();
    })
}

//rendering
function renderToDoList(){
    toDoList.innerHTML=''
    state.todos.forEach((thingsToDO)=>{
        const list =document.createElement('li')
        list.innerText=thingsToDO.title
        toDoList.appendChild(list)
    })
}

async function addToDo(newTitle){
    const newlist ={
        title: newTitle,
        completed: false
    }
    const post = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newlist)
    }
    fetch('http://localhost:3000/todos', post)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            state.todos.push(data)
            renderToDoList()
        })
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = form.querySelector('input')
    const newToDo = input.value
    await addToDo(newToDo)
    form.reset()
})

ToDos();


