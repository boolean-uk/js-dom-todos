//select the state
const state = {
    tasks: []

}

//select exicting Element
const todolistUL=document.querySelector('#todo-list')
const newTodoForm=document.querySelector('form')
const newTodoListAddButton= document.querySelector('form')
const inputValue = document.querySelector('input')
console.log(inputValue)
console.log(inputValue.innerText)

newTodoListAddButton.addEventListener('submit', function(event){
  event.preventDefault()
  createTodo()
})

//Network 

// READ
function getTodoList(){
    fetch("http://localhost:3000/todos") // send a Request
    .then((response) => {
      // response = the Response from the server
      return response.json();
    })
    .then((responseData) => {
      // we have received all task
      // console.log("Received people", responseData);
      // update local STATE with fetched task
      state.tasks = responseData;
      // render each task
      renderTodoList();
    });
}

//Create
function createTodo(){
  // Send this object to server
  console.log(inputValue.value)
    const newTodo = {
        title: inputValue.value
      };
      newTodoListAddButton.reset()
      console.log(newTodo)
  //Convert to string with following options to be read by fetch
      const newTodoTaskAsJSONString = JSON.stringify(newTodo);
      const options = {
        method: "POST",
        body: newTodoTaskAsJSONString, // what data we want to send to server: the JSON version of newPerson
        headers: {
          "Content-Type": "application/json"
        }
      };
  // Convert data to JSON 
      fetch("http://localhost:3000/todos", options) //send request
        
        .then(getTodoList())  
        
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