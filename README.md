# Todo List
We're going to put to good use our knowledge of `fetch` by creating a full application in the browser! To achieve this, you'll have to set up all the interactions with the server.

![Result](result.png)

## Learning Objectives
- Explain that `fetch` is an API for making HTTP requests
- Use `fetch` to make an asynchronous HTTP request and use the response data to update the DOM
- Implement a JavaScript application that interacts with a server

## Instructions
- Write your code in the `index.js` file
- [Use this API documentation for your data](https://boolean-uk-api-server.fly.dev/api-docs/#/todo)
    - The API url follows this format: `https://boolean-uk-api-server.fly.dev/GITHUB_USERNAME/todo`
    - **Replace `GITHUB_USERNAME` with your actual github username**
    - Example: `https://boolean-uk-api-server.fly.dev/vherus/todo`
- Make a `GET` request with `fetch` to `https://boolean-uk-api-server.fly.dev/GITHUB_USERNAME/todo` to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.
    - **NOTE: REPLACE `GITHUB_USERNAME` WITH YOUR ACTUAL GITHUB USERNAME**
- When the form is submitted, make `POST` request with `fetch` to `https://boolean-uk-api-server.fly.dev/GITHUB_USERNAME/todo` to create a new Todo. Update the list of Todos without reloading the page.
    - **NOTE: REPLACE `GITHUB_USERNAME` WITH YOUR ACTUAL GITHUB USERNAME**

## Extended
- Add a "Complete" button to each uncompleted Todo. When the user clicks it, make a `PATCH` request with `fetch` to `https://boolean-uk-api-server.fly.dev/GITHUB_USERNAME/todo/TODO_ID` to update the todo as completed. Update the list of Todos without reloading the page.
    - **NOTE: REPLACE `GITHUB_USERNAME` WITH YOUR ACTUAL GITHUB USERNAME**
    - **Replace `TODO_ID` with the actual ID of the `todo`**

- Add a "Delete" button to each Todo. When the user clicks it, make a `DELETE` request with `fetch` to `https://boolean-uk-api-server.fly.dev/GITHUB_USERNAME/todo/TODO_ID` to remove the todo. Update the list of Todos without reloading the page.
    - **NOTE: REPLACE `GITHUB_USERNAME` WITH YOUR ACTUAL GITHUB USERNAME**
    - **Replace `TODO_ID` with the actual ID of the `todo`**

- Add error handling to the app. The user should have a notification if something goes wrong

**Tips**
- Make some requests to the API server and inspect the response, so you can check the data structure before start coding. You could use an app like [Insomnia](https://insomnia.rest/) to make this easier 
- Focus first on rendering the data onto your page
- Try to use function scopes to your advantage
