import { fetchData } from './utils/fetch.js';
import {
  renderColumnsAndCards,
  initCardRemoveButton,
} from './components/cardColumn.js';
import { initHistoryButton, renderHistoryItems } from './components/history.js';
import { initSortButton } from './components/sort.js';

const DATA_URLS = {
  column: './data/columnData.json',
  history: './data/historyData.json',
};

async function handleColumnData() {
  const columnData = await fetchData(DATA_URLS.column);
  initSortButton(columnData);
  renderColumnsAndCards(columnData);
}

async function handleHistoryData() {
  const historyData = await fetchData(DATA_URLS.history);
  renderHistoryItems(historyData);
}

handleColumnData();
handleHistoryData();

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();
