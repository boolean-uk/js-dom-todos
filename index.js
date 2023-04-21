const getToDoList = document.querySelector('ul')
const li = document.createElement('li')
getToDoList.append(li)

fetch("http://localhost:3000/todos")

.then(function(response) {
return response.json()
})

.then(function(data){
console.log("To do date:", data)
})