//todos array, state of todolist
const todos = JSON.parse(localStorage.getItem('todos'));

function todoListPage() {
    let i;
    if (todos.length === 0) {
        i = 1;
    } else {
        i = todos[todos.length - 1].id + 1;
    }
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

    function render(taskInfo, i, taskStatus) {
        //creating div with todo item
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.id = i;
        //creating li with task text
        const newTodo = document.createElement('li');
        newTodo.innerText = taskInfo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //creating edit input 
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.classList.add('todo-edit');
        todoDiv.appendChild(editInput);
        //creating complete-button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        completedButton.addEventListener('click', completeTask);
        todoDiv.appendChild(completedButton);
        //creating edit-button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editTask);
        todoDiv.appendChild(editButton);
        //creating delete-button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        trashButton.addEventListener('click', deleteTask);
        todoDiv.appendChild(trashButton);

        if (taskStatus === true) {
            todoDiv.classList.add('completed');
            completedButton.innerHTML = '<i class="fas fa-undo"></i>';
        };
        //adding item to todolist
        todoList.appendChild(todoDiv);
    }

    function addTodo(event) {
        //prevent form from submitting
        event.preventDefault();
        //forbid empty input
        if (todoInput.value === '') return;
        //add task and create list item
        todos.push({id: i, task: todoInput.value, completed: false});
        render(todoInput.value, i);
        i++;
        //save todos in localStorage
        saveLocalTodos(todos);
        todoInput.value = '';
    }

    function getTodos() {
        todos.forEach(function(todoItem) {
            render(todoItem.task, todoItem.id, todoItem.completed);
        });   
    }

    function completeTask(event) {
        
        const todo = event.target.parentElement;
        todo.classList.toggle('completed');
        //setting status of task in array todos
        if (todo.classList.contains('completed')) {
            event.target.innerHTML = '<i class="fas fa-undo"></i>';
            todo.childNodes[3].disabled = true;
            setTaskStatus(true, todo);
        } else {
            event.target.innerHTML = '<i class="fas fa-check"></i>';
            todo.childNodes[3].disabled = false;
            setTaskStatus(false, todo);
        };
        saveLocalTodos(todos);
    }

    function setTaskStatus(status, task) {
        todos.forEach(function(todoItem) {
            if (todoItem.id === Number(task.id)) {
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
        const todoIndex = todos.findIndex(todoItem => todoItem.id === Number(todo.id));
        todos.splice(todoIndex, 1);
        saveLocalTodos(todos);
    }

    function editTask(event) {
        const todo = event.target.parentElement;
        todo.classList.toggle('edit-mode');
        if (todo.classList.contains('edit-mode')) {
            event.target.innerHTML = '<i class="fas fa-save"></i>';
            todo.childNodes[0].style.display = 'none';
            todo.childNodes[1].style.display = 'flex'; 
            todo.childNodes[2].disabled = true;
            todo.childNodes[1].value = todo.childNodes[0].innerText;
        } else {
            event.target.innerHTML = '<i class="fas fa-edit"></i>';
            todo.childNodes[0].style.display = 'flex';
            todo.childNodes[1].style.display = 'none';
            todo.childNodes[2].disabled = false;
            if (todo.childNodes[1].value === '') return;
            const newTodoText = todo.childNodes[1].value;
            todo.childNodes[0].innerText = newTodoText;
            todos.forEach(function(todoItem) {
                if (todoItem.id === Number(todo.id)) {
                    todoItem.task = newTodoText;
                }
            });
            todo.childNodes[1].value = '';
            saveLocalTodos(todos);
        }             
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