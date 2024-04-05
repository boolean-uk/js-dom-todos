// index.js

// Replace 'GITHUB_USERNAME' with your actual GitHub username
const API_URL = 'https://boolean-api-server.fly.dev/GITHUB_USERNAME/todo';

const todoList = document.getElementById('todo-list');
const todoForm = document.querySelector('form');

// Function to render the list of Todos
function renderTodos(todos) {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;

    if (todo.completed) {
      li.classList.add('completed');
    }

    todoList.appendChild(li);
  });
}

// Function to fetch all Todos from the server
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Function to create a new Todo on the server
async function createTodo(title) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      fetchTodos();
    }
  } catch (error) {
    console.error('Error creating todo:', error);
  }
}

// Event listener for form submission
todoForm.addEventListener('submit', event => {
  event.preventDefault();

  const titleInput = event.target.elements.title;
  const title = titleInput.value.trim();

  if (title !== '') {
    createTodo(title);
    titleInput.value = '';
  }
});

// Fetch all Todos when the page loads
fetchTodos();