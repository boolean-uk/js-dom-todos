const state = {
    tasks : []
};

const taskUL = document.querySelector("#todo-list")
const root = 'http://localhost:3000/todos';
const form = document.querySelector('form')

form.addEventListener('submit', (submit) => {
    submit.preventDefault()
    const newTaskTitle = document.querySelector('input').value
    createNewtask(newTaskTitle)
})

const getTasks = () => {

    fetch("http://localhost:3000/todos")
    .then((todos) => {return todos.json()})
    .then((tasks) => {
        state.tasks = tasks
        renderTasks()
    })
}

const renderTasks = () => {
    taskUL.innerHTML = ''
    state.tasks.forEach((task) => {
        const li = document.createElement('li')

        const completeBtn = document.createElement('button')
        completeBtn.addEventListener('click', () => {
            updateTaskCompletion(task)
        }) 
        if(task.completed){
            li.className = 'completed'
        }

        const deleteBtn
    })
}