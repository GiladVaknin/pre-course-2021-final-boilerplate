function addTask() {
  let inputText = document.getElementById("text-input");
  let prioritySelector = document.getElementById("priority-selector");
  let counter = document.getElementById("counter");

  let newTask = {
    Text: inputText.value,
    Date: new Date(),
    Priority: prioritySelector.value,
    IsDone: false,
  };
  tasks.push(newTask);

  let li = newElem("li");
  let taskDiv = newElem("div", "todo-container");
  let taskText = newElem("div", "todo-text");
  let taskPriority = newElem("div", "todo-priority");
  let taskDate = newElem("div", "todo-created-at");
  let doneButton = newElem("button", "done-button");

  taskText.innerText = newTask.Text;
  taskPriority.innerText = newTask.Priority;
  taskDate.innerText = newTask.Date;
  doneButton.innerText = "undone";
  doneButton.addEventListener("click", function () {
    isDone(doneButton);
  });

  taskDiv.append(taskText, taskPriority, taskDate, doneButton);
  li.append(taskDiv);
  addedTasks.prepend(li);
  inputText.value = "";
  counter.innerText = ++count;
}

function newElem(type, className) {
  let elem = document.createElement(type);
  if (className) elem.className = className;
  return elem;
}

function isDone(doneButton) {
  if (doneButton.innerText === "undone") {
    doneButton.innerText = "done";
  } else {
    doneButton.innerText = "undone";
  }
}

let tasks = [];
let count = 0;

const controlSection = document.getElementById("control-section");
const addButton = document.getElementById("add-button");
const addedTasks = document.getElementById("List");
addButton.addEventListener("click", addTask);
