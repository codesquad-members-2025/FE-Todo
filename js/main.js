import {
  renderColumnsAndCards,
  initCardRemoveButton,
} from './components/cardColumn.js';
import { initHistoryButton, renderHistoryItems } from './components/history.js';
import { initSortButton } from './components/sort.js';

//Fetch columnDataa
async function fetchColumnData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const data = await response.json();
    handleColumnData(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleColumnData(data) {
  initSortButton(data);
  renderColumnsAndCards(data);
}

//Fetch historyData
async function fetchHistoryData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const data = await response.json();
    handleHistoryData(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleHistoryData(data) {
  renderHistoryItems(data);
}

fetchColumnData('./data/columnData.json');
fetchHistoryData('./data/historyData.json');

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();
