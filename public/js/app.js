function addTodo(data) {
  $("#todo").innerHTML += `
    <li>
        <input type="checkbox"  class="rounded text-indigo-500" id="todo-${data.id}" />
        <label for="todo-${data.id}">${data.title}</label>
    </li>
`;
setTimeout(() => {
  $(`#todo-${data.id}`).on("change", function (e) {
    fetch(`http://localhost:3000/todos/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: e.target.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.completed) {
          $(`label[for="todo-${data.id}"]`).addClass("line-through");
          $(`label[for="todo-${data.id}"]`).addClass("text-gray-500");
        } else {
          $(`label[for="todo-${data.id}"]`).removeClass("line-through");
          $(`label[for="todo-${data.id}"]`).removeClass("text-gray-500");
        }
      });
  });
}, 100);
}

$("#data").on("submit", function (e) {
  e.preventDefault();
  fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
      title: $("#text").val(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      $("#text").val("");
      addTodo(data);
    })
    .catch((err) => console.log(err));
});

window.addEventListener("load", function () {
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => {
        addTodo(todo);
      });
    })
    .catch((err) => console.log(err));
});
