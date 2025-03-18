// src/board/handlers/taskHandlers.js
import { addTask, removeTask, updateTask } from '../store.js';
import { renderTask } from '../renderers/task.js';
import { setConfirmDialog } from '../../shared/components/dialog/index.js';
import {
  generateUUID,
  getISOStringNow,
  detectDeviceType,
} from '../../shared/utils/common.js';
import { createEditForm } from '../renderers/template.js';

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
  const input = taskForm.querySelector('input');
  const textarea = taskForm.querySelector('textarea');

  const title = input?.value;
  const content = textarea?.value;

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

class TaskEditor {
  constructor(taskCard) {
    this.taskCard = taskCard;
    this.originalTaskCard = taskCard.cloneNode(true);
    this.editForm = this.createEditForm();
  }

  createEditForm() {
    const title = this.taskCard.querySelector('.task-title').textContent;
    const content = this.taskCard.querySelector('.task-content').textContent;
    const editFormElement = createEditForm(title, content);

    this.attachFormEvents(editFormElement);

    return editFormElement;
  }

  attachFormEvents(editFormElement) {
    editFormElement
      .querySelector('.task-cancel-btn')
      .addEventListener('click', () => {
        this.restoreOriginalTask();
      });

    editFormElement
      .querySelector('.task-save-btn')
      .addEventListener('click', () => {
        this.saveEdit();
      });
  }

  restoreOriginalTask() {
    this.editForm.replaceWith(this.originalTaskCard);
  }

  saveEdit() {
    const editedTitle = this.editForm.querySelector('input').value;
    const editedContent = this.editForm.querySelector('textarea').value;

    this.originalTaskCard.querySelector('.task-title').textContent =
      editedTitle;
    this.originalTaskCard.querySelector('.task-content').textContent =
      editedContent;

    updateTask({
      id: this.originalTaskCard.id,
      title: editedTitle,
      content: editedContent,
    });

    this.restoreOriginalTask();
  }

  showEditForm() {
    this.taskCard.replaceWith(this.editForm);
  }
}

export {
  toggleTaskForm,
  openDeleteTaskDialog,
  createNewTask,
  toggleModifyFrom,
};
