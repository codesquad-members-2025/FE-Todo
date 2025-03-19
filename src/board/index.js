import { renderBoard } from './renderers/column.js';
import { initKanbanEvents, initSortButton } from './handlers/eventHandlers.js';
import { loadColumnsData } from './store.js';

// 보드 초기화
async function initializeBoard() {
  const columnsData = await loadColumnsData();

  renderBoard(columnsData);
  initKanbanEvents();
  initSortButton();
}

export { initializeBoard };
