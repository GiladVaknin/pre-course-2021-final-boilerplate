function addTask() {
  let inputText = document.getElementById("text-input");
  let prioritySelector = document.getElementById("priority-selector");
  let counter = document.getElementById("counter");

  let newTask = {
    text: inputText.value,
    date: new Date().toISOString().slice(0, 19).replace("T", " "),
    priority: prioritySelector.value,
    isDone: false,
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
    let emoji = newElem("i", "fas fa-poo");
    doneButton.append(emoji);
  } else {
    doneButton.innerText = "undone";
    let emoji = newElem("i", "fas fa-poop");
    doneButton.append(emoji);
  }
}

function sort() {
  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
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
  let deleteButton = newElem("button", "delete-button");
  deleteButton.innerText = "Delete Task";
  deleteButton.addEventListener("click", function (e) {
    deleteTask(e);
  });
  taskText.innerText = item.text;
  taskPriority.innerText = item.priority;
  taskDate.innerText = item.date;
  doneButton.innerText = item.isDone ? "done" : "undone";
  let emoji = newElem("i", "fas fa-poop");
  doneButton.append(emoji);
  doneButton.addEventListener("click", function () {
    isDone(doneButton);
  });
  taskDiv.append(taskText, taskPriority, taskDate, doneButton, deleteButton);
  li.append(taskDiv);
  addedTasks.append(li);
}

function getData() {
  let tasksString = localStorage.getItem("my-todo");
  if (tasksString) {
    tasks = JSON.parse(tasksString);
    tasks.forEach((item) => {
      createListItem(item);
    });
    count = tasks.length;
    counter.innerText = count;
  }
}

function setData() {
  localStorage.setItem("my-todo", JSON.stringify(tasks));
}

function deleteTask(e) {
  const target = e.target;
  if (target.className != "delete-button") return;
  else {
    let t = target.closest("li");
    let taskDeletedDate = t.getElementsByClassName("todo-created-at");
    console.log(taskDeletedDate[0].innerText);
    let date = taskDeletedDate[0].innerText;
    let afterDeleteTasks = [];
    let lastRemove;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].date !== date) {
        afterDeleteTasks.push(tasks[i]);
      } else {
        lastRemove = tasks[i];
      }
    }
    tasks = afterDeleteTasks;
    setData();
    t.remove();
  }
}

function navbar() {
  nav.hidden = !nav.hidden;
}

let tasks = [];
let count = 0;

const controlSection = document.getElementById("control-section");
const addButton = document.getElementById("add-button");
const addedTasks = document.getElementById("List");
const sortButton = document.getElementById("sort-button");
let nav = document.getElementById("social-media-bar");
nav.hidden = true;
const navbarButton = document.getElementById("navbarButton");
navbarButton.addEventListener("click", navbar);
sortButton.addEventListener("click", sort);
addButton.addEventListener("click", addTask);

getData();
