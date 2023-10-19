const root = 'http://localhost:3000'
const todoList = document.querySelector('#todo-list')
const todoForm = document.querySelector('#add-form')

const state = {
    todos: []
}

const getTodos = () => {
    fetch(`${root}/todos`)
        .then((response) => response.json())
        .then((data) => {
            state.todos = data;
            renderTodos();
        })
}

const renderTodos = () => {
    todoList.innerHTML = '';
    state.todos.forEach(item => {
        const todo = document.createElement('li');
        todo.innerText = item.title;
        
        todoList.append(todo);
    })
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event)
    const data = {
        title: event,
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    fetch(`${root}/todos`, options)
        .then((response) => response.json)
        .then(() => {
            state.todos = data;
            getTodos();
        });
})



getTodos()

