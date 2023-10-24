const state = {
    todos: []
}
const root = 'http://localhost:3000/todos';
const todoList = document.querySelector('#todo-list')
const form = document.querySelector('form')

const renderTodos = () => {
    fetch('root')
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        state.todos = data
        
    })
}
const takeOfftodos = () => {
    todoList.innerHTML = ''
    state.todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.setAttribute = todo.title
        todoList.append(listItem)
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Get the title from the form 
    const titleInput = form.querySelector('input[name="title"]');
    const title = titleInput.value.trim();
  
    if (title) {
      
      // POST request to create a new todo
      fetch(root, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ title, completed: false }), 
      })
        .then((response) => response.json())
        .then(() => {
          renderTodos();
          titleInput.value = '';
        })
        .catch((error) => console.error('Error adding todo:', error));
    }
  });
  
  document.addEventListener('DOMContentLoaded', renderTodos);
takeOfftodos ()
renderTodos
 

