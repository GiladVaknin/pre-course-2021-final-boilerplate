const controlSection = document.getElementById("control-section");
const addButton = document.getElementById("add-button");
let inputTask = document.getElementById("task");
const addedTasks = document.getElementById("List");
const priority = document.getElementById("priority");
let counter = 0;
addButton.addEventListener("click", function () {
  let li = document.createElement("li");
  let taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "todo-container");
  let taskText = document.createElement("div");
  taskText.setAttribute("class", "todo-text");
  let taskPriority = document.createElement("div");
  taskPriority.setAttribute("class", "todo-priority");
  let taskDate = document.createElement("div");
  taskDate.setAttribute("class", "todo-created-at");
  taskText.innerText = inputTask.value;
  taskPriority.innerText = priority.value;
  let date = new Date();
  taskDate.innerText = date.toString();
  taskDiv.append(taskDate, taskPriority, taskText);
  li.append(taskDiv);
  addedTasks.append(li);
  inputTask.value = "";
  count++;
});
