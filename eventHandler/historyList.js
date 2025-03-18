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
function rocordListDeleteAlert() {
  const title = "모든 사용자 활동 기록을";

  const modal = document.querySelector(".DeleteConfirmationModal");

  const confirmLayer = createDeleteConfirmModal(title);
  modal.appendChild(confirmLayer);

  document.body.appendChild(modal);

  processRecordList();
}

function processRecordList() {
  const modal = document.querySelector(".deleteAlert");
  const cancelButton = modal.querySelector(".cancleButton");
  const deleteButton = modal.querySelector(".decideDeleteButton");

  cancelButton.addEventListener("click", () => {
    cancleDelete();
  });
  deleteButton.addEventListener("click", () => {
    decideDelete();
  });
}

export function createDeleteConfirmModal(title) {
  const confirmLayer = document.createElement("div");
  confirmLayer.classList.add("deleteAlert");
  confirmLayer.innerHTML = `<div id="overlay-dark"></div>
  <div class="confirm-box">
    <div class="confirmContent">
      <p>${title} 삭제할까요?</p>
      <div class="buttons">
        <button class="cancleButton">취소</button>
        <button class="decideDeleteButton">삭제</button>
      </div>
    </div>
  </div>`;
  return confirmLayer;
}

// 삭제 알림창에서 취소 버튼 클릭 시 알림창 제거
export function cancleDelete() {
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
  deleteButton.addEventListener("click", rocordListDeleteAlert);
}
