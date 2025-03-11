// 히스토리 모달 등장하거나 사라지는 구현
const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
const historyCloseBtn = document.querySelector(".history-modal__header-close");

// 히스토리 모달 열고 닫기
const openHistoryModal = () => {
  historyModal.style.cssText = `
    display: grid;
    animation: slideIn 0.5s forwards;
  `;
};

const closeHistoryModal = () => {
  historyModal.style.cssText += "animation: slideOut 0.5s forwards;";
  setTimeout(() => {
    historyModal.style.display = "none";
  }, 500);
};

historyOpenBtn.addEventListener("click", openHistoryModal);
historyCloseBtn.addEventListener("click", closeHistoryModal);

//

// 히스토리 삭제 모달 이벤트
const historyDeleteBtn = document.querySelector(".history-modal__footer-btn");
const historyDeleteModal = document.querySelector(".history-delete-modal");
const historyDeleteCancelBtn = document.querySelector("#cancel-delete-btn");
const historyDeleteApproveBtn = document.querySelector("#confirm-delete-btn");

historyDeleteModal.close();

// 모달 열고 닫기
const showModal = () => {
  historyDeleteModal.showModal();
};

const deleteModal = () => {
  historyDeleteModal.close();
};

historyDeleteBtn.addEventListener("click", showModal);
historyDeleteCancelBtn.addEventListener("click", deleteModal);

// 모든 사용자 기록 삭제
historyDeleteApproveBtn.addEventListener("click", () => {
  // 사용자 기록 삭제
  // 사용자 기록 삭제 후 모달 닫기
  historyDeleteModal.close();
});
