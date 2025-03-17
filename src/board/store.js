import { fetchData } from '../shared/utils/fetch.js';

const COLUMN_DATA_URL = './data/columnData.json';

let columnData = null;

async function loadColumnsData() {
  if (columnData === null) {
    columnData = await fetchData(COLUMN_DATA_URL);
  }
  return columnData;
}

function updateTask(columnId, taskData) {
  const targetColumn = columnData.find((column) => column.id === columnId);
  targetColumn.tasks.push(taskData);
}

function removeTask(columnId, taskId) {
  const targetColumn = columnData.find((column) => column.id === columnId);
  targetColumn.tasks = targetColumn.tasks.filter((task) => task.id !== taskId);
}

// 정렬 함수 (order: 'created' | 'latest')
function getSortedTasksByDate(order = 'created') {
  return columnData.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort((a, b) => {
      return order === 'created'
        ? new Date(a.createdAt) - new Date(b.createdAt) // 생성순
        : new Date(b.createdAt) - new Date(a.createdAt); // 최신순
    }),
  }));
}

export { loadColumnsData, updateTask, removeTask, getSortedTasksByDate };
