const openButton = document.getElementById("historyOpenButton");
const historyListLayer = document.getElementById("historyList-empty");
const closedButton = document.getElementById("history__closedButton");

// 히스토리 리스트 열기
function openHistoryList() {
  historyListLayer.classList.add("active");
}

// 히스토리 리스트 닫기
function closeHistoryList() {
  historyListLayer.classList.remove("active");
}

// 이벤트 설정
openButton.addEventListener("click", openHistoryList);
closedButton.addEventListener("click", closeHistoryList);
