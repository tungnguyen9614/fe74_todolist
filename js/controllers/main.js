var listTask = new taskList();
var validation = new Validation();
// getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

/**
 * Get Task info
 */
function getTask() {
  var taskName = getEle("newTask").value;
  /**
   * Validation
   */
  var isValid = true;

  isValid &=
    validation.kiemTraRong(taskName, "notiInput", "(*) Please insert Task") &&
    validation.kiemTraTrung(
      taskName,
      "notiInput",
      "(*) Task is already existed",
      listTask.arr
    );

  if (!isValid) {
    return null;
  }

  var task = new Task(taskName);
  return task;
}

/**
 * Render Task
 */
// function renderTask(arrTask) {
//   var contentHTML = "";

//   arrTask.forEach(function(task) {
//     contentHTML += `
//     <li>
//         <span>${task.taskName}</span>
//         <div class="buttons">
//             <button class="remove" data-index="0" data-status="todo" onclick="deleteTask('${task.taskName}')">
//                 <i class="fa fa-trash-alt"></i>
//             </button>
//             <button id="complete" class="complete" data-index="0" data-status="todo" onclick="completeTask('${task.taskName}')">
//                 <i class="fas fa-check-circle"></i>
//             </button>
//         </div>
//     </li>
//     `;
//   });

//   getEle("todo").innerHTML = contentHTML;
//   getEle("completed").innerHTML = contentHTML;
// }

function renderTask(taskListArr) {
  var todo = "";
  var completed = "";
  taskListArr.forEach(function (task) {
    if (!task.status) {
      todo += `
      <li>
        <span>${task.taskName}</span>
        <div class="buttons">
          <button class="remove" data-index="0" data-status="todo" onclick="deleteTask('${task.taskName}')">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" data-index="0" data-status="todo" onclick="completeTask('${task.taskName}')">
            <i class="far fa-check-circle"></i>
          </button>
        </div>
      </li>
      `;
    } else {
      completed += `
      <li>
        <span>${task.taskName}</span>
        <div class="buttons">
          <button class="remove" data-index="0" data-status="completed" onclick="deleteTask('${task.taskName}')">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" data-index="0" data-status="completed" onclick="completeTask('${task.taskName}')">
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>
      `;
    }
  });
  getEle("todo").innerHTML = todo;
  getEle("completed").innerHTML = completed;
}

/**
 * Add Task
 */

getEle("addItem").addEventListener("click", function () {
  var task = getTask();
  if (task) {
    listTask.addTask(task);
    renderTask(listTask.arr);
    setLocalStorage();
  }
});

/**
 * Delete Task
 */

function deleteTask(taskName) {
  listTask.deleteTask(taskName);
  renderTask(listTask.arr);
  setLocalStorage();
}

function completeTask(name) {
  var task = listTask.getTaskByName(name);
  task.status = !task.status;
  renderTask(listTask.arr);
  setLocalStorage();
}

function setLocalStorage() {
  var dataString = JSON.stringify(listTask.arr);
  localStorage.setItem("taskList", dataString);
}

function getLocalStorage() {
  var dataString = localStorage.getItem("taskList");

  var dataJSON = JSON.parse(dataString);
  listTask.arr = dataJSON;

  renderTask(listTask.arr);
}
