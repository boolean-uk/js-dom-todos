let toDoList = []

async function fetchToDo() {
  const response = await fetch("https://boolean-api-server.fly.dev/iscreamvann/todo")
  const responseData = await response.json()
  return responseData
}

// Using the taskId send a put request to update and update/load new data
async function updateTask(taskId) {

  // Get the task data using the task id
  const taskData = toDoList.find((item) => { return item.id == taskId })
  console.log("Found task data", taskData, !taskData.completed)

  // Fetch options for PUT
  const options = {
    method: "PUT",
    body: JSON.stringify({ title: taskData.title, completed: !taskData.completed}), // Reverse the current value of complete
    headers: { "Content-Type": "application/json" }
  }

  // Send the PUT request
  const response = await fetch(`https://boolean-api-server.fly.dev/iscreamvann/todo/${taskData.id}`, options)
  
  // Turn data to Javascript obj
  const responseData = await response.json()

  console.log("recieved back this",responseData)

  // Use a map to update only the value that we changed with the response of the PUT
  toDoList = toDoList.map((item) => {
    if(item.id === taskData.id){
      return responseData
    }
    // Return the item again if it isn't the edited one
    return item
  })

  // Render the new list
  renderToDoList()
}

function renderToDoList() {
  let toDoListDom = document.querySelector("#todo-list")

  // Remove previous content before adding new content
  toDoListDom.innerHTML = ""

  toDoList.forEach(element => {
    console.log(element)
    toDoListDom.innerHTML += `<li class="item_${element.completed}"><input type="checkbox" onchange="updateTask(${element.id})" ${element.completed ? "checked" : ""} />${element.title}</li>`
  });
}

async function postNewTodo(title) {
  const options = {
      method: "POST",
      body: JSON.stringify({ title: title}),
      headers: { "Content-Type": "application/json" }
  }
 
  const response = await fetch("https://boolean-api-server.fly.dev/iscreamvann/todo", options)

  const responseData = await response.json()

  toDoList.push(responseData)

  renderToDoList()

  console.log("response", responseData)
}

document.addEventListener("DOMContentLoaded", async function() {
  
  const formDOM = document.querySelector("form")

  formDOM.onsubmit = (event) => {
    // Prevent it from refreshing the page by default
    event.preventDefault()

    // Get the title value from thew form input
    const title = event.target[0].value;

    // Post the new todo title to the api
    postNewTodo(title)
    console.log("event", title)
  }
  console.log("formDom", formDOM)

  toDoList = await fetchToDo()
  
  renderToDoList()

  console.log("current data", toDoList)
});