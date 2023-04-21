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
        if (newItem.length > 1) {
        addNewToDo(newItem)
        newForm.title.value = ``
        } else {
            alert(`To Do item cannot be blank`)
            console.log(`To Do item cannot be blank`)
        }
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
        // console.log('response returned..', response)
        return response.json()
    })
    .then(function (data) {
        state.toDos.push(data)
        renderToDos()
    })
    .catch((error) => {
        console.log(error)
        alert("An error occurred, please see console log for details")
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

        const deleteButton = document.createElement(`button`)
        deleteButton.innerText = `Delete?`
        deleteEventListener(deleteButton, toDo)
        li.append(deleteButton)

        toDoList.append(li)
    })
    // console.log(state.toDos)
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
            // console.log('response returned..', response)
            return response.json()
        })
        .then(function (data) {
            state.toDos = data
            getToDos()
        })
        .catch((error) => {
            console.log(error)
            alert("An error occurred, please see console log for details")
        })
    })
}

// ADDS EVENT LISTENER TO DELETE BUTTON
function deleteEventListener (deleteButton, toDo) {
    deleteButton.addEventListener(`click`, () => {
        const options = {
            method: "DELETE",
        }

        fetch(`http://localhost:3000/todos/${toDo.id}`, options)
        .then(function (response) {
            return response.json()
        })
        .then( () => {
            getToDos()
        })
        .catch((error) => {
            console.log(error)
            alert("An error occurred, please see console log for details")
        })
    })
}

getToDos()
submitEventListener()