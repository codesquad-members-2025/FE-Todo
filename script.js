// 히스토리 모달 등장하거나 사라지는 구현
const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
const historyModalCloseBtn = document.querySelector(
  ".history-modal__header-close"
);

const handleHistoryBtnClick = (event) => {
  historyModal.style.display = "grid";
  historyModal.style.animation = "slideIn 0.5s forwards";
};

const handleHistoryModalCloseBtnClick = (event) => {
  historyModal.style.animation = "slideOut 0.3s forwards";
  setTimeout(() => {
    historyModal.style.display = "none";
  }, 500);
};

historyOpenBtn.addEventListener("click", handleHistoryBtnClick);
historyModalCloseBtn.addEventListener("click", handleHistoryModalCloseBtnClick);
