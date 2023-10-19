
// define all the different variables for the requests

const protocol = "http"
const baseURL = "localhost:3000"

let state

const loadState = () => {
  fetch(`${protocol}://${baseURL}/todos`)
    .then((response) => response.json())
    .then((data) => {
      state = data;
      renderToDos();
    })
}

const renderToDos = () => {
  const list = document.getElementById("todo-list")

  state.forEach(element => {
    const li = document.createElement("li")
    li.innerText = element.title
    if (element.completed) li.setAttribute("class", "completed")
    list.appendChild(li)
  });
}

loadState()




