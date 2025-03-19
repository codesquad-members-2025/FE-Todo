import { columnsComponent } from "./components/columns_component";
import { fetchMockData } from "./data";

import "pretendard/dist/web/static/pretendard.css"; // 폰트 CSS 불러오기
import "./css/global.css";
import "./css/reset.css";
import "./css/utility.css";
import "./css/style.css";

// 데이터 불러오기
const data = await fetchMockData();

// 칼럼 동적으로 생성하기
// 칼럼, 카드 랜더링
const renderColumns = (data) => {
  // 불러온 데이터를 컴포넌트에 넣어서 렌더링
  const columnContainer = document.querySelector(".column-container");
  columnContainer.innerHTML += columnsComponent(data);
};

renderColumns(data);

console.log(data);

//

// 히스토리 모달 등장하거나 사라지는 구현
// const historyOpenBtn = document.querySelector(".header__history-icon");
const historyModal = document.querySelector(".history-modal-container");
// const historyCloseBtn = document.querySelector(".history-modal__header-close");

// 히스토리 모달 열고 닫기
const openHistoryModal = () => {
  historyModal.style.cssText = `
    display: grid;
    animation: slideIn 0.5s forwards;
  `;
};

const closeHistoryModal = () => {
  historyModal.style.cssText += "animation: slideOut 0.5s forwards;";
};

//

// 히스토리 삭제 모달 이벤트
// const historyDeleteBtn = document.querySelector(".history-modal__footer-btn");
const historyDeleteModal = document.querySelector(".history-delete-modal");
// const historyDeleteCancelBtn = document.querySelector("#cancel-delete-btn");
const historyDeleteApproveBtn = document.querySelector(".confirm-delete-btn");

// 모달 열고 닫기
const showModal = () => {
  historyDeleteModal.showModal();
};

const deleteModal = () => {
  historyDeleteModal.close();
};

//

// 카드 생성
const createCardBtn = document.querySelector(".create-card-btn");
const deleteColumnBtn = document.querySelector("#delete-column-btn");

const cardInputTitle = document.querySelector(".card-input-title");
const cardInputDescription = document.querySelector(".card-input-description");

const deleteCardBtn = document.querySelector(".task-create-card__btn-cancel");
const addCardBtn = document.querySelector(".task-create-card__btn-create");

const renderCreateCard = (data) => {
  // 불러온 데이터를 컴포넌트에 넣어서 렌더링
  const columnContainer = document.querySelector(".column-container");
  columnContainer.innerHTML += columnsComponent(data);
};

document
  .querySelector(".column__header-right-icon")
  .addEventListener("click", () => {
    // 부모 태그 중 article 태그를 찾아서
    // article 태그의 자식 노드에 CreareCardComponent를 추가
  });

//

// 이벤트 위임

// 기존 개별 이벤트 리스너들을 대체할 이벤트 위임 핸들러
// 클릭 이벤트
document.body.addEventListener("click", (event) => {
  // 클릭된 요소 또는 상위 요소 중 data-action 속성을 가진 요소를 찾습니다.
  const target = event.target;
  const actionElement = target.closest("button") || target.closest("div");
  if (!actionElement) return; // data-action이 없는 요소는 무시

  const action = actionElement.className.split(" ")[0];

  // 각 액션에 따른 기능 실행 using object literal
  const actionHandlers = {
    "open-history-modal": openHistoryModal,
    "close-history-modal": closeHistoryModal,
    "open-delete-modal": showModal,
    "cancel-delete-btn": deleteModal,
    "confirm-delete-btn": () => {
      // 사용자 기록 삭제 후 모달 닫기
      historyDeleteModal.close();
    },
    "column__header-right-icon": () => {
      // 부모 태그 중 article 태그를 찾아서
      // article 태그의 자식 노드에 CreateCardComponent를 추가
      const articleElement = actionElement.closest("article");
      articleElement.innerHTML += CreateCardComponent();
    },
    "card-input-title": () => {},
    "card-input-description": () => {},
    "header__history": openHistoryModal,
    "history-modal__header-close": closeHistoryModal,
    "history-modal__footer-btn": showModal
  };

  if (actionHandlers[action]) {
    actionHandlers[action]();
  }
});

// input 문자열 추적 이벤트
document.body.addEventListener("input", (event) => {
  const actionElement = event.target.closest("input");
  if (!actionElement) return;

  const action = actionElement.className.split(" ")[0];

  console.log(action);
});
