import { fetchData } from '../js/utils/fetch.js';

const COLUMN_DATA_URL = './data/columnData.json';

let columnData = null;

async function loadColumnsData() {
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
  targetColumn.tasks = targetColumn.tasks.filter((task) => task.id !== cardId);
}

// 정렬 함수 (order: 'created' | 'latest')
function getSortedCardsByDate(order = 'created') {
  return columnData.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort((a, b) => {
      return order === 'created'
        ? new Date(a.createdAt) - new Date(b.createdAt) // 생성순
        : new Date(b.createdAt) - new Date(a.createdAt); // 최신순
    }),
  }));
}

export { loadColumnsData, updateCard, removeCard, getSortedCardsByDate };
