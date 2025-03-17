// 캐싱된 DOM 요소
const dialog = document.getElementById('confirm-dialog');
const dialogMessage = dialog.querySelector('#confirm-dialog__message');
const dialogCancelBtn = dialog.querySelector('#confirm-dialog__cancel-btn');
const dialogDeleteBtn = dialog.querySelector('#confirm-dialog__confirm-btn');

// 모달 열기
function openDialog() {
  dialog.showModal();
}

// 모달 닫기
function closeDialog() {
  dialog.close();
}

// UI 설정
function setDialogMessage(message) {
  dialogMessage.textContent = message;
}

// 버튼 핸들러 설정
function setDeleteButtonHandler(deleteCallback) {
  dialogDeleteBtn.onclick = () => {
    deleteCallback();
    closeDialog();
  };
}

export {
  openDialog,
  closeDialog,
  setDialogMessage,
  setDeleteButtonHandler,
  dialogCancelBtn,
};
