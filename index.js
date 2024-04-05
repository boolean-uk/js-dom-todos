function createTodoItems(toDo) {
	const toDoLi = document.createElement("li")
	toDoLi.innerText = toDo.title

	return toDoLi
}

async function getToDos() {
	const toDoData = await fetch("https://boolean-api-server.fly.dev/PerikK/todo")
	const toDos = await toDoData.json()
	console.log(toDos)

	const toDoUl = document.getElementById("todo-list")

	toDos.forEach((td) => {
		const toDo = createTodoItems(td)
		toDoUl.append(toDo)
	})
}
getToDos()
