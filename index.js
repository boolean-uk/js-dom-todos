//select the state
const state = {
    tasks: []

}

//select exicting Element
const todolistUL=document.querySelector('#todo-list')

const newTodoListForm= document.querySelector('form')
const inputValue = document.querySelector('input')
console.log(inputValue)
console.log(inputValue.innerText)

newTodoListForm.addEventListener('submit', function(event){
  // event.preventDefault()
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
      newTodoListForm.reset()
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


function updatetodo(todos){
  const todoId = todos.id;
    const updatetodoData = {
      completed: true ,
    };

    const updateOptions = {
      method: "PATCH",
      body: JSON.stringify(updatetodoData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // send the next fetch request
    fetch(`http://localhost:3000/todos/${todoId}`, updateOptions)
      .then((res) => res.json())
      .then((updatetodoData) => {
        console.log("We have updated person to =", updatetodoData);
        getTodoList()
      });
}
//Render the data
function renderTodoList(){
    todolistUL.innerHTML=""  
    state.tasks.forEach ((task) => { 
        const listItem= document.createElement('li')
        const completButton= document.createElement('button')
             completButton.innerText="click"
            listItem.append(completButton)
        listItem.append(`${task.title}`)
        todolistUL.append(listItem)
        if (task.completed){
          listItem.className="completed"

        }
        completButton.addEventListener('click',function (){
          updatetodo(task)
        })

    } )
   
}


getTodoList()