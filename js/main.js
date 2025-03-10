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

async function handleData() {
  try {
    const [columnData, historyData] = await Promise.all([
      fetchData(DATA_URLS.column),
      fetchData(DATA_URLS.history),
    ]);

    if (columnData) {
      initSortButton(columnData);
      renderColumnsAndCards(columnData);
    }

    if (historyData) {
      renderHistoryItems(historyData);
    }
  } catch (error) {
    console.error('데이터 로드 중 오류 발생:', error);
  }
}

handleData();

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();
