// Get HTML elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");

const searchInput = document.getElementById("search-input");
const tabs = document.querySelectorAll(".tab");

const remainingCount = document.getElementById("remaining-count");
const clearCompleted = document.getElementById("clear-completed");
const clearAll = document.getElementById("clear-all");

const themeToggle = document.getElementById("theme-toggle");


// Store tasks
let tasks = [];
    

// Current filter
let currentFilter = "all";


// Task to delete
let taskToDelete = null;


// -------------------------
// ADD TASK
// -------------------------

function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    let task = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(task);

    taskInput.value = "";

    showTasks();
}


// -------------------------
// SHOW TASKS
// -------------------------

function showTasks() {

    list.innerHTML = "";

    let filteredTasks = tasks;


    // Active filter
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return task.done === false;
        });

    }


    // Done filter
    if (currentFilter === "done") {

        filteredTasks = tasks.filter(function(task) {
            return task.done === true;
        });

    }


    // Search
    let searchText = searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(function(task) {

        return task.text.toLowerCase().includes(searchText);

    });


    // No tasks
    if (filteredTasks.length === 0) {

        list.innerHTML = `
            <li class="empty-state">
                Nothing here yet.
            </li>
        `;

        updateCount();

        return;
    }


    // Create tasks
    filteredTasks.forEach(function(task) {

        let li = document.createElement("li");

        li.className = "item";


        if (task.done) {
            li.classList.add("done");
        }


        li.innerHTML = `

            <svg class="checkbox ${task.done ? "done" : ""}"
                viewBox="0 0 20 20">

                <rect
                    x="1.5"
                    y="1.5"
                    width="17"
                    height="17"
                    rx="2">
                </rect>

                <path
                    d="M5 10.5L8.5 14L15 6.5">
                </path>

            </svg>


            <div class="item-body">

                <div class="item-text">
                    ${task.text}
                </div>

            </div>


            <div class="item-actions">

                <button class="icon-btn edit">
                    edit
                </button>

                <button class="icon-btn delete">
                    delete
                </button>

            </div>

        `;


        // Checkbox
        let checkbox = li.querySelector(".checkbox");

        checkbox.addEventListener("click", function() {

            toggleTask(task.id);

        });


        // Edit button
        let editButton = li.querySelector(".edit");

        editButton.addEventListener("click", function() {

            editTask(task.id);

        });


        // Delete button
        let deleteButton = li.querySelector(".delete");

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        list.appendChild(li);

    });


    updateCount();
}


// -------------------------
// COMPLETE TASK
// -------------------------

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.done = !task.done;

        }

    });

    showTasks();
}


// -------------------------
// EDIT TASK
// -------------------------

function editTask(id) {

    let task = tasks.find(function(task) {

        return task.id === id;

    });


    if (!task) {
        return;
    }


    let newText = prompt(
        "Edit your task:",
        task.text
    );


    if (newText === null) {
        return;
    }


    newText = newText.trim();


    if (newText === "") {
        return;
    }


    task.text = newText;

    showTasks();
}


// -------------------------
// DELETE TASK
// -------------------------

function deleteTask(id) {

    taskToDelete = id;

    const popup = document.getElementById("bg-popup");

    popup.classList.add("show");
}


// -------------------------
// DELETE POPUP
// -------------------------

const popup = document.getElementById("bg-popup");
const popupCancel = document.getElementById("popup-cancel");
const popupConfirm = document.getElementById("popup-confirm");


// Cancel delete
popupCancel.addEventListener("click", function() {

    taskToDelete = null;

    popup.classList.remove("show");

});


// Confirm delete
popupConfirm.addEventListener("click", function() {

    if (taskToDelete === null) {
        return;
    }


    tasks = tasks.filter(function(task) {

        return task.id !== taskToDelete;

    });


    taskToDelete = null;

    popup.classList.remove("show");

    showTasks();

});


// Click outside popup
popup.addEventListener("click", function(event) {

    if (event.target === popup) {

        taskToDelete = null;

        popup.classList.remove("show");

    }

});


// -------------------------
// UPDATE COUNT
// -------------------------

function updateCount() {

    let remaining = tasks.filter(function(task) {

        return task.done === false;

    });


    remainingCount.textContent =
        remaining.length + " remaining";


    let completed = tasks.filter(function(task) {

        return task.done === true;

    });


    clearCompleted.disabled =
        completed.length === 0;
}


// -------------------------
// CLEAR COMPLETED
// -------------------------

function clearDoneTasks() {

    tasks = tasks.filter(function(task) {

        return task.done === false;

    });


    showTasks();
}


// -------------------------
// CLEAR ALL
// -------------------------

function clearEverything() {

    if (tasks.length === 0) {
        return;
    }


    let answer = confirm("Delete all tasks?");


    if (answer === false) {
        return;
    }


    tasks = [];

    showTasks();
}


// -------------------------
// FILTER TABS
// -------------------------

tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        tabs.forEach(function(tab) {

            tab.classList.remove("active");

        });


        this.classList.add("active");


        currentFilter =
            this.dataset.filter;


        showTasks();

    });

});


// -------------------------
// ADD BUTTON
// -------------------------

addBtn.addEventListener("click", function() {

    addTask();

});


// -------------------------
// ENTER KEY
// -------------------------

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// -------------------------
// SEARCH
// -------------------------

searchInput.addEventListener("input", function() {

    showTasks();

});


// -------------------------
// CLEAR COMPLETED
// -------------------------

clearCompleted.addEventListener("click", function() {

    clearDoneTasks();

});


// -------------------------
// CLEAR ALL
// -------------------------

clearAll.addEventListener("click", function() {

    clearEverything();

});


// -------------------------
// DARK MODE
// -------------------------

themeToggle.addEventListener("click", function() {

    let theme =
        document.documentElement.getAttribute("data-theme");


    if (theme === "dark") {

        document.documentElement.removeAttribute(
            "data-theme"
        );

        themeToggle.textContent = "DARK";

    }

    else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeToggle.textContent = "LIGHT";

    }

});


// -------------------------
// START
// -------------------------

showTasks();