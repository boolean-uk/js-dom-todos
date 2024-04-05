//HTML ELEMENTS
const form = document.querySelector("form");
const input = form.querySelector("input");
const submitBtn = form.querySelector("input[type=submit]");
const todoList = document.querySelector("#todo-list");
//
//FETCHING
async function baseFetch(method, endpoint = "", data) {
	const body = JSON.stringify(data);
	console.log(body);

	return (
		await fetch(
			`https://boolean-api-server.fly.dev/rafa-lopes-pt/todo${endpoint}`,
			{
				headers: {
					"accept": " application/json",
					"Content-Type": "application/json",
				},
				method,
				body,
			}
		)
	).json();
}
//===ENDPOINTS
//POST
async function addTodo(data) {
	return baseFetch("POST", "", data);
}
//GET
async function getAllTodos() {
	return baseFetch("GET");
}
async function getTodo(data) {
	return baseFetch("GET", "/" + data);
}
//DEL
async function delAllTodos() {
	return baseFetch("DELETE");
}
async function delTodo(data) {
	return baseFetch("DELETE", "/" + data);
}
//PUT
async function updateTodo(data, id) {
	return baseFetch("PUT", "/" + id, data);
}
//===
//COMPONENTS
//TODO ITEM
const TodoElement = (data = { title: "", id: 0, completed: false }) => {
	const li = document.createElement("li");
	li.innerHTML = data?.title;
	li.setAttribute("data-id", data.id);

	data.completed && li.classList.add("completed");

	return li;
};

//FORM REQUESTS (EVENT HANDLERS)

async function addTodoHandler(data = { title: "" }) {
	await addTodo(data);
	render();
}
async function updateTodoHandler(
	data = { title: "", id: 0, completed: false }
) {
	await update(data);
	render();
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	//Add logic to find out if is updating or creating
	//call appropriate handler

	addTodoHandler({ title: input.value });
	input.value = "";
});

//RENDERERS
async function renderTodoList() {
	const list = await getAllTodos();
	todoList.replaceChildren(...list.map((el) => TodoElement(el)));
}

async function render() {
	renderTodoList();
}

render();
