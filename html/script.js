// Clock function
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  hours = hours.toString().padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // run once immediately

// To-do list
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create the list item
            const newTask = document.createElement('li');

            // Add task text + buttons
            newTask.innerHTML = `
                <span class="task-text">${taskText}</span>
                <div class="buttons">
                    <button class="status started">Started</button>
                    <button class="status half">50% Done</button>
                    <button class="status done">100% Done</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;

            // Delete button logic
            newTask.querySelector('.delete-button').addEventListener('click', function() {
                taskList.removeChild(newTask);
            });

            // Status button logic
            const taskSpan = newTask.querySelector('.task-text');
            newTask.querySelector('.started').addEventListener('click', function() {
                taskSpan.style.color = 'blue';
                taskSpan.textContent = taskText + " (Started)";
            });
            newTask.querySelector('.half').addEventListener('click', function() {
                taskSpan.style.color = 'orange';
                taskSpan.textContent = taskText + " (50% Done)";
            });
            newTask.querySelector('.done').addEventListener('click', function() {
                taskSpan.style.color = 'green';
                taskSpan.textContent = taskText + " (100% Done)";
            });

            // Add to list
            taskList.appendChild(newTask);
            taskInput.value = "";
        }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
