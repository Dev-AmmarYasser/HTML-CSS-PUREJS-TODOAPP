let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// localStorage.clear();

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStotage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

window.onkeyup = function (e) {
  if (e.key == "Enter") {
    submit.click();
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Tasks
    toggleTasksStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  arrayOfTasks.push(task);

  addTasksToPage(arrayOfTasks);

  addDataToLocalStorage(arrayOfTasks);
}

function addTasksToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");

    div.className = "task";

    if (task.completed) {
      div.classList.add("done");
    }

    div.setAttribute("data-id", task.id);

    let divText = document.createTextNode(task.title);

    let span = document.createElement("span");

    span.className = "del";

    span.textContent = "Delete";

    div.appendChild(divText);

    div.appendChild(span);

    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStotage() {
  let data = localStorage.getItem("tasks");

  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

function deleteTaskWith(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);

  addDataToLocalStorage(arrayOfTasks);
}

function toggleTasksStatus(id) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}

document.querySelector(".del-all").onclick = function () {
  tasksDiv.innerHTML = "";
  localStorage.removeItem("tasks");
  arrayOfTasks = [];
};
