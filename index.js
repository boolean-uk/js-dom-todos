const form = document.querySelector("form")
const url = "https://boolean-uk-api-server.fly.dev/Alistair1080/todo"
console.log(url)
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")



// fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//         title: "test"
//     }),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })

function renderToDoList () {
    todoList.innerHTML = ""
    fetch(url)
        .then(response => response.json())
        .then(todos => {
            // console.log(todos)
            todos.forEach(todo => {
                console.log(todo)
                const li = document.createElement("li")
                li.innerText = todo.title

                if (todo.completed === true) {
                    li.classList.add("completed")
                }
                todoList.append(li)
            });
        })

}

renderToDoList()

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(todoInput.value)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
        title: todoInput.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(asd => {
            todoInput.value = ""
            renderToDoList()
        })

})