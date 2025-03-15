import { createColumn, createTaskCard } from './template.js';
import { pushChild, unshiftChild } from '../utils/dom.js';
import { getISOStringNow, generateUUID } from '../utils/generalUtils.js';
import { openDeleteTaskDialog } from './dialog.js';
import {
  loadColumnsData,
  updateTask,
  removeTask,
  getSortedTasksByDate,
} from '../../store/column.js';

// ──────────────────────────────
//  1. 데이터 로딩 및 초기 렌더링
// ──────────────────────────────

// 전체 칼럼과 카드 렌더링
async function initColumnAndTask() {
  const columnsData = await loadColumnsData();

  renderColumns(columnsData);
  renderTasksForColumn(columnsData);

  initKanbanEvents();
  initSortButton();
}

// 전체 칼럼 생성
function renderColumns(columnsData) {
  const columnContainer = document.querySelector('#kanban-board');

  const columnsHtml = columnsData.reduce(
    (columnsHtml, { id, title, taskCount }) =>
      (columnsHtml += createColumn(id, title, taskCount)),
    ''
  );

  pushChild(columnContainer, columnsHtml);
}

// 칼럼에 카드 생성
function renderTasksForColumn(columnsData) {
  columnsData.forEach(({ id, tasks }) => {
    const columnTaskList = document.querySelector(`#${id} .task-container`);

    const taskItemsHtml = tasks.reduce(
      (tasksHtml, { id, title, content, author }) =>
        (tasksHtml += createTaskCard(id, title, content, author)),
      ''
    );

    pushChild(columnTaskList, taskItemsHtml);
  });
}

// 칼럼에 카드 하나 생성
function renderTask(columnId, taskData) {
  const { id, title, content, author } = taskData;
  const column = document.querySelector(`#${columnId} .task-container`);
  const taskCardHtml = createTaskCard(id, title, content, author);

  if (isSortCreated()) {
    pushChild(column, taskCardHtml);
  } else {
    unshiftChild(column, taskCardHtml);
  }
}

// 생성순 정렬 여부 반환
function isSortCreated() {
  const sortButtonLabel = document.querySelector('#task-sort-btn').dataset.type;
  return sortButtonLabel === 'created';
}

// ──────────────────────────────
//  2. 카드 추가 및 삭제
// ──────────────────────────────

// 새 카드 생성
function createNewTask(target) {
  const column = getColumn(target);
  if (!column) return;

  const taskForm = getTaskForm(column);
  if (!taskForm) return;

  const inputData = collectInputData(taskForm);
  if (!inputData) return;

  closeTaskForm(taskForm);
  saveAndRenderTask(column.id, inputData);
  resetValues(taskForm);
}

// 카드 데이터 저장 & UI 업데이트
function saveAndRenderTask(columnId, inputData) {
  updateTask(columnId, inputData);
  renderTask(columnId, inputData);
}

// 입력 값 초기화
function resetValues(taskForm) {
  taskForm.querySelector('input').value = '';
  taskForm.querySelector('textarea').value = '';
}

// 카드 제거 함수 반환 (고차함수)
function makeTaskRemover(taskId) {
  return () => {
    const targetTask = document.getElementById(taskId);
    const column = targetTask.closest('.kanban-column');
    const columnId = column.id;

    removeTask(columnId, taskId); // 데이터 제거
    targetTask.remove(); // UI 제거
  };
}

// 각 칼럼의 카드 전부 제거
function clearTasks() {
  document.querySelectorAll('.kanban-column').forEach(clearTasksOfColumn);
}

// 특정 칼럼의 카드 제거
function clearTasksOfColumn(columnElement) {
  const columnTaskList = columnElement.querySelector('.task-container');
  if (columnTaskList) {
    columnTaskList.innerHTML = '';
  }
}

// ──────────────────────────────
//  3. 카드 정렬 기능
// ──────────────────────────────

// 정렬 버튼 클릭 이벤트
async function sortTasks({ currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonLabel = sortButton.querySelector('.task-sort__label');
  const currentSortType = sortButton.dataset.type;

  const { newSortType, buttonText } = toggleSortType(currentSortType);

  updateSortButtonUI(sortButton, sortButtonLabel, newSortType, buttonText);
  applySortedTasks(newSortType);
}

// 정렬 타입 변경
function toggleSortType(currentSortType) {
  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';
  return { newSortType, buttonText };
}

// 버튼 UI 업데이트
function updateSortButtonUI(button, label, newSortType, buttonText) {
  button.dataset.type = newSortType;
  label.textContent = buttonText;
}

// 정렬 후 UI 반영
function applySortedTasks(sortType) {
  const sortedData = getSortedTasksByDate(sortType);
  clearTasks();
  renderTasksForColumn(sortedData);
}

// ──────────────────────────────
//  4. 이벤트 핸들링
// ──────────────────────────────

// Kanban 이벤트 위임
function initKanbanEvents() {
  const columnSection = document.getElementById('kanban-board');

  const clickHandlers = new Map([
    ['.task-add-btn', toggleTaskForm],
    ['.task-delete-btn', openDeleteTaskDialog],
    ['.task-cancel-btn', toggleTaskForm],
    ['.task-save-btn', createNewTask],
  ]);

  columnSection.addEventListener('click', ({ target }) => {
    const closestBtn = target.closest('button');
    if (closestBtn === null) return;

    for (const [selector, handler] of clickHandlers) {
      if (closestBtn.matches(selector)) {
        handler(closestBtn);
        break;
      }
    }
  });
}

// Sort Button 이벤트 초기화
function initSortButton() {
  const sortButton = document.getElementById('task-sort-btn');
  sortButton.addEventListener('click', sortTasks);
}

// ──────────────────────────────
//  5. 카드 폼 관련 기능
// ──────────────────────────────

// 카드 폼 토글
function toggleTaskForm(target) {
  const column = getColumn(target);
  const taskForm = getTaskForm(column);
  if (!taskForm) return;

  const isVisible = window.getComputedStyle(taskForm).display === 'flex';
  taskForm.style.display = isVisible ? 'none' : 'flex';
}

// 칼럼 요소 가져오기
function getColumn(target) {
  return target.closest('.kanban-column');
}

// 카드 폼 가져오기
function getTaskForm(column) {
  return column?.querySelector('.task-form') || null;
}

// 입력 데이터 수집 및 검증
function collectInputData(taskForm) {
  const input = taskForm.querySelector('input');
  const textarea = taskForm.querySelector('textarea');

  const title = input?.value;
  const content = textarea?.value;

  if (!title || !content) return null; // 입력값이 없으면 null 반환

  return {
    id: generateUUID(),
    createdAt: getISOStringNow(),
    author: detectDeviceType(),
    title,
    content,
  };
}

// 디바이스 감지
function detectDeviceType() {
  return navigator.maxTouchPoints > 0 ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? 'mobile'
    : 'web';
}

// 입력 폼 닫기
function closeTaskForm(taskForm) {
  taskForm.style.display = 'none';
}

export { clearTasks, makeTaskRemover, initColumnAndTask };
