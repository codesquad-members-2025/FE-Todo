import { pushChild, unshiftChild } from '../../shared/utils/dom.js';
import { createTaskCard } from './template.js';

function renderTasksForColumn(columnsData) {
  columnsData.forEach(({ id, tasks }) => {
    const columnTaskList = document.querySelector(`#${id} .task-container`);
    const fragment = document.createDocumentFragment();

    tasks.forEach(({ id, title, content, author }) => {
      const taskCard = createTaskCard(id, title, content, author);
      pushChild(fragment, taskCard);
    });

    pushChild(columnTaskList, fragment);
  });
}

function renderTask(columnId, taskData) {
  const { id, title, content, author } = taskData;
  const column = document.querySelector(`#${columnId} .task-container`);
  const taskCardHtml = createTaskCard(id, title, content, author);

  isSortCreated()
    ? pushChild(column, taskCardHtml)
    : unshiftChild(column, taskCardHtml);
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
  renderTasksForColumn,
  renderTask,
  clearTasks,
  clearTasksOfColumn,
  isSortCreated,
};
