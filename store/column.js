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

export { loadColumnData, updateCard };
