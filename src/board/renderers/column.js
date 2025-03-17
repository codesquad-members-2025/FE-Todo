import { pushChild } from '../../shared/utils/dom.js';
import { createColumn } from './template.js';

// 전체 칼럼 생성
function renderColumns(columnsData) {
  const columnContainer = document.querySelector('#kanban-board');

  const columnsHtml = columnsData.reduce(
    (columnsHtml, { id, title, taskCount }) =>
      (columnsHtml += createColumn(id, title, taskCount)),
    ''
  );

  pushChild(columnContainer, columnsHtml);
}

export { renderColumns };
