//get node
// const form = document.getElementById('task-form');
const addBtn = document.getElementById('addBtn');

const taskInput = document.getElementById('task');

const filter = document.getElementById('filter');

const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');


// load event listener
loadEventListeners();

// function load event listener
function loadEventListeners() {

    // add event
    addBtn.addEventListener('click', addTask);

    // delete event(one by one)
    taskList.addEventListener('click', removeTask);

    // delete event (all)
    clearBtn.addEventListener('click', clearTasks);

    //filter evebt
    filter.addEventListener('keyup', filterTasks);

}


// function add Task
function addTask() {

    if (taskInput.value === '') {
        alert('Please Add a Task');
    } else {

        // // create li tag
        const li = document.createElement('li');
        // //  add class name 
        li.className = 'collection-item';
        // // create textnode(content) and then append to li
        li.appendChild(document.createTextNode(taskInput.value));


        // // create a tag(delete link)
        const link = document.createElement('a');
        // //  add class name 
        link.className = 'delete-item secondary-content';
        // // add icon-font
        link.innerHTML = '<i class="fa fa-times"></i>';
        // // append link to li
        li.appendChild(link);

        // // append li to ul
        taskList.appendChild(li);


        //at the end ,delete input value
        taskInput.value = '';
    }
    // e.preventDefault()
}



// function remove Task (one by one)
function removeTask(e) {
    // console.log(e.target);

    // add event to a, father of i tag
    // e.target.parentElement

    // get i tag `s father tag
    if (e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);// yes e.target is i tag,remove its parent`s parent
        if (confirm('Are you sure to REMOVE this Tag ?'))
            e.target.parentElement.parentElement.remove();
    }
}


// function clear all Tasks

function clearTasks() {
    // (No 1) using innerHTML = ''
    // taskList.innerHTML = '';

    //(N0 2) using  removeChild()   faster than innerHTML
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    };
}



// function filter Tasks
function filterTasks() {
    // console.log(this.value);
    const filterValue = this.value;

    document.querySelectorAll('.collection-item').forEach((item) => {
        // console.log(item.innerText);
        const text = item.innerText;

        if (text.indexOf(filterValue) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }

    })

}