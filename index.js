const state = {
  todo:[]
}

const root = 'http://localhost:3000/todos'
const todoList = document.querySelector('#todo-list')
const todoForm = document.querySelector('#todo-form')

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

