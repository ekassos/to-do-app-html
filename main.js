// Container for task text input
const taskInput = document.querySelector(".task-input input"),
// Container for three task progress filters: all, completed, pending
filters = document.querySelectorAll(".filters span"),
// Container for Clear All button
clearAll = document.querySelector(".clear-btn"),
// Container for Submit button
submitButton = document.querySelector(".task-input button"),
// Container for task list (initially empty)
taskBox = document.querySelector(".task-box");
// Variable for check svg file
var svgFile = document.querySelector(".task-input img");

// Constants for edit item id...
let editId,
// ...and whether a task is being edited (originally false)
isEditTask = false,
// Container for all to-do items
todos = JSON.parse(localStorage.getItem("todo-list"));

// Setting function set for each of the 3 filter buttons
// What's happening here: When the user presses a filter tag button,
// 1. The currently selected filter loses its active status
// 2. The pressed filter gets active status
// 3. showTodo is called to refresh the task list and show only relevant items.
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// function showTodo(filter): Refreshes to-do list based on passed filter
function showTodo(filter) {
    // Initializer for list of tags
    let liTag = "";
    // If there is any item in todos (i.e. localStorage is not empty)
    if(todos) {
        // Iterate through each item in localStorage
        todos.forEach((todo, id) => {
            // If status of item is completed, set marker completed to "checked"
            let completed = todo.status == "completed" ? "checked" : "";
            // If the item category matches the selected tag, or if the selected tag is "All"
            if(filter == todo.status || filter == "all") {
                // Create html object for item
                liTag += `<li class="task">
                            <label for="${id}">
                                <!-- Checkbox for marking as completed -->
                                <input onclick='updateStatus(this, "${filter}")' type="checkbox" id="${id}" ${completed}>
                                <!-- Text box and class for strike-through styling (completed or not) -->
                                <!-- Improvement (5) -->
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <!-- Settings menu -->
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <!-- Edit button -->
                                    <!-- Improvement (5) -->
                                    <li onclick='editTask(${id}, "${encodeURI(todo.name)}")'><i class="uil uil-pen"></i>Edit</li>
                                    <!-- Delete button -->
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    // If there are no tasks, show message, else show list of tasks
    taskBox.innerHTML = liTag || `<span>You don't have any tasks here!</span>`;
    // Container for list of tasks
    let checkTask = taskBox.querySelectorAll(".task");
    // If we there are no tasks, make Clear All button inactive, and vice versa
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    // If offsetHeight >= 300 in the task list, add scrollbar
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
// THIS IS THE BASE STATE FUNCTION
// When the user opens the webpage for the very first time, they land on the "All" tab
showTodo("all");

// function showMenu(selectedTask): Shows menu when item menu is selected
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    // Show menu
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        // If user does not click on one of the two option, or cliks outside the item
        if(e.target.tagName != "I" || e.target != selectedTask) {
            // Hide the menu (also happens on click)
             menuDiv.classList.remove("show");
        }
    });
}

// function updateStatus(selectedTask, filter): Updates status of selected item
function updateStatus(selectedTask, filter) {
    // Gets name of task item to be updated
    let taskName = selectedTask.parentElement.lastElementChild;
    // If task item to be updated has been checked... 
    if(selectedTask.checked) {
        // ...add checked class and mark it as completed
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    // If task item to be updated has been unchecked...
    } else {
        // ...remove checked class and mark it as pending
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    // update the local storage list
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // update the view -- Improvement (3)
    showTodo(filter);
}

// function editTask(taskId, textName): Sets up editing environment
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    // Copies item to be edited to textbox -- Improvement (5)
    taskInput.value = decodeURI(textName);
    // Makes task input class active and moves cursor there
    taskInput.focus();
    taskInput.classList.add("active");
}

// function deleteTask(deleteId, filter): Deletes task from list
function deleteTask(deleteId, filter) {
    isEditTask = false;
    // Delete 1 item starting at index deleteId (i.e. delete selected item)
    todos.splice(deleteId, 1);
    // Update localStorage
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // Update task list view
    showTodo(filter);
}

// Click event listener for Clear All button
clearAll.addEventListener("click", () => {
    isEditTask = false;
    // Delete all tasks from list
    todos.splice(0, todos.length);
    // Update localStorage
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // Update task list view
    showTodo()
});

// Typing event listener for task text box (activated when key is released)
taskInput.addEventListener("keyup", e => {
    // Trim unnecessary characters
    let userTask = taskInput.value.trim();
    // If task is not empty
    if(userTask) {
        // Enable Submit button -- Improvement (4)
        submitButton.classList.add("active");
        // Turn checkmark darker -- Improvement (4)
        svgFile.classList.remove("inactive");
        svgFile.classList.add("active");
        // If Enter is pressed...
        if(e.key == "Enter") {
            // ... and a task was NOT being edited:
            if(!isEditTask) {
                todos = !todos ? [] : todos;
                // Create task item with typed name and pending status
                let taskInfo = {name: userTask, status: "pending"};
                // Push info to list container
                todos.push(taskInfo);
            // ... and a task was being edited:
            } else {
                isEditTask = false;
                // Mutate original item name with new typed name
                todos[editId].name = userTask;
            }
            // Make Submit button inactive -- Improvement (4)
            submitButton.classList.remove("active");
            // Turn checkmark lighter -- Improvement (4)
            svgFile.classList.remove("active");
            svgFile.classList.add("inactive");
            // Clear task text box
            taskInput.value = "";
            // Update localStorage
            localStorage.setItem("todo-list", JSON.stringify(todos));
            // Update task list view based on current filter view
            showTodo(document.querySelector("span.active").id);
        }    
    }
    // If task is empty
    if(!userTask) {
          // Make Submit button inactive -- Improvement (4)
          submitButton.classList.remove("active");
          // Turn checkmark lighter -- Improvement (4)
          svgFile.classList.remove("active");
          svgFile.classList.add("inactive");
    }
});

// Click event listener for Submit button -- Improvement (1)
submitButton.addEventListener("click", () => {
    // Trim unnecessary characters
    let userTask = taskInput.value.trim();
    // If a task was NOT being edited:
    if(!isEditTask) {
        todos = !todos ? [] : todos;
        // Create task item with typed name and pending status
        let taskInfo = {name: userTask, status: "pending"};
        // Push info to list container
        todos.push(taskInfo);
    // If a task was being edited:
    } else {
        isEditTask = false;
        // Mutate original item name with new typed name
        todos[editId].name = userTask;
    }
    // Make Submit button inactive -- Improvement (4)
    submitButton.classList.remove("active");
    // Turn checkmark lighter -- Improvement (4)
    svgFile.classList.remove("active");
    svgFile.classList.add("inactive");
    // Clear task text box
    taskInput.value = "";
    // Update localStorage
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // Update task list view based on current filter view
    showTodo(document.querySelector("span.active").id);
});
