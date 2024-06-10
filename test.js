completeBox.addEventListener("click", async () => {
        let URL = "https://boolean-uk-api-server.fly.dev/zainabch123/todo/" + [toDo.id];
        console.log("URL", URL);
         await fetch(
          URL,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               //title: todo.title,
               completed: true,
             }),

const form = document.querySelector("form");
const toDoInput = document.querySelector("input").value;
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(toDoInput);
  newTodDo();
});

async function newTodDo() {
  const response = await fetch(
    "https://boolean-uk-api-server.fly.dev/zainabch123/todo",
    {
      method: "POST",
      body: JSON.stringify({
        title: toDoInput.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const post = await response.json();
  console.log("updated list", post);
}
