const root = 'http://localhost:3000';
const newTodosList = document.querySelector('#todo-list');
const addNewTodos = document.querySelector('form');

const state = {
    todos: [],
};

function listAllTodos() {
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
     },
};

fetch(`${root}/todos`, options)
  .then(response => response.json())
  .then(jsonData => {console.log(jsonData);
    state.todos = jsonData;
    renderTodos();
  });
}

function renderTodos() {
    newTodosList.innerHTML = '';
    state.todos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
            li.innerHTML = todo.title;
            newTodosList.appendChild(li);
        } else {
            li.innerHTML = todo.title;
            newTodosList.appendChild(li);
        }
    });
}

addNewTodos.addEventListener('submit', (element) => {
    element.preventDefault();
    const data ={
        title: element.target.title.value,
        completed: false,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(`${root}/todos`, options)
    .then(response => response.json())
    .then(jsonData => {state.todos.push(jsonData)})
    element.target[0].value = '';
    listAllTodos();
});
        
listAllTodos();



