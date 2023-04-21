const state = {
  todos: [],
};

const ul = document.querySelector("#todo-list");

// GET request 

function toDoList() {
  fetch("http://localhost:3000/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.todos = data;
      console.log("data", data);
      displayActivities();
    });
}
toDoList();

function displayActivities() {
  ul.innerHTML = ''
  state.todos.forEach((toDoItems) => {
    const list = document.createElement("li");

    list.innerText = toDoItems.title;
    ul.append(list);
  });
}

// POST request

function createNewTodo(newTask){
  
  const newAct = {
    title: newTask  
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAct)
  }
   fetch("http://localhost:3000/todos", options)
  .then(function (response) {
   return response.json()
  })
  .then(function(data) {
    state.todos.push(data)   
    displayActivities();         
  })
}


const form  = document.querySelector("form")

form.addEventListener("submit" ,(event) => {
event.preventDefault()

const input = document.querySelector("input")

const newTask = input.value 
createNewTodo(newTask)
form.reset()
})

