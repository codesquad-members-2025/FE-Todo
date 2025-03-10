const dialog = document.getElementById("delete-history__modal");
const openButton = document.getElementById("open-modal-button"); // 모달 열기 버튼
const closeButton = document.getElementById("cancel-button"); // 모달 닫기 버튼

// 모달 열기
openButton.addEventListener("click", () => {
  dialog.showModal(); // ✅ 다이얼로그 열기
});

// 모달 닫기
closeButton.addEventListener("click", () => {
  dialog.close(); // ✅ 다이얼로그 닫기
});

dialog.showModal();
