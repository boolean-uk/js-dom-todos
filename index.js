//Build list item
const buildLi = (item) => {
  const li = document.createElement("li");
  li.innerText = item.title;
  if (item.completed) {
    li.style.textDecoration = "line-through";
    li.style.color = "grey";
  }

  const completeButton = document.createElement("button");
  completeButton.setAttribute("id", "complete-button");
  completeButton.innerText = "Complete";
  completeButton.addEventListener("click", () => {
    completeItem(item);
  });
  li.append(completeButton);

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "delete-button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteItem(item.id);
  });
  li.append(deleteButton);

  return li;
};

//Render todo list
const getToDos = async () => {
  const rawData = await fetch(
    "https://boolean-api-server.fly.dev/MrStashy/todo"
  );
  const data = await rawData.json();

  const toDoList = document.querySelector("#todo-list");
  toDoList.innerHTML = "";

  data.forEach((el) => {
    const li = buildLi(el);
    toDoList.append(li);
  });
};

//Add event listener to form
const addForm = document.querySelector("form");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newToDo = document.querySelector('input[name="title"]');
  postItem(newToDo.value);
});

//Post Item
const postItem = async (newToDo) => {
  const url = "https://boolean-api-server.fly.dev/MrStashy/todo";
  const options = {
    method: "POST",
    body: JSON.stringify({
      title: newToDo,
      completed: false,
    }),
    headers: {
      "content-type": "application/json",
    },
  };

  const result = await fetch(url, options);
  console.log(result);
  if (result.status >= 400) {
    const jsonResult = await result.json();
    reportError(jsonResult.error);
  }
  getToDos();
};

//Delete Item
const deleteItem = async (item) => {
  const url = `https://boolean-api-server.fly.dev/MrStashy/todo/${item}`;
  await fetch(url, { method: "DELETE" });
  getToDos();
};

//Complete Item
const completeItem = async (item) => {
  const url = `https://boolean-api-server.fly.dev/MrStashy/todo/${item.id}`;
  const options = {
    method: "PUT",
    body: JSON.stringify({
      title: item.title,
      completed: true,
    }),
    headers: {
      "content-type": "application/json",
    },
  };
  await fetch(url, options);
  getToDos();
};

//Report error
const reportError = (errorText) => {
  const errorP = document.querySelector("#error-report");
  const trimmedText = errorText
    .toString()
    .split("")
    .splice(
      errorText.toString().split("").indexOf(" ") + 1,
      errorText.toString().split("").length
    )
    .join("");
  
  errorP.innerText = trimmedText;

  setTimeout(() => {
    errorP.innerText = "";
  }, 3000);
};

getToDos();
