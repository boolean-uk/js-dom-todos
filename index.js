const root = 'http://localhost:3000';
const newTodosList = document.querySelector('#todo-list');
const addNewTodos = document.querySelector('input');

function listAllTodos() {
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
     },
};

fetch(`${root}/todos`, options)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
            li.innerText = todo.title;
            newTodosList.appendChild(li);
        } else {
            li.innerText = todo.title;
            newTodosList.appendChild(li);
        }});
});
};
listAllTodos();
