import { fetchData } from '../shared/utils/fetch.js';
import { DATA_URLS } from '../shared/constants/constants.js';

class ColumnStore {
  constructor() {
    this.columnData = null;
  }

  async fetchAndStoreColumnData() {
    this.columnData = await fetchData(DATA_URLS.COLUMN);
  }

  getColumnsData() {
    return this.columnData;
  }

  addTask(columnId, taskData) {
    const targetColumn = this.columnData.find(
      (column) => column.id === columnId
    );
    targetColumn.tasks.push(taskData);
  }

  updateTask(updatedTask) {
    const targetColumn = this.columnData.find((column) =>
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

  removeTask(columnId, taskId) {
    const targetColumn = this.columnData.find(
      (column) => column.id === columnId
    );
    targetColumn.tasks = targetColumn.tasks.filter(
      (task) => task.id !== taskId
    );
  }

  getColumnTitle(columnId) {
    const targetColumn = this.columnData.find(
      (column) => column.id === columnId
    );
    return targetColumn.title;
  }

  // 정렬 함수 (order: 'created' | 'latest')
  getSortedTasksByDate(order = 'created') {
    return this.columnData.map((column) => ({
      ...column,
      tasks: [...column.tasks].sort((a, b) => {
        return order === 'created'
          ? new Date(a.createdAt) - new Date(b.createdAt) // 생성순
          : new Date(b.createdAt) - new Date(a.createdAt); // 최신순
      }),
    }));
  }
}

const columnStore = new ColumnStore();

export default columnStore;
