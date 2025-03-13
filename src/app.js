import { renderColumns } from "./data";
import "pretendard/dist/web/static/pretendard.css"; // 폰트 CSS 불러오기
import "./css/global.css";
import "./css/reset.css";
import "./css/style.css";
import "./css/utility.css";

// 칼럼 동적으로 생성하기
renderColumns();

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
  setTimeout(() => {
    historyModal.style.display = "none";
  }, 500);
};

//

// 히스토리 삭제 모달 이벤트
// const historyDeleteBtn = document.querySelector(".history-modal__footer-btn");
const historyDeleteModal = document.querySelector(".history-delete-modal");
// const historyDeleteCancelBtn = document.querySelector("#cancel-delete-btn");
const historyDeleteApproveBtn = document.querySelector(".confirm-delete-btn");

historyDeleteModal.close();

// 모달 열고 닫기
const showModal = () => {
  historyDeleteModal.showModal();
};

const deleteModal = () => {
  historyDeleteModal.close();
};

//

// 카드 생성
const createCardBtn = document.querySelector("#create-card-btn");
const deleteColumnBtn = document.querySelector("#delete-column-btn");

const cardInputTitle = document.querySelector("#card-input-title");
const cardInputDescription = document.querySelector("#card-input-description");

const deleteCardBtn = document.querySelector(".task-create-card__btn-cancel");
const addCardBtn = document.querySelector(".task-create-card__btn-create");

//

// 이벤트 위임

// 기존 개별 이벤트 리스너들을 대체할 이벤트 위임 핸들러
document.body.addEventListener("click", (event) => {
  // 클릭된 요소 또는 상위 요소 중 data-action 속성을 가진 요소를 찾습니다.
  const actionElement =
    event.target.closest("button") || event.target.closest("div");
  if (!actionElement) return; // data-action이 없는 요소는 무시

  const action = actionElement.className.split(" ")[0];

  console.log(action);

  // 각 액션에 따른 기능 실행
  switch (action) {
    case "open-history-modal":
      openHistoryModal();
      break;

    case "close-history-modal":
      closeHistoryModal();
      break;

    case "open-delete-modal":
      showModal();
      break;

    case "cancel-delete-btn":
      deleteModal();
      break;

    // 모든 사용자 기록 삭제
    case "confirm-delete-btn":
      () => {
        // 사용자 기록 삭제
        // 사용자 기록 삭제 후 모달 닫기
        historyDeleteModal.close();
      };
      break;

    // 카드 생성, 칼럼 삭제 등 추가 액션 처리
    case "create-card":
      // createCard() 함수 등 호출
      break;

    case "delete-column":
      // deleteColumn() 등 호출
      break;

    case "header__history":
      openHistoryModal();
      break;

    case "history-modal__header-close":
      closeHistoryModal();
      break;

    case "history-modal__footer-btn":
      showModal();
      break;

    default:
      break;
  }
});
