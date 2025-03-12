import { fetchData } from '../js/utils/fetch.js';

const COLUMN_DATA_URL = './data/columnData.json';

let columnData = null;

async function loadColumnData() {
  if (columnData === null) {
    columnData = await fetchData(COLUMN_DATA_URL);
  }
  return columnData;
}

function updateCard(columnId, cardData) {
  const targetColumn = columnData.find((column) => column.id === columnId);
  targetColumn.tasks.push(cardData);
}

function removeCard(columnId, cardId) {
  const targetColumn = columnData.find((column) => column.id === columnId);
  const index = targetColumn.tasks.findIndex((item) => item.id === cardId);

  if (index !== -1) targetColumn.tasks.splice(index, 1);
}

export { loadColumnData, updateCard, removeCard };
