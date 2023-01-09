// GET ALL TODOs
console.log("About to send a GET ALL TODOs request");

fetch("http://localhost:3000/todos")
    .then((response) => {
        console.log("received response", response);
        console.log("extracting response BODY as a JS object");
        return response.json();
    })
    .then((ToDoData) => {

        console.log("Extracted JSON Body data and converted to JS Object");
        console.log("Do something with ToDoData", ToDoData);
    });

// STATE
// my local version of the data in the browser tab!
const state = {
    todos: [],
};

// SELECT EXISTING HTML ELEMENTS
const toDoUL = document.querySelector("ul"); //#todo-list

// NETWORKING
function getAllToDos() {
    // send as GET request to receive all to-dos
    fetch("http://localhost:3000/todos") // send a Request
        .then((response) => {
            // response = the Response from the server
            return response.json();
        })
        .then((responseData) => {
            // responseData = response.json()

            // we have received all todo items
            console.log("Received todo list", responseData);
            // update local STATE with fetched people
            state.todos = responseData;
            // render each person
            renderToDo();
        });
}

// RENDERING
function renderToDo() {
    console.log("rendering TODOS function?")
    // clear my list before re-rendering
    toDoUL.innerHTML = "";

    state.todos.forEach((todo) => {
        // convert to-do JS Object to a <li>
        const li = document.createElement("li");
        li.innerText = `${todo.title}`;

        //CSS
        if (todo.completed) {
            li.setAttribute("class", "completed")
        }

        // append li onto ul
        toDoUL.append(li);
    });
}

// //SETTING UP POSTS/NEW TODO ITEMS

// //Let input submitted = new JS object

// //Convert js object to a JSON string
// const newToDo ={
//     title: "", //input, ***********
//     completed: false,
// };
// const newToDoAsJSONString = JSON.stringify(newToDo)

// const options = {
//     method: "POST",
//     body: newToDoAsJSONString, // what data we want to send to server: the JSON version of newToDo
//     headers: {
//         "Content-Type": "application/json",
//     },
// };

// fetch("http://localhost:3000/todos", options)
//     .then((res) => {
//         return res.json(); // if after delete there is any resposne, convert to JSON
//     })
//     .then((todo) => {
//         console.log("Created new todo item=", todo);
//         console.log("TODO: actually add todo locally (update state + change UI)");
//     });



//****************RENDER THE TODO LIST ON THE PAGE*********************************** */
getAllToDos()