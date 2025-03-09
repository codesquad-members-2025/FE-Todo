import columnData from '../data/columnData.js';
import { renderColumnsAndCards } from './utils/cardColumn.js';
import { toggleHistory } from './utils/history.js';
import { sortCards } from './utils/sort.js';
import { openDeleteModal } from './utils/modal.js';

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

//Card Remove Button
document.body.addEventListener('click', openDeleteModal);

//First render
renderColumnsAndCards(columnData);
