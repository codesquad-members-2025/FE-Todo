// import columnData from '../data/columnData.js';
import historyData from '../data/historyData.js';
import {
  renderColumnsAndCards,
  initCardRemoveButton,
} from './components/cardColumn.js';
import { initHistoryButton, renderHistoryItems } from './components/history.js';
import { initSortButton } from './components/sort.js';

//Fetch Mockdata
async function fetchColumnData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const data = await response.json();
    processColumnData(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function processColumnData(data) {
  initSortButton(data);
  renderColumnsAndCards(data);
}

fetchColumnData('./data/columnData.json');

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();

//history Items render
renderHistoryItems(historyData);
