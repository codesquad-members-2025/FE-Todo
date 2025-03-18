import { fetchData } from '../shared/utils/fetch.js';

const COLUMN_DATA_URL = './data/columnData.json';

let columnData = null;

async function loadColumnsData() {
  if (columnData === null) {
    columnData = await fetchData(COLUMN_DATA_URL);
  }
  return columnData;
}

function addTask(columnId, taskData) {
  const targetColumn = columnData.find((column) => column.id === columnId);
  targetColumn.tasks.push(taskData);
}

function updateTask(updatedTask) {
  const targetColumn = columnData.find((column) =>
    column.tasks.some((task) => task.id === updatedTask.id)
  );

  const taskIndex = targetColumn.tasks.findIndex(
    (task) => task.id === updatedTask.id
  );

  if (taskIndex !== -1) {
    targetColumn.tasks[taskIndex] = {
      ...targetColumn.tasks[taskIndex],
      title: updatedTask.title,
      content: updatedTask.content,
    };
  }
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

export {
  loadColumnsData,
  addTask,
  removeTask,
  getSortedTasksByDate,
  updateTask,
};
