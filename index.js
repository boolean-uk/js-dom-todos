async function renderToDoList() {
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/zainabch123/todo"
  );
  const toDodata = await response.json();
  console.log("toDodata:", toDodata);

  const toDoUl = document.querySelector("#todo-list");
  toDoUl.innerHTML = " ";

  toDodata.forEach((todo) => {
    const todoLi = document.createElement("li");
    todoLi.innerHTML = todo.title;
    toDoUl.append(todoLi);

    const completeBox = document.createElement("input");
    completeBox.type = "checkbox";
    todoLi.append(completeBox);
    if (todo.completed) {
      todoLi.classList.add("completed");
      completeBox.checked = true;
      console.log(toDoUl);
    } else {
      todoLi.classList.remove("completed");
      completeBox.checked = false;
    }
  });
  console.log(toDoUl);
}

const form = document.querySelector("form");
form.addEventListener("submit", newToDo);

async function newToDo(event) {
  const toDoInput = document.querySelector("input");
  event.preventDefault();
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/zainabch123/todo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: toDoInput.value,
      }),
    }
  );
  const updatedList = await response.json();
  console.log("updated list", updatedList);
  renderToDoList();
}

renderToDoList();
