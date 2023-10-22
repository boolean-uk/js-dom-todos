const state = {
  todos: []
};

const todoList = document.querySelector('#todo-list');
const form = document.querySelector('#todo-form');

function fetchTodos() {
  fetch('http://localhost:3000/todos')
    .then(response => response.json())
    .then(data => {
      state.todos = data;
      renderTodoList();
    })
    .catch(error => console.error('Error fetching Todos:', error));
}

function renderTodoList() {
  todoList.innerHTML = '';
  state.todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.title;
    todoList.appendChild(listItem);
  });
}

async function addTodo(newTitle) {
  const newAddition = {
    title: newTitle,
    completed: false
  };

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAddition)
  };

  try {
    const response = await fetch('http://localhost:3000/todos', postOptions);
    if (response.ok) {
      const data = await response.json();
      state.todos.push(data);
      renderTodoList();
    } else {
      console.error('Failed to add a new Todo');
    }
  } catch (error) {
    console.error('Error adding a new Todo:', error);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const input = form.querySelector('#title');
  const newTodo = input.value.trim();
  if (newTodo !== '') {
    await addTodo(newTodo);
    form.reset();
  }
});

fetchTodos();
