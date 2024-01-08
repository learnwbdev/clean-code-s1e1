const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskItem = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const labelTaskTitle = document.createElement("label");
  const editTaskTitle = document.createElement("input");
  const editTaskButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  labelTaskTitle.innerText = taskString;
  labelTaskTitle.className = 'task-title task-title-label';

  listItem.className = "task-item";

  checkBox.type = "checkbox";
  checkBox.className = "input toggle-task-state";
  editTaskTitle.type = "text";
  editTaskTitle.className = "input task-title edit-task-title";

  editTaskButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editTaskButton.className = "btn edit-task";

  deleteButton.className = "btn delete-task";
  deleteButton.ariaLabel = "delete task";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "delete-task-ico";
  deleteButtonImg.ariaHidden = "true";
  deleteButtonImg.alt = "";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(labelTaskTitle);
  listItem.appendChild(editTaskTitle);
  listItem.appendChild(editTaskButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editTaskButton = taskListItem.querySelector("button.edit-task");
  const deleteButton = taskListItem.querySelector("button.delete-task");

  editTaskButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

const addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;

  const listItem = createNewTaskItem(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
  taskInput.value = "";
}

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit-task");
  const hasEditModeClass = listItem.classList.contains("edit-mode");
  if (hasEditModeClass) {
    //switch to .edit-mode: label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const markTaskCompleted = function () {
  console.log("Complete Task...");
  // when the checkbox is checked,
  // append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

const markTaskIncomplete = function () {
  console.log("Incomplete Task...");
  // when the checkbox is unchecked,
  // append the task list item to the #incomplete-tasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], markTaskIncomplete);
}
