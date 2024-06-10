"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GET_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo';
const POST_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo';
const PATCH_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo/';
const DELETE_URL = 'https://boolean-uk-api-server.fly.dev/th0jensen/todo/';
function getAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch(GET_URL)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield response.json();
            renderTodoList(todos);
        }))
            .catch((error) => {
            alert('ERROR: Could not fetch todos: ' + error);
            throw new Error('ERROR: Could not fetch todos: ' + error);
        });
    });
}
function addTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        const postResponse = yield fetch(POST_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todo }),
        });
        const todoContent = yield postResponse.json();
        console.log(todoContent);
    });
}
function updateTodo(todo, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const postResponse = yield fetch(PATCH_URL + todo.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todo.title, completed: completed }),
        });
        const todoContent = yield postResponse.json();
        console.log(todoContent);
    });
}
function deleteTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        const postResponse = yield fetch(DELETE_URL + todo.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todo.title }),
        });
        const todoContent = yield postResponse.json();
        console.log(todoContent);
    });
}
function render() {
    const form = document.querySelector('form');
    if (!form) {
        throw new Error('ERROR: No form found in DOM');
    }
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const newTodo = new FormData(form);
        let newData = newTodo.get('title');
        if (newData === null) {
            console.error('ERROR: Input is invalid');
        }
        else {
            newData = newData.toString();
            yield addTodo(newData)
                .then(() => {
                getAllTodos();
            })
                .catch((err) => {
                alert(`ERROR: Could add todo}: ${err}`);
                throw new Error(`ERROR: Could add todo: ${err}`);
            });
        }
    }));
}
function renderTodoList(todos) {
    const todoList = document.getElementById('todo-list');
    if (!todoList) {
        throw new Error('ERROR: No todo-list found in DOM');
    }
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        const todoTitle = document.createElement('span');
        todoTitle.innerText = todo.title;
        listItem.appendChild(todoTitle);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        listItem.appendChild(checkbox);
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-button', 'material-symbols-outlined');
        deleteButton.innerText = 'delete';
        listItem.appendChild(deleteButton);
        if (todo.completed) {
            todoTitle.classList.add('completed');
            checkbox.checked = true;
        }
        else {
            todoTitle.classList.remove('completed');
            checkbox.checked = false;
        }
        checkbox.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            if (!todo.completed) {
                yield updateTodo(todo, true)
                    .then(() => {
                    todoTitle.classList.add('completed');
                    getAllTodos();
                })
                    .catch((err) => {
                    alert(`ERROR: Could not update ${todo.title}: ${err}`);
                    throw new Error(`ERROR: Could not update ${todo.title}: ${err}`);
                });
            }
            else {
                yield updateTodo(todo, false)
                    .then(() => {
                    todoTitle.classList.remove('completed');
                    getAllTodos();
                })
                    .catch((err) => {
                    alert(`ERROR: Could not update ${todo.title}: ${err}`);
                    throw new Error(`ERROR: Could not update ${todo.title}: ${err}`);
                });
            }
        }));
        deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            yield deleteTodo(todo)
                .then(() => {
                getAllTodos();
            })
                .catch((err) => {
                alert(`ERROR: Could not delete ${todo.title}: ${err}`);
                throw new Error(`ERROR: Could not delete ${todo.title}: ${err}`);
            });
        }));
        todoList.appendChild(listItem);
    });
}
render();
getAllTodos();
