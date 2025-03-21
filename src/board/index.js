import { renderBoard } from './renderers/column.js';
import { initKanbanEvents, initSortButton } from './handlers/eventHandlers.js';
import columnStore from './store.js';

// 보드 초기화
async function initializeBoard() {
  await columnStore.fetchAndStoreColumnData();
  const columnsData = columnStore.getColumnsData();

  renderBoard(columnsData);
  initKanbanEvents();
  initSortButton();
}

export { initializeBoard };
