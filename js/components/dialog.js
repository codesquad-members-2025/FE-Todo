import { makeCardRemover } from './cardColumn.js';
import { removeActivityRecords } from './activity.js';

// ──────────────────────────────
// 1. 캐싱된 DOM 요소
// ──────────────────────────────
const dialog = document.getElementById('confirm-dialog');
const dialogMessage = dialog.querySelector('#confirm-dialog__message');
const dialogCancelBtn = dialog.querySelector('#confirm-dialog__cancel-btn');
const dialogDeleteBtn = dialog.querySelector('#confirm-dialog__confirm-btn');
// ──────────────────────────────
// 2. Modal Toggle 기능
// ──────────────────────────────

// 모달 열기
function openDialog() {
  dialog.showModal();
}

// 모달 닫기
function closeDialog() {
  dialog.close();
}

function setConfirmDialog(textContent, deleteCallback) {
  dialogMessage.textContent = textContent;
  setDeleteButtonHandler(deleteCallback);
  openDialog();
}

// 삭제 버튼 핸들링 : onclick이 기존 함수를 자동으로 덮어씌워줌
function setDeleteButtonHandler(deleteCallback) {
  dialogDeleteBtn.onclick = () => {
    deleteCallback();
    closeDialog();
  };
}

// ──────────────────────────────
// 2. 삭제 모달 핸들링
// ──────────────────────────────

// 카드 삭제 모달 오픈
function openDeleteCardDialog(target) {
  const todoCard = target.closest('.todo-card');
  if (!todoCard) return; // 카드가 없으면 종료

  const cardId = todoCard.id;
  if (!cardId) return;

  const cardRemover = makeCardRemover(cardId);
  setConfirmDialog('선택한 카드를 삭제할까요?', cardRemover);
  openDialog();
}

// 활동기록 삭제 모달 오픈
function openActivityDeleteDialog() {
  setConfirmDialog(
    '모든 사용자 활동 기록을 삭제할까요?',
    removeActivityRecords
  );
  openDialog();
}

// ──────────────────────────────
// 🟢 4. 모달 초기화(취소 버튼만)
//  TODO 삭제버튼이 동적으로 생성되기 때문에, 취소버튼을 따로 뺐으나 더 좋은 방법이 있을지 찾아보기
// ──────────────────────────────

function initDialogCloseEvent() {
  dialogCancelBtn.addEventListener('click', closeDialog);
}

initDialogCloseEvent();

export { openDeleteCardDialog, openActivityDeleteDialog };
