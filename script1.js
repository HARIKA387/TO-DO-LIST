let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({ text, completed: false, priority });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let pending = 0, completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `${task.priority} ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const del = document.createElement("button");
    del.textContent = "🗑️";
    del.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    task.completed ? completed++ : pending++;
  });

  document.getElementById("pending").textContent = `Pending: ${pending}`;
  document.getElementById("completed").textContent = `Completed: ${completed}`;
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function sortByPriority() {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  renderTasks();
}
