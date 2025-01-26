document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTaskToDOM(taskText); // Add each task to the DOM
        });
    }

    // Function to add a task to the DOM
    function addTaskToDOM(taskText) {
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add event listener to the remove button
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove the task from the DOM
            updateLocalStorage(); // Update Local Storage
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the task text
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Add the task to the DOM
        addTaskToDOM(taskText);

        // Update Local Storage
        updateLocalStorage();

        // Clear the input field
        taskInput.value = "";
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent); // Collect all tasks from the DOM
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener to the input field for the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});