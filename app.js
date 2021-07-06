

const __data = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getElems = (ids) => ids.map((id) => document.getElementById(id));

const TasksView = () => `
  <div>
    <div>
      <input id="task-name" placeholder="name">
      <button id="add-task">add</button>
    </div>
    <ul id="tasks-list">
    </ul>
  </div>
`;

const TaskView = (name) => `<li>${name}</li>`;

const TasksController = (function () {
  let tasksElem, addElem, nameElem;

  async function getTasks() {
    tasksElem.innerHTML = 'loading...';
    await delay(700);
    tasksElem.innerHTML = '';
    for (let task of __data) tasksElem.innerHTML += TaskView(task.name);
  }

  function addTask() {
    if (nameElem.value !== '')
      tasksElem.innerHTML += TaskView(nameElem.value);
    nameElem.value = '';
  }

  function init() {
    [tasksElem, addElem, nameElem] = getElems([
      'tasks-list',
      'add-task',
      'task-name',
    ]);
    addElem.addEventListener('click', TasksController.addTask);
    TasksController.getTasks();
  }

  return { init, addTask, getTasks };
})();

const MvcApp = (function () {
  function run() {
    document.getElementById('app').innerHTML = TasksView();
    TasksController.init();
  }
  return { run };
})();

MvcApp.run();
