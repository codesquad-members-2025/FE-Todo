import columnData from '../data/columnData.js';
import historyData from '../data/historyData.js';
import { renderColumnsAndCards } from './components/cardColumn.js';
import { toggleHistory, renderHistoryItems } from './components/history.js';
import { sortCards } from './components/sort.js';
import {
  openCardDeleteModal,
  openHistoryDeleteModal,
} from './components/modal.js';

//Sort Button
const sortButton = document.getElementById('sort-btn');
sortButton.addEventListener('click', (event) => {
  sortCards(columnData, event);
});

//History Button
const historyButton = document.getElementById('history-open-btn');
historyButton.addEventListener('click', toggleHistory);

const historyCloseButton = document.getElementById('history-close-btn');
historyCloseButton.addEventListener('click', toggleHistory);

const historyDeleteButton = document.getElementById('history-delete-btn');
historyDeleteButton.addEventListener('click', openHistoryDeleteModal);

//Card Remove Button
const columnSection = document.getElementById('columns-container');
columnSection.addEventListener('click', openCardDeleteModal);

//First render
renderColumnsAndCards(columnData);

//history Items render
renderHistoryItems(historyData);
