import { columnsComponent } from "../components/columns_component";
import "../css/font/pretendard-subset.css";
import "../css/font/pretendard.css";
import "../css/font/pretendardvariable.css";
import "../css/global.css";
import "../css/reset.css";
import "../css/style.css";
import "../css/utility.css";

// 히스토리 모달 등장하거나 사라지는 구현
const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
const historyCloseBtn = document.querySelector(".history-modal__header-close");

// 히스토리 모달 열고 닫기
const openHistoryModal = () => {
  historyModal.style.cssText = `
    display: grid;
    animation: slideIn 0.5s forwards;
  `;
};

const closeHistoryModal = () => {
  historyModal.style.cssText += "animation: slideOut 0.5s forwards;";
  setTimeout(() => {
    historyModal.style.display = "none";
  }, 500);
};

historyOpenBtn.addEventListener("click", openHistoryModal);
historyCloseBtn.addEventListener("click", closeHistoryModal);

//

// 히스토리 삭제 모달 이벤트
const historyDeleteBtn = document.querySelector(".history-modal__footer-btn");
const historyDeleteModal = document.querySelector(".history-delete-modal");
const historyDeleteCancelBtn = document.querySelector("#cancel-delete-btn");
const historyDeleteApproveBtn = document.querySelector("#confirm-delete-btn");

historyDeleteModal.close();

// 모달 열고 닫기
const showModal = () => {
  historyDeleteModal.showModal();
};

const deleteModal = () => {
  historyDeleteModal.close();
};

historyDeleteBtn.addEventListener("click", showModal);
historyDeleteCancelBtn.addEventListener("click", deleteModal);

// 모든 사용자 기록 삭제
historyDeleteApproveBtn.addEventListener("click", () => {
  // 사용자 기록 삭제
  // 사용자 기록 삭제 후 모달 닫기
  historyDeleteModal.close();
});

//

// 칼럼 동적으로 생성하기
// 비동기로 mock.json 불러오기
const fetchMockData = async () => {
  const response = await fetch("./mock.json");
  const data = await response.json();
  return data;
};

const renderColumns = async () => {
  const data = await fetchMockData();
  console.log(data);

  // 불러온 데이터를 컴포넌트에 넣어서 렌더링
  const columnContainer = document.querySelector(".column-container");
  columnContainer.innerHTML += columnsComponent(data);
};

renderColumns();
