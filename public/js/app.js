function addTodo(data) {
  $("#todo").innerHTML += `
    <li>
        <input type="checkbox"  class="rounded text-indigo-500" id="todo-${data.id}" />
        <label for="todo-${data.id}">${data.title}</label>
        <span id="delete-${data.id}" class="text-red-600 p-2 w-6 h-6">x</span>
    </li>
`;
setTimeout(() => {

  $(`#todo-${data.id}`).on("change", function (e) {
    console.log(e.target.checked)
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
        if (data.completed) {
          $(`label[for="todo-${data.id}"]`).addClass("line-through");
          $(`label[for="todo-${data.id}"]`).addClass("text-gray-500");
        } else {
          $(`label[for="todo-${data.id}"]`).removeClass("line-through");
          $(`label[for="todo-${data.id}"]`).removeClass("text-gray-500");
        }
      });
  });

  $(`#delete-${data.id}`).on("click", function (e) {
    fetch(`http://localhost:3000/todos/${data.id}`, {
      method: "DELETE",
      body: JSON.stringify({
        completed: e.target.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
       if(data) {
         const node = e.target.parentNode;
        node.parentNode.removeChild(node)
       } 
      });
  });
}, 300);
}

$("#data").on("submit", function (e) {
  e.preventDefault();
  if($("#text").val() === "") return;
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
      $("#text").val("")
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
