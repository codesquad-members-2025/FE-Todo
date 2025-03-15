const openButton = document.getElementById("historyOpenButton");
const historyListLayer = document.getElementById("historyList-noEmpty");
const closedButton = document.getElementById("history__closedButton");
const deleteButton = document.getElementById("deleteButton");

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
  // 먼저 모달창을 추가할 요소를 찾아
  const modal = document.querySelector(".DeleteConfirmationModal");
  // 그 다음 그 요소 내에 html 내용을 추가해
  const confirmLayer = document.createElement("div");
  confirmLayer.classList.add("deleteAlert");
  confirmLayer.innerHTML = `<div id="overlay-dark"></div>
  <div class="confirm-box">
    <div class="confirmContent">
      <p>모든 사용자 활동 기록을 삭제할까요?</p>
      <div class="buttons">
        <button class="cancleButton">취소</button>
        <button class="decideDeleteButton">삭제</button>
      </div>
    </div>
  </div>`;
  modal.appendChild(confirmLayer);
  // 그 다음 화면에 뜨게끔 만들어
  document.body.appendChild(modal);
}

// 삭제 알림창에서 취소 버튼 클릭 시 알림창 제거
function cancleDelete() {
  document.querySelector(".deleteAlert").remove();
}

// 삭제 알림창에서 삭제 버튼 클릭 시 recordHistory 제거 후 해당 위치에 빈 사용자 기록으로 변경
function decideDelete() {
  cancleDelete();

  const recordList = document.querySelector(".history__recordList");
  recordList.innerHTML = `<div class="record-empty">사용자 활동 기록이 없습니다.</div>`;
}

// 이벤트 설정
export function historyEvent() {
  openButton.addEventListener("click", openHistoryList);
  closedButton.addEventListener("click", closeHistoryList);
  deleteButton.addEventListener("click", confirmDeleteAlert);
  document.addEventListener("click", (event) => {
    if (event.target.id === "historyOpenButton") return openHistoryList();
    if (event.target.className === "cancleButton") return cancleDelete();
    if (event.target.className === "decideDeleteButton") return decideDelete();
  });
}
