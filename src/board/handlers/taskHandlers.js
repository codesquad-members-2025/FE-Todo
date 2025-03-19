// src/board/handlers/taskHandlers.js
import { addTask, removeTask, updateTask } from '../store.js';
import { renderTask } from '../renderers/task.js';
import { setConfirmDialog } from '../../shared/components/dialog/index.js';
import {
  generateUUID,
  getISOStringNow,
  detectDeviceType,
} from '../../shared/utils/common.js';
import TaskEditor from '../renderers/taskEditor.js';

// 새 카드 생성
function createNewTask(target) {
  const column = getColumn(target);
  const taskForm = column && getTaskForm(column);
  const inputData = taskForm && collectInputData(taskForm);

  if (!inputData) return;

  closeTaskForm(taskForm);
  saveAndRenderTask(column.id, inputData);
  resetValues(taskForm);
}

function openDeleteTaskDialog(target) {
  const taskCard = target.closest('.task-item');
  setConfirmDialog('이 태스크를 삭제할까요?', makeTaskRemover(taskCard.id));
}

// 카드 제거 함수 반환 (고차함수)
function makeTaskRemover(taskId) {
  return () => {
    const targetTask = document.getElementById(taskId);
    const column = targetTask.closest('.kanban-column');
    const columnId = column.id;

    removeTask(columnId, taskId);
    targetTask.remove();
  };
}

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
  addTask(columnId, inputData);
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
