//HTML elements
const inputForm = document.querySelector("form")
const toDoInput = document.querySelector("input")
const toDoUl = document.querySelector("#todo-list")

//Create todo's list
function createTodoItems(toDo) {
	const toDoLi = document.createElement("li")
	toDoLi.innerText = toDo.title
	toDoLi.classList.add("todo-item")
	// toDoLi.title = "Click if completed"

	//Create Buttons for delete and complete
	const completedBtn = document.createElement("button")
	completedBtn.innerText = "Completed"
	completedBtn.style.margin = "10px"
	completedBtn.addEventListener("click", () => {
		completeToDo(toDo)
		toDoLi.classList.toggle("completed")
	})
	const deleteBtn = document.createElement("button")
	deleteBtn.innerText = "Delete"
	deleteBtn.addEventListener("click", () => {
		deleteToDo(toDo.id)
	})

	toDoLi.appendChild(completedBtn)
	toDoLi.appendChild(deleteBtn)
	toDoUl.appendChild(toDoLi)
}

//GET toDos and add them to the list
async function getToDos() {
	const allToDos = await fetch("https://boolean-api-server.fly.dev/PerikK/todo")
	const toDos = await allToDos.json()

	toDoUl.innerHTML = ""

	toDos.forEach((td) => createTodoItems(td))
}

//Add input-form functionality
async function addToDos(event) {
	event.preventDefault()
	await fetch("https://boolean-api-server.fly.dev/PerikK/todo", {
		method: "POST",
		body: JSON.stringify({
			title: toDoInput.value,
		}),
		headers: {
			"Content-type": "application/json",
		},
	})
	getToDos()
	toDoInput.value = ""
}
inputForm.addEventListener("submit", addToDos)

//Add delete button functionality
async function deleteToDo(td) {
	const toDoUrl = `https://boolean-api-server.fly.dev/PerikK/todo/${td}`

	await fetch(toDoUrl, {
		method: "DELETE",
	})
	await getToDos()
	// try {
	// 	const response = await fetch(toDoUrl, {
	// 		method: "DELETE",
	// 	})

	// 	if (!response.ok) {
	// 		throw new Error(
	// 			`Failed to delete todo with ID ${td}: ${response.statusText}`
	// 		)
	// 	}
	// 	// await getToDos()
	// } catch (error) {
	// 	console.error("Error deleting todo:", error)
	// }
	// getToDos()
}

//Add completed button functionality
async function completeToDo(td) {
	const toDoUrl = `https://boolean-api-server.fly.dev/PerikK/todo/${td.id}`

	await fetch(toDoUrl, {
		method: "PUT",
		body: JSON.stringify({
			title: td.title,
			completed: true,
		}),
		headers: {
			"content-type": "application/json",
		},
	})
	// getToDos() Comment this out because it's brewaking the graying effect
}

getToDos()