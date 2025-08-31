// src/board/handlers/sortHandlers.js
import columnStore from '../store.js';
import { renderTasksInColumn, clearTasks } from '../renderers/task.js';

// 정렬 버튼 클릭 이벤트
function sortTasks({ currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonLabel = sortButton.querySelector('.task-sort__label');
  const currentSortType = sortButton.dataset.type;

  const { newSortType, buttonText } = toggleSortType(currentSortType);

  updateSortButtonUI({
    button: sortButton,
    label: sortButtonLabel,
    newSortType,
    buttonText,
  });

  applySortedTasks(newSortType);
}

// 정렬 타입 변경
function toggleSortType(currentSortType) {
  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';
  return { newSortType, buttonText };
}

// 버튼 UI 업데이트
function updateSortButtonUI({ button, label, newSortType, buttonText }) {
  button.dataset.type = newSortType;
  label.textContent = buttonText;
}

// 정렬 후 UI 반영
function applySortedTasks(sortType) {
  const sortedData = columnStore.getSortedTasksByDate(sortType);
  clearTasks();
  renderTasksInColumn(sortedData);
}

export { sortTasks };
