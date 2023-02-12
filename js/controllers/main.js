var listTask = new taskList();
var validation = new Validation();
getLocalStorage();

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
function renderTask(arrTask) {
  var contentHTML = "";

  arrTask.forEach(function (task) {
    contentHTML += `
    <li>
        <span>${task.taskName}</span>
        <div class="buttons">
            <button class="remove" data-index="0" data-status="todo" onclick="deleteTask('${task.taskName}')">
                <i class="fa fa-trash-alt"></i>
            </button>
            <button id="complete" class="complete" data-index="0" data-status="todo" onclick="completeTask('${task.taskName}')">
                <i class="far fa-check-circle"></i>
            </button>
        </div>
    </li>
    `;
  });

  getEle("todo").innerHTML = contentHTML;
}

/**
 * Render Complete
 */
// function renderComplete(name) {
//   var contentHTML = "";
//     contentHTML = `
//     <li>
//         <span style="color: green">${name}</span>
//         <div class="buttons">
//             <button class="remove" data-index="0" data-status="completed" onclick="deleteTask('${name}')">
//                 <i class="fa fa-trash-alt"></i>
//             </button>
//             <button id="complete" class="complete" data-index="0" data-status="completed" onclick="uncompleteTask('${name}')">
//                 <i class="far fa-check-circle"></i>
//             </button>
//         </div>
//     </li>
//     `;
 

//   getEle("completed").innerHTML = contentHTML;
// }

/**
 * Function compleTask
 */
// function completeTask(name){
//   console.log(name);
//   renderComplete(name);
// }

/**
 * Add Task
 */

getEle("addItem").addEventListener("click", function () {
  var task = getTask();
  //   console.log(task);
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

/**
 * Change status
 */
function changeStatus(id) {
  listTask.arr.forEach(function (item) {
    if (item.status == "todo") {
      listTask.deleteTask(id);
      renderTask(listTask.arr);

      var todo = new Task(item.taskName, "complete");
      listTask.addTask(todo);
      renderComplete(listTask.arr);
    } else if (item.status == "complete") {
      listTask.deleteTask(id);
      renderTask(listTask.arr);

      var todo = new Task(item.taskName, "todo");
      listTask.addTask(todo);
      renderComplete(listTask.arr);
    }
  });
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
