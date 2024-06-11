document.addEventListener('DOMContentLoaded', init);

const API_URL = 'https://boolean-uk-api-server.fly.dev/chuks200/todo';

async function init() {
    await getTodos();
    document.querySelector('form').addEventListener('submit', addTodo);
}

async function getTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        alert('Failed to fetch todos. Please try again later.');
    }
}

function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add('completed');
        } else {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => completeTodo(todo.id));
            li.appendChild(completeButton);
        }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

async function addTodo(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title, completed: false })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newTodo = await response.json();
        await getTodos(); // Refresh the list
        event.target.reset();
    } catch (error) {
        console.error('Failed to add todo:', error);
        alert('Failed to add todo. Please try again later.');
    }
}

async function completeTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-cype': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await getTodos(); 
    } catch (error) {
        console.error('Failed to complete todo:', error);
        alert('Failed to complete todo. Please try again later.');
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await getTodos(); 
    } catch (error) {
        console.error('Failed to delete todo:', error);
        alert('Failed to delete todo. Please try again later.');
    }
}
