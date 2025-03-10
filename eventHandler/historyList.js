const openButton = document.getElementById("historyOpenButton");
const historyListLayer = document.getElementById("historyList-noEmpty");
const closedButton = document.getElementById("history__closedButton");
const deleteButton = document.getElementById("delete");
const cancleButton = document.getElementById("cancleButton");
const decideDeletButton = document.getElementById("decideDeleteButton");

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

// 삭제 알림창에서 취소 버튼 클릭 시 알림창 제거
function cancleDelete() {
  const overlay = document.getElementById("overlay-dark");
  const alert = document.getElementById("alert-box");
  overlay.style.display = "none";
  alert.style.display = "none";
}

// 삭제 알림창에서 삭제 버튼 클릭 시 recordHistory 제거 후 해당 위치에 빈 사용자 기록으로 변경
function decideDelete() {
  cancleDelete();
  // const recordHistory = document.getElementById("recordHistory");
  // const deleteBox = document.querySelector(".deleteBox");
  // let getRecords = recordHistory.children;
  // let recordList = recordHistory.parentElement;
  //  Array.from(getRecords).forEach((record) => {
  //    record.remove();
  //  });
  // recordHistory.remove();
  // deleteBox.remove();

  // 부모, 자식 관계로 접근
  const recordList = document.querySelector(".history__recordList");
  while (recordList.firstChild) {
    // 첫번째 자식요소가 존재하지 않을 때 까지 반복
    recordList.removeChild(recordList.firstChild);
  }

  recordList.innerHTML = `<div class="record-empty">사용자 활동 기록이 없습니다.</div>`;
}

// 이벤트 설정
openButton.addEventListener("click", openHistoryList);
closedButton.addEventListener("click", closeHistoryList);
deleteButton.addEventListener("click", confirmDeleteAlert);
cancleButton.addEventListener("click", cancleDelete);
decideDeletButton.addEventListener("click", decideDelete);
