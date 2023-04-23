const todoUL = document.querySelector('ul')
const todoInput = document.querySelector('form')

const state = {
    todoArray: []
}

function getTodoList() {

    console.log("sending GET request")

    fetch("http://localhost:4000/todos")

    .then(function (response) {

        // 2: we then give fetch a function that is called when a Response comes back
        // inside this function, we extract the JSON data from the response
        console.log('response returned..', response)
        console.log('response body', response.body)
        // get the raw response object and extract the JSON data from it
        // and return that json data
        return response.json()
      })
      // 3: we then give fetch a second function that is called after the response handler
      // this function receives the returned result from the previous function, this result
      // is the JSON data CONVERTED to JS objects
      .then(function(data) {
        // data here === response.json() from the step above
    
        console.log("Contact data:", data)
        state.todoArray = data // stores todo list into my state object


        renderList() // renders the page
      })
    }

function postTodoList() {

    todoInput.addEventListener('click', function (event) {
        event.preventDefault()
        console.log('called submit')
    }  
    )





}


function renderList() {

    todoUL.innerHTML = ""

    state.todoArray.forEach(list => {
        const li = document.createElement('li')
        li.innerText = list.title

        if (list.completed === false) {
            li.innerHTML=`<del>${list.title}</del>`
        }

        todoUL.append(li)
    })




}



getTodoList()
renderList()
postTodoList()