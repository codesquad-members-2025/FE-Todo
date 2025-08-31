import { getFragment } from '../../shared/utils/dom.js';
import { createColumn, createTaskCard } from './template.js';

// 전체 보드(column + card) 생성
function renderBoard(columnsData) {
  const columnContainer = document.querySelector('#kanban-board');

  const fragment = columnsData.reduce(
    (frag, { id, title, taskCount, tasks }) => {
      const columnElement = createColumn(id, title, taskCount);
      const taskContainer = columnElement.querySelector('.task-container');

      tasks.forEach(({ id, title, content, author }) => {
        taskContainer.appendChild(createTaskCard(id, title, content, author));
      });

      frag.appendChild(columnElement);
      return frag;
    },
    getFragment()
  );

  columnContainer.appendChild(fragment);
}

function updateTaskCount(column, amount) {
  const taskCount = column.querySelector('.task-counter span');
  const newCount = parseInt(taskCount.innerText, 10) + amount;
  taskCount.innerText = Math.max(newCount, 0); // 0 이하로 내려가지 않도록 제한
}

export { renderBoard, updateTaskCount };
