# Todo List

We're going to put to good use our knowledge of `fetch` by creating a full application in the browser! To achieve this, you'll have to set up all the interactions with the server.

![Result](result.png)

## Learning Objectives

- Explain that `fetch` is an API for making HTTP requests
- Use `fetch` to make an asynchronous HTTP request and use the response data to update the DOM
- Implement a JavaScript application that interacts with a server

## Setup

- Fork and clone
- `npm install`
- Run json-server with `npx json-server --watch db/todos.json`
- Visit `http://localhost:3000/todos` in your browser to verify the server is running

## Instructions

- Make a `GET` request with `fetch` to `http://localhost:3000/todos` to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.
- When the form is submitted, make `POST` request with `fetch` to `http://localhost:3000/todos` to create a new Todo. Update the list of Todos without reloading the page.

## Extended

- Add a "Complete" button to each uncompleted Todo. When the user clicks it, make a `PATCH` request with `fetch` to `http://localhost:3000/todos/[todoid]` (replacing `todoid` with the actual ID of the `todo`) to update the todo as completed. Update the list of Todos without reloading the page.

- Add a "Delete" button to each Todo. When the user clicks it, make a `DELETE` request with `fetch` to `http://localhost:3000/todos/[todoid]` (replacing `todoid` with the actual ID of the `todo`) to remove the todo. Update the list of Todos without reloading the page.

- Add error handling to the app. The user should have a notification if something goes wrong

**Tips**

- Make some requests to your server and inspect the response, so you can check the data structure before start coding
- Focus first on rendering the data onto your page
- Try to use function scopes to your advantage
