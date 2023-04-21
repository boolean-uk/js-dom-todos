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

// CREATES A NEW OBJECT IN TODOS.JSON AND RUNS getToDos() FUNCTION
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
        getToDos()
    })

}

// RENDERS TO DO ITEMS ON PAGE
function renderToDos() {
    toDoList.innerHTML = ``
    state.toDos.forEach(toDo => {
        const li = document.createElement(`li`)
        li.innerHTML = ``
        li.innerText = toDo.title
        const completeButton = document.createElement(`button`)

        if (toDo.completed) {
            li.classList.add(`completed`)
            completeButton.innerText = `No longer completed?`
        } else {
            li.className = ``
            completeButton.innerText = `Completed?`
        }
        completedEventListener(completeButton, toDo)
        li.append(completeButton)        
        toDoList.append(li)
    })
}

// ADDS EVENT LISTENER TO COMPLETED BUTTON
function completedEventListener (completeButton, toDo) {
    completeButton.addEventListener(`click`, () => {
        if (toDo.completed) {
            toDo.completed = false
        } else (
            toDo.completed = true
        )
        
        const changedCompleted = {
            id: toDo.id,
            title: toDo.title,
            completed: toDo.completed
        }
        
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(changedCompleted)
          }
    
        fetch(`http://localhost:3000/todos/${toDo.id}`, options)
        .then(function (response) {
            console.log('response returned..', response)
            return response.json()
        })
        .then( () => {
            getToDos()
        })
    })
}

getToDos()
submitEventListener()