const historyIcon = document.querySelector(".header__history-icon");
const historyContainer = document.querySelector(".history-modal-container");

historyIcon.addEventListener("click", () => {
  //
});

//

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.querySelector(".history-modal__footer-button");
  const modal = document.getElementById("delete-confirm-modal");
  const cancelDelete = document.getElementById("cancel-delete");
  const confirmDelete = document.getElementById("confirm-delete");

  // 삭제 버튼 클릭 시 모달 열기
  deleteButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 취소 버튼 클릭 시 모달 닫기
  cancelDelete.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 삭제 버튼 클릭 시 기록 삭제 (예제: 콘솔 출력 후 모달 닫기)
  confirmDelete.addEventListener("click", () => {
    console.log("사용자 활동 기록 삭제됨");
    modal.classList.add("hidden");
  });
});
