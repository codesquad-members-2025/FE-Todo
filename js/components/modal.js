import { makeCardRemover } from './cardColumn.js';
import { removeHistoryRecords } from './history.js';

function toggleModal() {
  const dialog = document.getElementById('modal');
  dialog.open ? dialog.close() : dialog.showModal();
}

function createConfirmModal(textContent, deleteCallback) {
  const dialog = document.getElementById('modal');
  const description = dialog.querySelector('#modal-description');
  description.textContent = textContent;

  const deleteBtn = dialog.querySelector('#modal-delete-btn');

  // 기존 삭제 버튼 이벤트 제거
  if (deleteBtn._deleteHandler) {
    deleteBtn.removeEventListener('click', deleteBtn._deleteHandler);
  }

  // 새로운 삭제 이벤트 핸들러 등록
  deleteBtn._deleteHandler = () => {
    deleteCallback();
    toggleModal();
  };

  deleteBtn.addEventListener('click', deleteBtn._deleteHandler);
}

// 카드 삭제 모달 오픈
function openCardDeleteModal(event) {
  const button = event.target.closest('.delete-card-btn');
  if (!button) return;

  // 가장 가까운 .todo-list 안에 있는 .card-container 찾기
  const todoList = button.closest('.card-container');
  if (!todoList) return; // todo-list 내부에서만 동작하도록 제한

  const card = button.closest('.todo-card');
  if (card) {
    const cardRemover = makeCardRemover(card.id);
    createConfirmModal('선택한 카드를 삭제할까요?', cardRemover);
    toggleModal();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cancelBtn = document.querySelector('#modal-cancel-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', toggleModal);
});

// 활동기록 삭제 모달 오픈
function openHistoryDeleteModal() {
  createConfirmModal(
    '모든 사용자 활동 기록을 삭제할까요?',
    removeHistoryRecords
  );
  toggleModal();
}

export { openCardDeleteModal, openHistoryDeleteModal };
