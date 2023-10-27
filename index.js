const root = 'http://localhost:3000/todos';
const todoList = document.querySelector('#todo-list');
const todoForm = document.querySelector('form');

const renderTodo = (todos) => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.title;
    if (todo.completed) {
      todoItem.style.textDecoration = 'line-through';
      todoItem.style.color = 'grey';
    }
    todoList.appendChild(todoItem);
  });
};

const getTodos = () => {
  fetch(root)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Todos:', data);
      renderTodo(data);
    })
    .catch(error => console.error('Error fetching Todos:', error));
};

const createTodo = (title) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, completed: false })
  };

  fetch(root, options)
    .then(response => response.json())
    .then(data => {
      console.log('Todo created:', data);
      getTodos(); 
    })
    .catch(error => console.error('Error creating Todo:', error));
};

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoTitle = event.target.title.value;
  createTodo(todoTitle);
  event.target.title.value = ''; 
});

getTodos();
