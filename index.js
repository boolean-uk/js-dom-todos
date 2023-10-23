const state = {
    todos: []
}

const root = 'http://localhost:3000';
const todoUlList = document.querySelector('ul');
const addToDoForm = document.querySelector('form')

//GET request
const jobsAndRender = () => {
    fetch(`${root}/todos`)
        .then((response) => response.json())
        .then((data) => {
            console.log("read all jobs:", data);
            state.todos = data;
            removeJobs();
            formFunction();
        });
}

const removeJobs = () => {
    const ulChildren = todoUlList.querySelectorAll('*');
    ulChildren.forEach(child => child.remove());
  }

const formFunction = () => {
    state.todos.forEach((todos) => {
        const todoLi = document.createElement('li');
        todoLi.innerText = todos.title;
        todoUlList.append(todoLi)
        console.log(todoLi)
        if (todos.completed === true) {
        todoLi.setAttribute('class', 'completed')
    }
    })
}

const createJobs = (event) => {
    const data = {
        title: event.target[0].value,
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      fetch(`${root}/todos`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('created list', data);
        jobsAndRender();
      })
    }

addToDoForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    createJobs(event)
 })


jobsAndRender();