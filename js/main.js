import { fetchData } from './utils/fetch.js';
import {
  renderColumnsAndCards,
  initCardRemoveButton,
} from './components/cardColumn.js';
import { initHistoryButton, renderHistoryItems } from './components/history.js';
import { initSortButton } from './components/sort.js';

async function handleColumnData() {
  const columnData = await fetchData('./data/columnData.json');
  initSortButton(columnData);
  renderColumnsAndCards(columnData);
}

async function handleHistoryData() {
  const historyData = await fetchData('./data/historyData.json');
  renderHistoryItems(historyData);
}

handleColumnData();
handleHistoryData();

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();
