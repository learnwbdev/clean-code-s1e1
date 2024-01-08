var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

var createNewTaskItem=function(taskString){
  var listItem=document.createElement("li");
  var checkBox=document.createElement("input");
  var labelTaskTitle=document.createElement("label");
  var editTaskTitle=document.createElement("input");
  var editTaskButton=document.createElement("button");

  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  labelTaskTitle.innerText=taskString;
  labelTaskTitle.className='task-title task-title-label';

  listItem.className="task-item";

  checkBox.type="checkbox";
  checkBox.className="input toggle-task-state";
  editTaskTitle.type="text";
  editTaskTitle.className="input task-title edit-task-title";

  editTaskButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editTaskButton.className="btn edit-task";

  deleteButton.className="btn delete-task";
  deleteButton.ariaLabel="delete task";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.className="delete-task-ico";
  deleteButtonImg.ariaHidden="true";
  deleteButtonImg.alt="";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(labelTaskTitle);
  listItem.appendChild(editTaskTitle);
  listItem.appendChild(editTaskButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem=createNewTaskItem(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
  taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  var listItem=this.parentNode;
  var editInput=listItem.querySelector('input[type=text]');
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".edit-task");
  var hasEditModeClass=listItem.classList.contains("edit-mode");
  if(hasEditModeClass){
  //switch to .edit-mode: label becomes the inputs value
  label.innerText=editInput.value;
  editBtn.innerText="Edit";
  }else{
  editInput.value=label.innerText;
  editBtn.innerText="Save";
  }

  listItem.classList.toggle("edit-mode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

var markTaskCompleted=function(){
  console.log("Complete Task...");
  // when the checkbox is checked,
  // append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

var markTaskIncomplete=function(){
  console.log("Incomplete Task...");
  // when the checkbox is unchecked,
  // append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,markTaskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  var editTaskButton=taskListItem.querySelector("button.edit-task");
  var deleteButton=taskListItem.querySelector("button.delete-task");

  editTaskButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],markTaskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],markTaskIncomplete);
}
