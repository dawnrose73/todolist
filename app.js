//todos array, state of todolist
const todos = JSON.parse(localStorage.getItem('todos'));

function todoListPage() {
    //selectors
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo');

    //event listeners
    document.addEventListener('DOMContentLoaded', getTodos);
    todoButton.addEventListener('click', addTodo);
    filterOption.addEventListener('change', filterTodo);

    //functions
    function saveLocalTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function render(taskInfo, taskStatus) {
        //creating div with todo item
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if (taskStatus === true) {
            todoDiv.classList.add('completed');
        };
        //creating li with task text
        const newTodo = document.createElement('li');
        newTodo.innerText = taskInfo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //creating complete-button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        completedButton.addEventListener('click', completeTask);
        todoDiv.appendChild(completedButton);
        //creating delete-button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        trashButton.addEventListener('click', deleteTask);
        todoDiv.appendChild(trashButton);
        //adding item to todolist
        todoList.appendChild(todoDiv);
    }

    function addTodo(event) {
        //prevent form from submitting
        event.preventDefault();
        //forbid empty input
        if (todoInput.value === '') return;
        //add task and create list item
        todos.push({task: todoInput.value, completed: false});
        render(todoInput.value);
        //save todos in localStorage
        saveLocalTodos(todos);
        todoInput.value = '';
    }

    function getTodos() {
        todos.forEach(function(todoItem) {
            render(todoItem.task, todoItem.completed);
        });   
    }

    function completeTask(event) {
        console.log(event.target);
        const todo = event.target.parentElement;
        todo.classList.toggle('completed');
        //setting status of task in array todos
        if (todo.classList.contains('completed')) {
            setTaskStatus(true, todo);
        } else {
            setTaskStatus(false, todo);
        };
        saveLocalTodos(todos);
    }

    function setTaskStatus(status, task) {
        todos.forEach(function(todoItem) {
            if (todoItem.task === task.innerText) {
                todoItem.completed = status;
            }
        });
    }

    function deleteTask(event) {
        const todo = event.target.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        //removing todo from todos
        const todoIndex = todos.findIndex(todoItem => todoItem.task === todo.innerText);
        todos.splice(todoIndex, 1);
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
}

todoListPage(todos);