// Get Input  value
const titleInput = document.querySelector('label input[name="title"]').value;
// Get the submit input element
const submitButton = document.querySelector('input[type="submit"][value="Add"]');

const todoUl = document.querySelector("#todo-list");
const todoLi = document.querySelector("li");



// Add an event listener to the submit button
submitButton.addEventListener("click", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Your custom logic here
  console.log("Submit button clicked!");
  console.log("Title:", titleInput.value);
});


async function getposts() {
  // fetch rturns a promise
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/akonde/todo"
  );
  //   console.log("RESPONSE:", response);
  const todo = await response.json();
  console.log(todo, 'todotitle');
}
getposts();

todoLi.textContent = todo;

// POST CREATE
async function createPost() {
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/akonde/todo",
    {
      method: "POST",
      body: JSON.stringify({
        title: "Clean my room",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const post = await response.json();
  console.log(post);
}
createPost();
