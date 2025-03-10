// 히스토리 모달 등장하거나 사라지는 구현
const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
const historyModalCloseBtn = document.querySelector(
  ".history-modal__header-close"
);

historyOpenBtn.addEventListener("click", () => {
  historyModal.style.display = "grid";
  historyModal.style.animation = "slideIn 0.5s forwards";
});
historyModalCloseBtn.addEventListener("click", () => {
  historyModal.style.animation = "slideOut 0.3s forwards";
  setTimeout(() => {
    historyModal.style.display = "none";
  }, 500);
});

//

// 히스토리 삭제 모달 이벤트
const historyDeleteBtn = document.querySelector(".history-modal__footer-btn");
const historyDeleteModal = document.querySelector(".history-delete-modal");
const historyDeleteModalCancelBtn =
  document.querySelector("#cancel-delete-btn");
const historyDeleteModalDeleteBtn = document.querySelector(
  "#confirm-delete-btn"
);

// 모달 열기
historyDeleteBtn.addEventListener("click", () => {
  historyDeleteModal.showModal();
});

// 모달 닫기
historyDeleteModalCancelBtn.addEventListener("click", () => {
  historyDeleteModal.close();
});

// 모든 사용자 기록 삭제
historyDeleteModalDeleteBtn.addEventListener("click", () => {
  // 사용자 기록 삭제
  // 사용자 기록 삭제 후 모달 닫기
  historyDeleteModal.close();
});
