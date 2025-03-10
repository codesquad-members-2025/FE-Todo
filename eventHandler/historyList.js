const openButton = document.getElementById("historyOpenButton");
const historyListLayer = document.getElementById("historyList-noEmpty");
const closedButton = document.getElementById("history__closedButton");
const deleteButton = document.getElementById("delete");

// 히스토리 리스트 열기
function openHistoryList() {
  historyListLayer.classList.add("active");
}

// 히스토리 리스트 닫기
function closeHistoryList() {
  historyListLayer.classList.remove("active");
}

// 히스토리 리스트 삭제 알림창 띄우기
function confirmDeleteAlert() {
  const overlay = document.getElementById("overlay-dark");
  const alert = document.getElementById("alert-box");
  overlay.style.display = "block";
  alert.style.display = "block";
}
// 이벤트 설정
openButton.addEventListener("click", openHistoryList);
closedButton.addEventListener("click", closeHistoryList);
deleteButton.addEventListener("click", confirmDeleteAlert);
