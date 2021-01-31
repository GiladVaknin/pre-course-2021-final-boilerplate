function addTask() {
  let inputText = document.getElementById("text-input");
  let prioritySelector = document.getElementById("priority-selector");

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
  let t = doneButton.closest("li");
  let taskDeletedDate = t.getElementsByClassName("todo-created-at");
  let date = taskDeletedDate[0].innerText;
  let taskNumber = taskFinder(date);
  if (tasks[taskNumber].isDone) {
    doneButton.innerText = "undone";
    let emoji = newElem("i", "fas fa-poop");
    doneButton.append(emoji);
  } else {
    doneButton.innerText = "done";
    let emoji = newElem("i", "fas fa-poo");
    doneButton.append(emoji);
  }
  tasks[taskNumber].isDone = !tasks[taskNumber].isDone;
  setData();
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
  let taskSpan = newElem("span", "task-span");
  let taskDiv = newElem("div", "todo-container");
  let taskText = newElem("div", "todo-text");
  let taskPriority = newElem("div", "todo-priority");
  let taskDate = newElem("div", "todo-created-at");
  let doneButton = newElem("button", "done-button");
  let deleteButton = newElem("button", "delete-button");
  let deleteIcon = newElem("i", "fas fa-trash");
  deleteButton.append(deleteIcon);
  deleteButton.addEventListener("click", function (e) {
    deleteTask(e, li);
  });
  taskText.innerText = item.text;
  taskPriority.innerText = item.priority;
  taskDate.innerText = item.date;
  doneButton.innerText = item.isDone ? "done" : "undone";
  if (item.isDone) {
    let emoji = newElem("i", "fas fa-poo");
    doneButton.append(emoji);
  } else {
    let emoji = newElem("i", "fas fa-poop");
    doneButton.append(emoji);
  }
  doneButton.addEventListener("click", function () {
    isDone(doneButton);
  });
  taskDiv.append(taskText, taskPriority, taskDate, doneButton, deleteButton);
  taskSpan.append(taskDiv);
  li.append(taskSpan);
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

function deleteTask(e, li) {
  let taskDeletedDate = li.getElementsByClassName("todo-created-at");
  let taskNum = taskFinder(taskDeletedDate);
  lastRemove = tasks[taskNum];
  tasks.splice(taskNum, 1);
  counter.innerText = tasks.length;
  setData();
  li.remove();
}

function navbar() {
  nav.hidden = !nav.hidden;
}

function undo() {
  createListItem(lastRemove);
  tasks.push(lastRemove);
  counter.innerText = count;
  setData();
}

function taskFinder(date) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date === date) {
      return i;
    }
  }
  return;
}

function removeAll() {
  addedTasks.innerHTML = "";
  tasks = [];
  count = 0;
  counter.innerText = 0;
  setData();
}

function checkPercents() {
  let donedTasks = 0;
  for (let task of tasks) {
    if (task.isDone) donedTasks++;
  }
  let percents = Math.floor((donedTasks / tasks.length) * 100);
  if (percents >= 0) {
    alert("Hi champ, you finished " + percents + "% of your tasks.");
  } else {
    alert(
      "Hi champ, you have no tasks yet..\n Lets add some and start working!"
    );
  }
}

function videoOpener() {
  addedTasks.hidden = true;
  let videoSpan = newElem("span", "video");
  let video = newElem("iframe", "motivation-video");
  let closeVideoButton = newElem("button", "close-video");
  let closeIcon = newElem("i", "fas fa-window-close");
  closeVideoButton.append(closeIcon);
  video.setAttribute("src", "https://www.youtube.com/embed/V3WrCx3mwNo");
  video.style.width = "640px";
  video.style.height = "480px";
  video.setAttribute("draggable", "true");
  videoSpan.appendChild(video);
  videoSpan.append(closeVideoButton);
  document.body.append(videoSpan);
  closeVideoButton.addEventListener("click", () => {
    videoSpan.remove();
    addedTasks.hidden = false;
  });
  video.addEventListener("dragend", fullScreen);
}

function fullScreen() {
  this.style.height = "700px";
  this.style.width = "900px";
}

let tasks = [];
let count = 0;

const controlSection = document.getElementById("control-section");
const addButton = document.getElementById("add-button");
const addedTasks = document.getElementById("List");
const sortButton = document.getElementById("sort-button");
const nav = document.getElementById("social-media-bar");
const navbarButton = document.getElementById("navbarButton");
const undoButton = document.getElementById("undo-button");
const removeAllButton = document.getElementById("removeAll-button");
const percentDone = document.getElementById("user-check");
const videoOpen = document.getElementById("motivation-charger");
// const searchBar = document.getElementById("searchBar");
let counter = document.getElementById("counter");

let lastRemove;
nav.hidden = true;
navbarButton.addEventListener("click", navbar);
sortButton.addEventListener("click", sort);
addButton.addEventListener("click", addTask);
undoButton.addEventListener("click", undo);
removeAllButton.addEventListener("click", removeAll);
percentDone.addEventListener("click", checkPercents);
videoOpen.addEventListener("click", videoOpener);
// `searchBar.addEventListener("keyup", searchTask);

getData();
