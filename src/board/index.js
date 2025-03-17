import { renderColumns } from './renderers/column.js';
import { renderTasksForColumn } from './renderers/task.js';
import { initKanbanEvents, initSortButton } from './handlers/eventHandlers.js';
import { loadColumnsData } from './store.js';

// 보드 초기화
async function initializeBoard() {
  const columnsData = await loadColumnsData();

  renderColumns(columnsData);
  renderTasksForColumn(columnsData);

  initKanbanEvents();
  initSortButton();
}

export { initializeBoard };
