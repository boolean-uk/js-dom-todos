const protocol = "http"
const baseURL = "localhost:3000"

const headers = {
  "Content-Type": "application/json"
}

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

    const pTitle = document.createElement("span")

    pTitle.innerText = element.title
    li.appendChild(pTitle)
    if (element.completed) {
      li.setAttribute("class", "completed")
    } else {
      const checkBox = document.createElement("input")
      checkBox.setAttribute("type", "checkbox")
      checkBox.setAttribute("value", "unchecked")
      checkBox.addEventListener("click", () => toggleItem(pTitle))
      li.appendChild(checkBox)
    }

    const delButton = document.createElement("button")
    delButton.innerText = "🗑️"
    delButton.setAttribute("class", "delete")
    delButton.addEventListener("click", () => deleteItem(pTitle))
    li.appendChild(delButton)

    list.appendChild(li)
  });
}

const clearListRender = () => {
  const listItems = document.querySelectorAll("li")
  listItems.forEach(item => item.remove())
}

const addFunctionalButton = () => {
  const form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    addItem(event.target[0].value)
  })
}

const addItem = (inputStr) => {
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

const toggleItem = (item) => {
  const title = item.innerText
  const stateItem = state.find(val => val.title === title)

  body = JSON.stringify({
    completed: !stateItem.completed
  })

  const options = {
    method: "PATCH",
    headers: headers,
    body: body
  }

  fetch(`${protocol}://${baseURL}/todos/${stateItem.id}`, options)
    .then(() => clearListRender())
    .then(() => loadState())
    .catch(error => console.log('error', error));
}


const deleteItem = (item) => {
  const title = item.innerText
  console.log(title)
  const stateItem = state.find(val => val.title === title)

  console.log(stateItem)

  const options = {
    method: "DELETE",
    headers: headers
  }

  fetch(`${protocol}://${baseURL}/todos/${stateItem.id}`, options)
    .then(() => clearListRender())
    .then(() => loadState())
    .catch(error => console.log('error', error));
}

loadState()
addFunctionalButton()