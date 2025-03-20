import { renderBoard } from './renderers/column.js';
import { initKanbanEvents, initSortButton } from './handlers/eventHandlers.js';
import { fetchAndStoreColumnData, getColumnsData } from './store.js';

// 보드 초기화
async function initializeBoard() {
  await fetchAndStoreColumnData();
  const columnsData = getColumnsData();

  renderBoard(columnsData);
  initKanbanEvents();
  initSortButton();
}

export { initializeBoard };
