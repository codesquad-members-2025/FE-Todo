import {
  openDialog,
  closeDialog,
  setDialogMessage,
  setDeleteButtonHandler,
  dialogCancelBtn,
} from './renderer.js';

// 다이얼로그 초기화
function initDialog() {
  dialogCancelBtn.addEventListener('click', closeDialog);
}

// 공개 API: 확인 다이얼로그 설정
function setConfirmDialog(message, deleteCallback) {
  setDialogMessage(message);
  setDeleteButtonHandler(deleteCallback);
  openDialog();
}

// 초기화 실행
initDialog();

export { setConfirmDialog };
