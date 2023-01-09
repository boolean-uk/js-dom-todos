//select the state
const state = {
    tasks: []

}

//select exicting Element
const todolistUL=document.querySelector('#todo-list')
const newTodoForm=document.querySelector('form')
const newTodoListTask= document.querySelector('title')

//Network 
function getTodoList(){
    fetch("http://localhost:3000/todos") // send a Request
    .then((response) => {
      // response = the Response from the server
      return response.json();
    })
    .then((responseData) => {
      // responseData = response.json()
      // we have received all task
      console.log("Received people", responseData);
      // update local STATE with fetched task
      state.tasks = responseData;
      // render each task
      renderTodoList();
    });

}
function createTodo(){
    const newTodo = {
        "title": newTodoListTask,
      };
      const newTodoTaskAsJSONString = JSON.stringify(newTodo);
      
      const options = {
        method: "POST",
        body: newTodoTaskAsJSONString, // what data we want to send to server: the JSON version of newPerson
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      fetch("http://localhost:3000/todos", options)
        .then((res) => {
          return res.json(); // if after delete there is any resposne, convert to JSON
        })
        .then((toDo) => {
          // usually data might just be empty
          console.log("Created new person=", toDo);
          console.log("TODO: actually add ToDO locally (update state + change UI)");
        });
}



//Render the data

function renderTodoList(){
    todolistUL.innerHTML=""  
    state.tasks.forEach ((task) => { 
        const listItem= document.createElement('li')
        listItem.innerText=`${task.title}`
        todolistUL.append(listItem)
    } )
   
}


getTodoList()
createTodo()