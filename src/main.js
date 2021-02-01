//This function add a task to the tasks array.
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

//This function creates a new element in the document of  the type that received and with
//the className that received.
function newElem(type, className) {
  let elem = document.createElement(type);
  if (className) elem.className = className;
  return elem;
}

// This function checks if the task is done and sets the opposite in "click".
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

// This function sort the tasks by the priority of them.
function sort() {
  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
  addedTasks.innerHTML = "";
  sortedTasks.forEach((item) => {
    createListItem(item);
  });
}

// This function gets an item (task) and creates an html element with its data.
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

// This function gets the data from the local storage and add it to the web.
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

// This function sets the current data to the local storage.
function setData() {
  localStorage.setItem("my-todo", JSON.stringify(tasks));
}

// This function delete a task from the array and the "li" element that present it in the html.
function deleteTask(e, li) {
  let taskDeletedDate = li.getElementsByClassName("todo-created-at");
  let date = taskDeletedDate[0].innerText;
  let taskNum = taskFinder(date);
  lastRemove = tasks[taskNum];
  tasks.splice(taskNum, 1);
  counter.innerText = tasks.length;
  count -= 1;
  setData();
  li.remove();
}

// This function shows and hide the  contact options nav-bar.
function navbar() {
  nav.hidden = !nav.hidden;
}
// This function add the last task that was deleted.
function undo() {
  createListItem(lastRemove);
  tasks.push(lastRemove);
  counter.innerText = ++count;
  setData();
}

// This function gets a date (string) and find the task place in the array.
function taskFinder(date) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date === date) {
      return i;
    }
  }
  return;
}

// This function removes all the tasks list from the array,html and local storage.
function removeAll() {
  addedTasks.innerHTML = "";
  tasks = [];
  count = 0;
  counter.innerText = 0;
  setData();
}

// This function checks the percent of the tasks that are done.
function checkPercentage() {
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

// This function creates an iframe element with motivational video and pop it to the screen.
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
  videoSpan.appendChild(video);
  videoSpan.append(closeVideoButton);
  document.body.append(videoSpan);
  closeVideoButton.addEventListener("click", () => {
    videoSpan.remove();
    addedTasks.hidden = false;
  });
}

//This function opens the help div with explanation on the web buttons.
function userHelp() {
  explanation.hidden = false;
  let closeIcon = document.getElementById("close-icon");
  closeIcon.addEventListener("click", () => {
    explanation.hidden = true;
  });
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
let counter = document.getElementById("counter");
const helpButton = document.getElementById("help-button");
const explanation = document.getElementById("explanation");
explanation.hidden = true;

let lastRemove;
nav.hidden = true;

navbarButton.addEventListener("click", navbar);
sortButton.addEventListener("click", sort);
addButton.addEventListener("click", addTask);
undoButton.addEventListener("click", undo);
removeAllButton.addEventListener("click", removeAll);
percentDone.addEventListener("click", checkPercentage);
videoOpen.addEventListener("click", videoOpener);
helpButton.addEventListener("click", userHelp);

getData();
