import { getFragment } from '../../shared/utils/dom.js';
import { createTaskCard } from './template.js';

function renderTasksInColumn(columnsData) {
  columnsData.forEach(({ id, tasks }) => {
    const columnTaskList = document.querySelector(`#${id} .task-container`);

    const fragment = tasks.reduce((frag, { id, title, content, author }) => {
      frag.appendChild(createTaskCard(id, title, content, author));
      return frag;
    }, getFragment());

    columnTaskList.appendChild(fragment);
  });
}

function renderTask(columnId, taskData) {
  const { id, title, content, author } = taskData;
  const column = document.querySelector(`#${columnId} .task-container`);
  const taskCardHtml = createTaskCard(id, title, content, author);

  isSortCreated()
    ? column.appendChild(taskCardHtml)
    : column.insertBefore(taskCardHtml);
}

function isSortCreated() {
  const sortButtonLabel = document.querySelector('#task-sort-btn').dataset.type;
  return sortButtonLabel === 'created';
}

function clearTasks() {
  document.querySelectorAll('.kanban-column').forEach(clearTasksOfColumn);
}

function clearTasksOfColumn(columnElement) {
  const columnTaskList = columnElement.querySelector('.task-container');
  columnTaskList && (columnTaskList.innerHTML = '');
}

export {
  renderTasksInColumn,
  renderTask,
  clearTasks,
  clearTasksOfColumn,
  isSortCreated,
};
