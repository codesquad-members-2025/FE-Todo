import { columnsComponent } from "./components/columns_component";
import { CreateCardComponent } from "./components/create_card_component";
import { fetchMockData } from "./data";

import "pretendard/dist/web/static/pretendard.css"; // 폰트 CSS 불러오기
import "./css/global.css";
import "./css/reset.css";
import "./css/utility.css";
import "./css/style.css";

import { Actions } from "./store/actions.js";
import { Dispatcher } from "./store/dispatcher.js";
import { Store } from "./store/store.js";

// 데이터 불러오기
fetch("/data/mock.json")
  .then((response) => response.json())
  .then((data) => {
    // mock.json의 칼럼, 카드 데이터 확인 후 Store에 저장
    // 예시로 columns에 빈 카드 배열을 초기화하는 과정
    const { columns } = data;
    columns.forEach((column) => {
      // 카드 배열이 없다고 가정하면 초기화
      if (!column.cards) {
        column.cards = [];
      }
    });
    Store.state.columns = columns;
    // 초기 데이터 기준으로 id 카운터 설정
    Store.initializeIdCounters();
    // 첫 렌더링
    renderColumns();
  });

// 2) View 업데이트 함수
const renderColumns = () => {
  const columnContainer = document.querySelector(".column-container");
  // Store에 있는 columns 데이터를 가져와서
  // columnsComponent 컴포넌트 함수(HTML 문자열 생성)를 호출
  columnContainer.innerHTML = columnsComponent(Store.getState().columns);
};

// 3) 상태 변경 감지 (구독)
Store.subscribe(renderColumns);

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
    // 히스토리 페널 열기
    "open-history-modal": openHistoryModal,
    // 히스토리 페널 닫기
    "close-history-modal": closeHistoryModal,
    // 히스토리 페널에서 '기록 전체 삭제' 버튼 클릭 시 확인용 모달 등장
    "open-delete-modal": showModal,
    // 확인용 모달의 삭제 버튼을 눌렀을 때
    "cancel-delete-btn": deleteModal,
    // 확인용 모달의 취소 버튼을 눌렀을 때
    "confirm-delete-btn": () => {
      // 사용자 기록 삭제 후 모달 닫기
      historyDeleteModal.close();
    },
    // 칼럼의 + 버튼 눌렀을 때 카드 생성용 컴포넌트 생성
    "column__header-right-icon": () => {
      // 부모 태그 중 article 태그를 찾아서
      // article 태그의 자식 노드에 CreateCardComponent를 추가
      const columnElement = actionElement.closest("article");
      columnElement.innerHTML += CreateCardComponent(); // 카드 생성 컴포넌트 추가
    },
    // 카드 생성용 컴포넌트에서 '등록' 버튼 눌렀을 때
    "task-create-card__btn-create": () => {
      // 카드 생성
      const columnElement = actionElement.closest("article");
      const columnIdClass = columnElement.className.split(" ").slice(-1)[0];
      const columnId = parseInt(columnIdClass.split("=")[1]); // 숫자형 id로 변환

      const cardId = Store.generateCardId(columnId);
      const titleInput = columnElement.querySelector(".card-input-title");
      const descriptionInput = columnElement.querySelector(
        ".card-input-description"
      );
      // console.log(titleInput.value, descriptionInput.value);
      // 카드 데이터 생성
      const cardData = {
        id: cardId,
        title: titleInput.value || "New Task",
        description: descriptionInput.value || "Task description",
        author: "YooN",
      };
      // Store에 카드 추가, id는 Store에서 생성됨
      Dispatcher.dispatch(Actions.addCard(columnId, cardData));
      // 생성 컴포넌트 제거
      const createCardElement = actionElement.closest(".task-create-card");
      if (createCardElement) {
        createCardElement.remove();
      }
    },
    // 카드 생성용 컴포넌트에서 '취소' 버튼 눌렀을 때
    "task-create-card__btn-cancel": () => {
      // 생성 컴포넌트 취소 시 제거
      const createCardElement = actionElement.closest(".task-create-card");
      if (createCardElement) {
        createCardElement.remove();
      }
    },
    // 카드를 삭제하기 위해 X 버튼을 눌렀을 때
    "task-card__right-delete-icon": () => {
      // 칼럼 id와 카드 id를 찾아서 Store에 전달
      // 칼럼 id 찾기
      const columnElement = actionElement.closest("article");
      const columnId = parseInt(columnElement.className.split("=")[1]);
      // 카드 id 찾기
      const deleteCardElement = actionElement.closest(".task-card");
      const deleteCardId = parseInt(deleteCardElement.className.split("=")[1]);
      // Store에 전달
      Dispatcher.dispatch(Actions.deleteCard(columnId, deleteCardId));
    },
    "card-input-title": () => {},
    "card-input-description": () => {},
    header__history: openHistoryModal,
    "history-modal__header-close": closeHistoryModal,
    "history-modal__footer-btn": showModal,
  };

  // 실제로 액션을 실행하는 부분
  if (actionHandlers[action]) {
    actionHandlers[action]();
  }
});
