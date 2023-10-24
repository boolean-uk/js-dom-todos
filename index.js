const state = {
    todos : [

    ]
};

//top variable to work 

//main source
const root = 'http://localhost:3000'

//fot the ul 
const ul = document.querySelector('#todo-list')

//for the posting of the data 
const form = document.querySelector('form')

//main function to call at last 
function main(){
    renderToDo();
}

//to remove everything inside the ul
function remove(){
    ul.innerHTML = '';
}
//rendertodo function to fetch the data from the database
function renderToDo(){
    fetch(`${root}/todos`)
        .then((response)=>response.json())
        .then((data)=>{
            state.todos = data;
            remove()
            renderList();
        })
}


//function to render the data inside the ul
function renderList (){
    state.todos.forEach((toDo)=>{
        const li = document.createElement('li')

            //to make the true and false value 
            if(toDo.completed){
                li.innerText = toDo.title
            }else{
                li.setAttribute('class','completed')
                li.innerText = toDo.title
            }
            
        ul.append(li);
    })
}

form.addEventListener('submit',(event)=>{
    // event.preventDefault();
    //this is the data I want to post indie the database
    const data = {
        title : event.target[0].value,
        completed : true
    }
    //option  to post 
    const options = {
        method: 'POST',
        headers : {'content-type':'application/json'},
        body : JSON.stringify(data)
    }
    //now using post method to post
    fetch(`${root}/todos`,options)
        .then((response)=>response.json())
        .then((data)=>renderList(event))
})
main();