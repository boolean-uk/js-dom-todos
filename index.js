//STATE
// my local version of the data in the browser tab!
const state = {
 todos: [],   
};

//SELECT EXISTING HTML ELEMENT
const TodosUl = document.querySelector("#todo-list")
const addButton = document.querySelector("form")


    addButton.addEventListener('submit', (event) => {
        
    console.log(addButton)
    const newTodo = {
        title: event.target.title.value,
    };
    const newTodoAsJSONString = JSON.stringify(newTodo);
    const options ={
        method: "POST",
        body:newTodoAsJSONString,
        headers: {
            "Content-Type": "application/json",
        },
    }

    fetch("http://localhost:3000/todos", options)
    .then((response) => {
        return response.json();
    })
    .then((todo) => {
        console.log("created new todo", todo)
    });
    })

 






//NETWORKING
function getAllTodosList () {
    //send as GET request to receive all todos list
    fetch("http://localhost:3000/todos") // send a request
    .then((response) => {
        //response= the response from the server
        return response.json();
    })
    .then((responseList) => {
        //responseList = response.json()

        //we have received all list
        console.log("received list", responseList);
        //update local STATE with fetched list
        state.todos = responseList;
        //render each list
        renderList();
    })
}


//RENDERING
function renderList () {
    //clear my list before re-rendering
    TodosUl.innerHTML = "";

    state.todos.forEach((todo) => {
      //convert list JS object to a <li>
      const li = document.createElement("li");
      li.innerText= `${todo.title}`;

      if(todo.completed) {
        li.setAttribute('class', 'completed')
      }
      TodosUl.append(li);
      
      
    });
    
}
getAllTodosList()


