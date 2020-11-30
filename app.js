//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//todos array
let todos = [];

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event) {
    //prevent form from submitting!!!
    event.preventDefault();
    if (todoInput.value === '') return;
    //creating div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //creating li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    if (todoDiv.classList.contains('completed')) {
        todos.push({task: todoInput.value, completed: true});
    } else {
        todos.push({task: todoInput.value, completed: false});
    };

    //creating complete-button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //creating delete-button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //adding item to todolist
    todoList.appendChild(todoDiv);

    saveLocalTodos(todos);
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    //delete item
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        //removing todo from todos
        const todoIndex = todos.findIndex(todoItem => todoItem.task === todo.innerText);
        todos.splice(todoIndex, 1);
    };
    //complete item
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        //setting status of task in array todos
        if (todo.classList.contains('completed')) {
            todos.forEach(function(todoItem) {
                if (todoItem.task === todo.innerText) {
                    todoItem.completed = true;
                }
            });
        } else {
            todos.forEach(function(todoItem) {
                if (todoItem.task === todo.innerText) {
                    todoItem.completed = false;
                }
            });
        };
    };
    saveLocalTodos(todos);
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case 'all': 
                todo.style.display = 'flex';
                break;
            case 'completed': 
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
            case 'uncompleted': 
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
        };
    }); 
}

function saveLocalTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    todos = JSON.parse(localStorage.getItem('todos'));
    let todoItems = JSON.parse(localStorage.getItem('todos'));
    todoItems.forEach(function(todoItem) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if (todoItem.completed === true) {
            todoDiv.classList.add('completed');
        };
        //creating li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoItem.task;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //creating complete-button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //creating delete-button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //adding item to todolist
        todoList.appendChild(todoDiv);
    });   
}