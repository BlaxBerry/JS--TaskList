const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('task');
const filter = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');



loadEventListeners();


function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTask);

    addBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup', filterTasks);

}


function addTask() {

    if (taskInput.value === '') {
        alert('Please Add a Task');
    } else {

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-times"></i>';

        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
}




function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {

        if (confirm('Are you sure to remove ?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}




function clearTasks() {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    };

    clearTasksFromLocalStorage()
}



function filterTasks() {

    const filterValue = this.value;

    document.querySelectorAll('.collection-item').forEach((item) => {

        const text = item.innerText;

        if (text.indexOf(filterValue) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}



function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function getTask() {
    let tasks;

    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-times"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    });

}



function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    })

}


function clearTasksFromLocalStorage() {
    localStorage.clear();
}