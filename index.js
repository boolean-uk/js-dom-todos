// http CRUD METHODS:
// Create-POST
// READ - GET
// UPDATE- PATCH/PUT
//DELETE-DELETE

const root = 'http://localhost:3000'
const newTodo = document.querySelector('#new-Todo');
const todoContainer = document.querySelector('#todo-list');
const state = {
    todos:[]
}
newTodo.addEventListener('submit', (event)=> {
    event.preventDefault();
    //to check if it works
    console.log(event.target);
    console.log(event.target[0]);
    console.log(event.target[1]);
    //Get data from the form .This is a POJO-plain old javascript object. A javascript object
    const data = {
        title:event.target[0].value,
    }
    //to indicate what we want to do .the crud method we want to use
    const options = {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        //these are all important .body needs to be a json format of data
        //Json.stringifyis used to make our data javascript object  a json object
        body:JSON.stringify(data)

    }
    //Get request. Fetch is used to get data from an api
    // we put two elements in fetch. d http and the method.
    fetch(`${root}/todos`, options)
    .then((Response)=>Response.json())
    .then((data)=>{
        console.log(data);
        getDataandRender();

    })
})
const removeCurrentData = () => {
    const todoContainerChildren = todoContainer.querySelectorAll('*');
    todoContainerChildren.forEach(child =>child.remove());
}
const renderList = () => {
    removeCurrentData();
    state.todos.forEach((list) => {
        //creating all elements needed
        const title= document.createElement("li");
        title.innerText = list.title;
        if(list.completed){
            title.classList.add('completed');
        } 
        else{
            title.classList.remove('completed');
        }
        
        
        
        //to append the title to the list. After this we need to append to the container to get it to display
        //to append the list in the container
        
        todoContainer.append(title);
    })

}
const getDataandRender =() => {
    fetch(`${root}/todos`)
  .then((Response)=>Response.json()) //promise asynchronous
  .then((data)=> {
    state.todos = data;
    renderList();
   });
}
getDataandRender();
   
