const state = {
    toDos: []
}

const toDoList = document.querySelector(`#todo-list`)
const newForm = document.querySelector(`form`)

// READS DATA FROM TODOS.JSON AND FEEDS IT TO THE renderToDos() FUNCTION
function getToDos() {
    fetch(`http://localhost:3000/todos`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        state.toDos = data
        renderToDos()
    })
}

// ADDS EVENT LISTENER TO SUBMIT BUTTON AND FEEDS ENTERED TEXT TO addNewToDo() FUNCTION
function submitEventListener() {
    newForm.addEventListener(`submit`, (event) => {
        event.preventDefault()
        let newItem = newForm.title.value
        addNewToDo(newItem)
    })
}

// Read text entered in input box
// prevent page reload on submit
// post request to a constant
// fetch request to add data to array and run render function

// CREATES A NEW OBJECT IN TODOS.JSON AND RUNS RENDER FUNCTION
function addNewToDo(newItem) {

    const newToDo = {
        title: newItem,
        completed: false
    }

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newToDo)
      }

    fetch(`http://localhost:3000/todos`, options)
    .then(function (response) {
        console.log('response returned..', response)
        return response.json()
    })
    .then(function (data) {
        state.toDos.push(data)
        renderToDos()
    })

}

function renderToDos() {
    toDoList.innerHTML = ``
    // console.log(`state`, state.toDos)
    state.toDos.forEach(toDo => {
        const li = document.createElement(`li`)
        li.innerText = toDo.title

        if (toDo.completed) {
            li.classList.add(`completed`)
        }
        
        toDoList.append(li)
    })
}

getToDos()
submitEventListener()