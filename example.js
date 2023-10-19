const state = {
    dogs: []
  }
  
  const root = 'http://localhost:3000';
  const newDogForm = document.querySelector('#new-dog');
  const dogsContainer = document.querySelector('#dogs');
  
  /*
  --------------------------------------------
  | 1 - FUNCTIONS TO HANDLE MY CRUD REQUESTS |
  --------------------------------------------
  */
  
  // Read method - GET
  const getDogsAndRender = () => {
    // The route for this request is: localhost:3000/dogs
    fetch(`${root}/dogs`)
      .then((response) => response.json())
      .then((data) => {
        console.log("read all dogs:", data);
        state.dogs = data;
        removeCurrentDogs();
        renderDogs();
      });
  
    // fetch -> returns a promise
    // When that promise resolves, we get back something in the
    // format of a "Response" interface (i.e. class)
    // We want to get just the JSON data from this "Response"
    // from fetch, and so we can use the Response `.json()` method
    // to read, decode, and convert the JSON to a POJO
  }
  
  
  // Create method - POST
  const createDogRequest = (event) => {
    // Get data from the form:
    // This is a normal JavaScript objec AKA: "POJO" = Plain Old JavaScript Object
    const data = {
      name: event.target[0].value,
      breed: event.target[1].value,
      isGood: event.target[2].checked,
    }
  
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body needs to be a JSON format of data
      body: JSON.stringify(data)
    }
  
    // http://localhost:3000/dogs
    fetch(`${root}/dogs`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('created dog', data);
        // After the request succeeds, I get the latest data from the DB
        // and update the page
        getDogsAndRender();
      })
  }
  
  // Edit method - PATCH
  const editDogIsGoodRequest = (id, isGood) => {
    const data = {
      isGood: !isGood,
    }
  
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      // body needs to be a JSON format of data
      body: JSON.stringify(data)
    }
  
    console.log(data)
    // e.g. localhost:3000/dogs/1
    fetch(`${root}/dogs/${id}`, options)
      .then((response) => response.json())
      .then(() => {
        console.log('edited dog', data)
        // After the request succeeds, I get the latest data from the DB
        // and update the page
        getDogsAndRender();
      });
  }
  
  // Delete method - DELETE
  const deleteDogRequest = (id) => {
    const options = {
      method: 'DELETE'
    }
  
    fetch(`${root}/dogs/${id}`, options)
      .then(response => response.json())
      .then((data) => {
        console.log("deleted dog:", data);
        // After the request succeeds, I get the latest data from the DB
        // and update the page
        getDogsAndRender();
      })
  }
  
  /*
   -----------------------------------------------
   | 2 - FUNCTIONS TO RENDER ELEMENTS ON MY PAGE |
   -----------------------------------------------
   */
  
  newDogForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createDogRequest(event);
  })
  
  const removeCurrentDogs = () => {
    const dogsContainerChildren = dogsContainer.querySelectorAll('*');
    dogsContainerChildren.forEach(child => child.remove());
    // Alternative approach:
    // dogsContainer.innerHTML = ''
  }
  
  const renderDogs = () => {
    state.dogs.forEach((dog) => {
      const dogForm = document.createElement('form');
  
      const name = document.createElement('p');
      name.innerText = dog.name;
  
      const breed = document.createElement('p');
      breed.innerText = dog.breed;
  
      const isGood = document.createElement('input');
      // isGood.setAttribute('type', 'checkbox');
      isGood.type = 'checkbox'
  
      // Ternary Operator
      // condition ? operationIfTrue : operationIfFalse
      isGood.checked = dog.isGood;
  
      const editButton = document.createElement('button');
      editButton.innerText = 'Update isGood Status';
  
      // Each dog will have an edit button, which will submit the form and
      // change that dog's `isGood` property. As each button should only
      // be linked to one dog, we use the `dog.id` to know which dog to update.
      dogForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editDogIsGoodRequest(dog.id, dog.isGood)
      })
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete Dog :-(';
      // I am not submitting a form here, so I need to make the button type property
      // to be `button`.
      deleteButton.type = 'button';
  
      // Each button which will have a "click" event listener to
      // delete the associated dog (linked by its `dog.id` property).
      deleteButton.addEventListener(('click'), () => {
        deleteDogRequest(dog.id);
      })
  
      dogForm.append(name);
      dogForm.append(breed);
      dogForm.append(isGood);
      dogForm.append(editButton);
      dogForm.append(deleteButton);
  
      dogsContainer.append(dogForm);
    })
  }
  
  // When page first loads, get and display the data
  getDogsAndRender()