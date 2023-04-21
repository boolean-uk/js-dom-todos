const ul = document.querySelector("#todo-list");
const addInput = document.querySelector("input");
const state = {
  toDos: [],
};
//network code
function getAllToDos() {
  fetch("http://localhost:3000/todos")
    .then(function (response) {
      /* console.log("response returned..", response); */
      return response.json();
    })
    .then(function (data) {
      /* console.log("Todo data:", data); */
      state.toDos = data; // store my fetched todos into my state object
      renderAllToDos(); // re render the page!
    });
  /* console.log("End of getAllToDos()"); */
}

function renderAllToDos() {
  ul.innerHTML = ""; // clear all contacts
  state.toDos.forEach((toDos) => {
    const li = document.createElement("li");
    li.innerText = `${toDos.id} - ${toDos.title}`;
    /* console.log("working1"); */
    // completed tasks turn grey

    if (toDos.completed === true) {
      li.setAttribute("class", "completed");
      /* console.log("working2"); */
    } else {
      const completeButton = document.createElement("button");
      completeButton.innerText = "Complete";
      li.append(completeButton);
      completeButton.addEventListener("click", () => {
        li.setAttribute("class", "completed");
        completeButton.remove();
        completedToDo(toDos);
      });
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    li.append(deleteButton);
    deleteButton.addEventListener("click", () => {
      deleteToDos(toDos);
    });

    ul.append(li);
  });
}

function completedToDo(toDos) {
  const completedToDo = {
    completed: true,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completedToDo),
  };

  fetch(`http://localhost:3000/todos/${toDos.id}`, options)
    .then(function (response) {
      console.log("response returned..", response);
      return response.json();
    })
    .then(function (data) {
      console.log("ToDo data:", data);

      // first find the exact todo in our list
      // then update that contact with data
      // const existingContact = state.contacts.find((item) => item.id === data.id)
      // if(existingContact) {
      //   existingContact.name = data.name
      // }

      state.toDos = state.toDos.map((existingToDos) => {
        if (existingToDos.id === data.id) {
          return data;
        } else {
          return existingToDos;
        }
      });
    });
}

function createNewToDos(newToDo) {
  // POST /contacts
  // method: post
  // body: the data I want to send
  // headers: Content-Type

  const newToDo1 = {
    title: newToDo,
    completed: false,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToDo1),
  };

  fetch("http://localhost:3000/todos", options)
    .then(function (response) {
      console.log("response returned..", response);
      return response.json();
    })
    .then(function (data) {
      console.log("ToDo data:", data);
      state.toDos.push(data); // store my newly created contact into my state object
      renderAllToDos(); // re render the page!
    });
}

function deleteToDos(toDos) {
  // POST /contacts
  // method: post
  // body: the data I want to send
  // headers: Content-Type

  /*    const newToDo1 = {
    title: newToDo,
    completed: false,
  }; */

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDos),
  };

  fetch(`http://localhost:3000/todos/${toDos.id}`, options)
    .then(function (response) {
      console.log("delete response returned..", response);
      return response.json();
    })
    .then(function (data) {
      console.log("ToDo data:", data);
      const index = Array.prototype.indexOf(data);
      state.toDos.splice(index, 1); // store my newly created contact into my state object
      renderAllToDos(); // re render the page!
    });
}

// EVENT HANDLES
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newToTask = addInput.value;
  createNewToDos(newToTask);

  form.reset();
});

getAllToDos();
renderAllToDos();
