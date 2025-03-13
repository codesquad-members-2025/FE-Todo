import { makeCardRemover } from './cardColumn.js';
import { removeHistoryRecords } from './history.js';

// ──────────────────────────────
// 1. 캐싱된 DOM 요소
// ──────────────────────────────
const modal = document.getElementById('modal');
const modalDescription = modal.querySelector('#modal-description');
const modalDeleteBtn = modal.querySelector('#modal-delete-btn');
const modalCancelBtn = modal.querySelector('#modal-cancel-btn');

// ──────────────────────────────
// 2. Modal Toggle 기능
// ──────────────────────────────

// 모달 열기
function openModal() {
  modal.showModal();
}

// 모달 닫기
function closeModal() {
  modal.close();
}

function setConfirmModal(textContent, deleteCallback) {
  modalDescription.textContent = textContent;
  setDeleteButtonHandler(deleteCallback);
  openModal();
}

// 삭제 버튼 핸들링 : onclick이 기존 함수를 자동으로 덮어씌워줌
function setDeleteButtonHandler(deleteCallback) {
  modalDeleteBtn.onclick = () => {
    deleteCallback();
    closeModal();
  };
}

// ──────────────────────────────
// 2. 삭제 모달 핸들링
// ──────────────────────────────

// 카드 삭제 모달 오픈
function openDeleteCardModal(target) {
  const todoCard = target.closest('.todo-card');
  if (!todoCard) return; // 카드가 없으면 종료

  const cardId = todoCard.id;
  if (!cardId) return;

  const cardRemover = makeCardRemover(cardId);
  setConfirmModal('선택한 카드를 삭제할까요?', cardRemover);
  openModal();
}

// 활동기록 삭제 모달 오픈
function openHistoryDeleteModal() {
  setConfirmModal('모든 사용자 활동 기록을 삭제할까요?', removeHistoryRecords);
  openModal();
}

// ──────────────────────────────
// 🟢 4. 모달 초기화(취소 버튼만)
//  TODO 삭제버튼이 동적으로 생성되기 때문에, 취소버튼을 따로 뺐으나 더 좋은 방법이 있을지 찾아보기
// ──────────────────────────────

function initModalCloseEvent() {
  modalCancelBtn.addEventListener('click', closeModal);
}

initModalCloseEvent();

export { openDeleteCardModal, openHistoryDeleteModal };
