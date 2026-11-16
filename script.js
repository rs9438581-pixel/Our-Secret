
let tasks = [];

// Load saved tasks
function loadTasks() {
    let savedTasks = localStorage.getItem("myTasksData");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
}

// Save tasks
function saveTasks() {
    localStorage.setItem("myTasksData", JSON.stringify(tasks));
}

// Show tasks on website
function renderTasks() {
    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(function(task) {

        let li = document.createElement("li");
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("completed");
        }

        let taskText = document.createElement("span");
        taskText.textContent = task.text;
        li.appendChild(taskText);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.dataset.action = "edit";
        li.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.action = "delete";
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });

    updateCounter();
}

// Add new task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: task,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

// Update task counters
function updateCounter() {

    document.getElementById("taskCounter").textContent =
        "Total Tasks: " + tasks.length;

    let pending = tasks.filter(task => !task.completed).length;

    let completed = tasks.filter(task => task.completed).length;

    document.getElementById("pendingCount").textContent = pending;

    document.getElementById("completedCount").textContent = completed;
}

// Handle Edit, Delete and Complete
document.getElementById("taskList").addEventListener("click", function(event) {

    let li = event.target.closest("li");

    if (!li) return;

    let task = tasks.find(function(item) {
        return item.id === li.dataset.id;
    });

    if (!task) return;

    if (event.target.dataset.action === "edit") {

        let newTask = prompt("Edit your task:", task.text);

        if (newTask !== null && newTask.trim() !== "") {
            task.text = newTask.trim();
        }

    } else if (event.target.dataset.action === "delete") {

        tasks = tasks.filter(function(item) {
            return item.id !== task.id;
        });

    } else {

        task.completed = !task.completed;

    }

    saveTasks();
    renderTasks();
});

// Show today's date
function showDate() {
    let today = new Date();

    document.getElementById("todayDate").textContent =
        today.toDateString();
}

// Start website
showDate();
loadTasks();
