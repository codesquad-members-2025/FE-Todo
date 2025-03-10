import columnData from '../data/columnData.js';
import historyData from '../data/historyData.js';
import {
  renderColumnsAndCards,
  initCardRemoveButton,
} from './components/cardColumn.js';
import { initHistoryButton, renderHistoryItems } from './components/history.js';
import { initSortButton } from './components/sort.js';

//Sort Button
initSortButton(columnData);

//History Button
initHistoryButton();

//Card Remove Button
initCardRemoveButton();

//First render
renderColumnsAndCards(columnData);

//history Items render
renderHistoryItems(historyData);
