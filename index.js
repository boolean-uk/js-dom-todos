const state = {
  todo:[]
}

const root = 'http://localhost:3000/todos'
const todoList = document.querySelector('#todo-list')
const todoForm = document.querySelector('#todo-form')

const renderTodo = () => {
 
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }


  state.todo.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.title;

    if (todo.completed) {
      todoItem.style.textDecoration = 'line-through';
      todoItem.style.color = 'grey';
    }

    todoList.appendChild(todoItem);
  });
};




const getTodoListAndRender = () => {
  fetch(`${root}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("read todos:", data);
      state.todo = data;
      renderTodo();
    })
    .catch(error => console.error('Error fetching Todos:', error));
};

const createTodoRequest = (event) => {
  const data = {
    title: event.target.value
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title:todoText, completed:false})
  }

  fetch('${root}', options)
  .then ((response) => response.json())
  .then((data)=> {
    console.log('todo created', data);
    getTodoListAndRender();
  })
}

document.getElementById('todo-text').value = '';

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createTodoRequest(event);
});

getTodoListAndRender();

