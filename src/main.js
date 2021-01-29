function addTask() {
  let inputText = document.getElementById("text-input");
  let prioritySelector = document.getElementById("priority-selector");
  let counter = document.getElementById("counter");

  let newTask = {
    Text: inputText.value,
    Date: new Date().toISOString().slice(0, 19).replace("T", " "),
    Priority: prioritySelector.value,
    IsDone: false,
  };

  tasks.push(newTask);
  createListItem(newTask);

  inputText.value = "";
  counter.innerText = ++count;
  setData();
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

function sort() {
  const sortedTasks = tasks.sort((a, b) => a.Priority - b.Priority);
  addedTasks.innerHTML = "";
  sortedTasks.forEach((item) => {
    createListItem(item);
  });
}

function createListItem(item) {
  let li = newElem("li");
  let taskDiv = newElem("div", "todo-container");
  let taskText = newElem("div", "todo-text");
  let taskPriority = newElem("div", "todo-priority");
  let taskDate = newElem("div", "todo-created-at");
  let doneButton = newElem("button", "done-button");
  taskText.innerText = item.Text;
  taskPriority.innerText = item.Priority;
  taskDate.innerText = item.Date;
  doneButton.innerText = "undone";
  doneButton.addEventListener("click", function () {
    isDone(doneButton);
  });
  taskDiv.append(taskText, taskPriority, taskDate, doneButton);
  li.append(taskDiv);
  addedTasks.prepend(li);
}

function getData() {
  let tasksString = localStorage.getItem("my-todo");
  if (tasksString) {
    tasks = JSON.parse(tasksString);
    tasks.forEach((item) => {
      createListItem(item);
    });
    count = tasks.length;
  }
}

function setData() {
  localStorage.setItem("my-todo", JSON.stringify(tasks));
}

let tasks = [];
let count = 0;

const controlSection = document.getElementById("control-section");
const addButton = document.getElementById("add-button");
const addedTasks = document.getElementById("List");
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sort);
addButton.addEventListener("click", addTask);

getData();
