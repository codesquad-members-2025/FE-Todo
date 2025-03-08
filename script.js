// 히스토리 모달 등장하거나 사라지는 구현
const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
const historyModalCloseBtn = document.querySelector(
  ".history-modal__header-close"
);

const handleHistoryBtnClick = (event) => {
  historyModal.style.display = "grid";
};

const handleHistoryModalCloseBtnClick = (event) => {
  historyModal.style.display = "none";
};

historyOpenBtn.addEventListener("click", handleHistoryBtnClick);
historyModalCloseBtn.addEventListener("click", handleHistoryModalCloseBtnClick);
