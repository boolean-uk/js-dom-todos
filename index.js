// Get Input value
const titleInput = document.querySelector('label input[name="title"]');
// Get the submit input element
const submitButton = document.querySelector('input[type="submit"][value="Add"]');

const todoUl = document.querySelector("#todo-list");

// Add an event listener to the submit button
submitButton.addEventListener("click", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Log the value of the title input
  console.log("Submit button clicked!");
  console.log("Title:", titleInput.value);

  // Call the function to create a new post
  createPost(titleInput.value);
});

// Function to fetch and display posts
async function getPosts() {
  try {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/akonde/todo`);
    const todos = await response.json();
    console.log(todos, 'todotitle');

    // Clear the current todo list
    todoUl.innerHTML = '';

    // Populate the todo list with fetched todos using a for loop
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      const todoLi = document.createElement('li');
      todoLi.textContent = todo.title;
      todoUl.appendChild(todoLi);
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching todos. Please try again later.');
  }
}
getPosts();

// Function to create a new post
async function createPost(title) {
  try {
    const response = await fetch(
      `https://boolean-uk-api-server.fly.dev/akonde/todo`,
      {
        method: "POST",
        body: JSON.stringify({ title: title }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    );
  
    const post = await response.json();
    console.log(post);

    // Fetch and update the todo list after creating a new post
    getPosts();
  } catch (error) {
    console.error(error);
    alert('Error creating todo. Please try again later.');
  }
}

// Function to complete a todo
async function completeTodo(todoId) {
  try {
    const response = await fetch(
      `https://boolean-uk-api-server.fly.dev/akonde/todo/${todoId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ completed: true }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    );

    const updatedTodo = await response.json();
    console.log(updatedTodo);

    // Fetch and update the todo list after completing a todo
    getPosts();
  } catch (error) {
    console.error(error);
    alert('Error completing todo. Please try again later.');
  }
}
