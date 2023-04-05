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
const addButton = document.querySelector("#submit") //is this how you select the input type? 
const taskToAdd = document.querySelector("#writeTask"); //is this how you select the input type? 


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
            // update local STATE with fetched todos
            state.todos = responseData;
            // render each todo
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

        //ADD a completed button after the li
        if (!todo.completed) {
            const completedButton = document.createElement("button")
            completedButton.setAttribute("class", "completed-button")
            completedButton.innerText = "completed"
            li.append(completedButton)

            completedButton.addEventListener("click", (event) => {
                toggleCompleted()
            })
        }

        // append things
        toDoUL.append(li);

        //CSS
        if (todo.completed) {
            li.setAttribute("class", "completed")
        }

    });
}

function toggleCompleted() {
    // we have now created a completed button, let's update the 
    //completed status
   const todo = state.todos //struggling with this
        const todoID = todo.id; //:):):):):):) smth;
        const newState = {
            completed: true 
        };
  
    //When the user clicks it, make a PATCH request with 
    const updateState = {
        method: "PATCH",
        body: JSON.stringify(newState), //only want to stringify the key, not the boolean
        headers: {
            "Content-Type": "application/json",
        },
    };
    // send the next fetch request //(replacing [todoid] with the actual ID (todoID) of the todo):
    fetch(`http://localhost:3000/todos/todoID`, updateState)
        .then((res) => res.json())
        .then((updatedToDoData) => {
            console.log("We have updated task to complete= true:", state.todos);
        });
}


addButton.addEventListener("click", (event) => {
    console.log("clicked Add button!")
    event.preventDefault();
    console.log("wanna call a function", addNewToDo())
})

function addNewToDo() {
    //Let input submitted = new JS object
    const newTitle = taskToAdd.value;
    //Convert js object to a JSON string
    const newToDo = {
        title: newTitle, //input,
        completed: false,
    };
    console.log("newToDo", newToDo)
    const newToDoAsJSONString = JSON.stringify(newToDo)

    const options = {
        method: "POST",
        body: newToDoAsJSONString, // what data we want to send to server: the JSON version of newToDo
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("http://localhost:3000/todos", options)
        .then((res) => {
            return res.json(); // if after delete there is any resposne, convert to JSON
        })
        .then((todo) => {
            console.log("Created new todo item=", todo);
            getAllToDos()
        });
}

//****************RENDER THE TODO LIST ON THE PAGE*********************************** */
getAllToDos()
