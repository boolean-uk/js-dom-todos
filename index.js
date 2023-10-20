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
    if (element.completed) {
      li.setAttribute("class", "completed")
    } else {
      const checkBox = document.createElement("input")
      checkBox.setAttribute("type", "checkbox")
      li.appendChild(checkBox)
    }

    list.appendChild(li)
  });
}

const clearListRender = () => {
  const listItems = document.querySelectorAll("li")
  listItems.forEach(item => item.remove())
  console.log(listItems)
}

const addFunctionalButton = () => {
  const form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    addItem(event.target[0].value)
  })
}

const addItem = (inputStr) => {
  const headers = {
    "Content-Type": "application/json"
  }

  const body = JSON.stringify({
    title: inputStr,
    completed: false
  })

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  }

  console.log(options, options.body)

  fetch(`${protocol}://${baseURL}/todos`, options)
    .then(() => clearListRender())
    .then(() => loadState())
    .catch(error => console.log('error', error));
}

loadState()
addFunctionalButton()