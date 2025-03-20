// src/board/handlers/taskHandlers.js
import columnStore from '../store.js';
import activityStore from '../../activity/store.js';
import { renderTask } from '../renderers/task.js';
import { renderActivityRecords } from '../../activity/renderer.js';
import { setConfirmDialog } from '../../shared/components/dialog/index.js';
import {
  generateUUID,
  getISOStringNow,
  detectDeviceType,
  getTimeAgo,
} from '../../shared/utils/common.js';
import TaskEditor from '../renderers/taskEditor.js';

// 새 카드 생성
function createNewTask(target) {
  const column = getColumnElement(target);
  const taskForm = column && getTaskForm(column);
  const inputData = taskForm && collectInputData(taskForm);

  if (!inputData) return;

  const { title, createdAt } = inputData;
  const columnId = column.id;
  const columnTitle = columnStore.getColumnTitle(columnId);

  closeTaskForm(taskForm);
  saveAndRenderTask(columnId, inputData);
  resetValues(taskForm);

  activityStore.addActivity({
    action: 'add',
    task: title,
    timeStamp: createdAt,
    details: { column: columnTitle },
  });

  const activityData = activityStore.getActivityData();
  renderActivityRecords(activityData);
}

function openDeleteTaskDialog(target) {
  const taskCard = target.closest('.task-item');
  const taskTitle = taskCard.querySelector('.task-title').innerText;
  const columnTitle = columnStore.getColumnTitle(getColumnElement(taskCard).id);

  setConfirmDialog('선택한 카드를 삭제할까요?', () => {
    makeTaskRemover(taskCard.id)();

    activityStore.addActivity({
      action: 'remove',
      task: taskTitle,
      timeStamp: getISOStringNow(),
      details: { column: columnTitle },
    });

    const activityData = activityStore.getActivityData();
    renderActivityRecords(activityData);
  });
}

// 카드 제거 함수 반환 (고차함수)
function makeTaskRemover(taskId) {
  return () => {
    const targetTask = document.getElementById(taskId);
    const column = getColumnElement(targetTask);
    const columnId = column.id;

    columnStore.removeTask(columnId, taskId);
    targetTask.remove();
  };
}

// 카드 폼 토글
function toggleTaskForm(target) {
  const column = getColumnElement(target);
  const taskForm = getTaskForm(column);
  if (!taskForm) return;

  const isVisible = window.getComputedStyle(taskForm).display === 'flex';
  taskForm.style.display = isVisible ? 'none' : 'flex';
}

// 칼럼 요소 가져오기
function getColumnElement(target) {
  return target.closest('.kanban-column');
}

// 카드 폼 가져오기
function getTaskForm(column) {
  return column?.querySelector('.task-form') || null;
}

// 입력 데이터 수집 및 검증
function collectInputData(taskForm) {
  const { value: title } = taskForm.querySelector('input') || {};
  const { value: content } = taskForm.querySelector('textarea') || {};

  if (!title || !content) return null;

  return {
    id: generateUUID(),
    createdAt: getISOStringNow(),
    author: detectDeviceType(),
    title,
    content,
  };
}

// 카드 데이터 저장 & UI 업데이트
function saveAndRenderTask(columnId, inputData) {
  columnStore.addTask(columnId, inputData);
  renderTask(columnId, inputData);
}

// 입력 값 초기화
function resetValues(taskForm) {
  taskForm.querySelector('input').value = '';
  taskForm.querySelector('textarea').value = '';
}

// 입력 폼 닫기
function closeTaskForm(taskForm) {
  taskForm.style.display = 'none';
}

// 수정 폼 열기
function toggleModifyFrom(target) {
  const targetCard = target.closest('.task-item');
  const editor = new TaskEditor(targetCard);
  editor.showEditForm();
}

export {
  toggleTaskForm,
  openDeleteTaskDialog,
  createNewTask,
  toggleModifyFrom,
};
