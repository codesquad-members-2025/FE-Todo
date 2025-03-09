import { makeCardRemover } from './cardColumn.js';

function showModal() {
  const dialog = document.getElementById('modal');
  dialog.showModal();
}

function closeModal() {
  const dialog = document.getElementById('modal');
  dialog.close();
}

function createConfirmModal(textContent, deleteCallback) {
  const dialog = document.getElementById('modal');
  const description = dialog.querySelector('#modal-description');
  description.textContent = textContent;

  // 삭제 버튼에 이벤트 추가
  dialog.querySelector('#delete-btn').addEventListener('click', () => {
    deleteCallback();
    closeModal();
  });
  //취소 버튼에 이벤트 추가
  dialog.querySelector('#cancel-btn').addEventListener('click', () => {
    closeModal();
  });
}

// 카드 삭제 모달 오픈
function openDeleteModal(event) {
  const button = event.target.closest('.delete-card-btn');
  if (!button) return;

  // 가장 가까운 .todo-list 안에 있는 .card-list 찾기
  const todoList = button.closest('.card-list');
  if (!todoList) return; // todo-list 내부에서만 동작하도록 제한

  const card = button.closest('.todo-card');
  if (card) {
    const cardRemover = makeCardRemover(card.id);
    createConfirmModal('선택한 카드를 삭제할까요?', cardRemover);
    showModal();
  }
}

export { showModal, openDeleteModal };
