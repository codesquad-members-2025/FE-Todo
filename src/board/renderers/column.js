import { pushChild } from '../../shared/utils/dom.js';
import { createColumn, createTaskCard } from './template.js';

// 전체 칼럼 생성
function renderColumns(columnsData) {
  const columnContainer = document.querySelector('#kanban-board');
  const fragment = document.createDocumentFragment();

  columnsData.forEach(({ id, title, taskCount, tasks }) => {
    const columnElement = createColumn(id, title, taskCount);
    const taskContainer = columnElement.querySelector('.task-container');

    tasks.forEach(({ id, title, content, author }) => {
      pushChild(taskContainer, createTaskCard(id, title, content, author));
    });

    pushChild(fragment, columnElement);
  });

  pushChild(columnContainer, fragment);
}

export { renderColumns };
