import { CreateCardComponent } from "./components/create_card_component";
import { ModifyCardComponent } from "./components/modify_card_component";

import "pretendard/dist/web/static/pretendard.css"; // 폰트 CSS 불러오기
import "./css/global.css";
import "./css/reset.css";
import "./css/utility.css";
import "./css/style.css";

import { Actions } from "./store/actions.js";
import { Dispatcher } from "./store/dispatcher.js";
import { Store } from "./store/store.js";
import { renderColumns, renderHistory } from "./store/view.js";

import { dataInitialize } from "./data.js";

// 데이터 불러오기
dataInitialize();
// 상태 변경 감지 (구독)
Store.subscribe(renderColumns);
Store.subscribe(renderHistory);

//

// 클래스 이름에서 'key=value' 형식의 값을 찾아 숫자 ID를 반환
const extractIdFromClass = (element) => {
  if (!element?.className) return null;

  const classes = element.className.split(" ");

  const parts = classes.slice(-1)[0].split("=");
  const id = parseInt(parts[1]);
  if (!isNaN(id)) return id;

  return null;
};

//

// History Modal 관련 함수
const historyModal = document.querySelector(".history-modal-container");

// 히스토리 모달 열기
const openHistoryModal = () => {
  historyModal.style.cssText = `
    display: grid;
    animation: slideIn 0.5s forwards;
  `;
};

// 히스토리 모달 닫기
const closeHistoryModal = () => {
  historyModal.style.cssText += "animation: slideOut 0.5s forwards;";
};

// History Delete Modal 관련 함수
const historyDeleteModal = document.querySelector(".history-delete-modal");
const showDeleteModal = () => historyDeleteModal.showModal();
const closeDeleteModal = () => historyDeleteModal.close();

//

// 각 액션에 해당하는 핸들러 함수들을 정의한 맵
const actionHandlers = {
  "open-history-modal": () => openHistoryModal(),
  "close-history-modal": () => closeHistoryModal(),
  "open-delete-modal": () => showDeleteModal(),
  "cancel-delete-btn": () => closeDeleteModal(),
  "confirm-delete-btn": () => closeDeleteModal(),
  "column__header-right-icon": (element) => {
    const columnElement = element.closest("article");
    if (columnElement) {
      columnElement.innerHTML += CreateCardComponent();
    }
  },
  "task-create-card__btn-create": (element) => {
    const columnElement = element.closest("article");
    if (!columnElement) return;
    const columnId = extractIdFromClass(columnElement);
    const cardId = Store.generateCardId(columnId);
    const titleInput = columnElement.querySelector(".card-input-title");
    const descriptionInput = columnElement.querySelector(
      ".card-input-description"
    );
    const cardData = {
      id: cardId,
      title: titleInput?.value || "New Task",
      description: descriptionInput?.value || "Task description",
      author: "YooN",
    };
    Dispatcher.dispatch(Actions.addCard(columnId, cardData));
    const createCardElement = element.closest(".task-create-card");
    createCardElement?.remove();
  },
  "task-create-card__btn-cancel": (element) => {
    const createCardElement = element.closest(".task-create-card");
    createCardElement?.remove();
  },
  "task-card__right-delete-icon": (element) => {
    const columnElement = element.closest("article");
    const columnId = extractIdFromClass(columnElement);
    const cardElement = element.closest(".task-card");
    const cardId = extractIdFromClass(cardElement);
    Dispatcher.dispatch(Actions.deleteCard(columnId, cardId));
  },
  "task-card__right-modify-icon": (element) => {
    const modifyCardElement = element.closest(".task-card");
    if (!modifyCardElement) return;
    const modifyCardId = extractIdFromClass(modifyCardElement);
    const titleElem = modifyCardElement.querySelector(".task-card__title");
    const descElem = modifyCardElement.querySelector(".task-card__description");
    const oldData = {
      id: modifyCardId,
      title: titleElem?.innerText || "Modified Task",
      description: descElem?.innerText || "Modified description",
    };
    modifyCardElement.outerHTML = ModifyCardComponent(oldData);
  },
  "task-modify-card__btn-cancel": (element) => {
    const modifyCardElement = element.closest(".task-modify-card");
    modifyCardElement?.remove();
  },
  "task-modify-card__btn-create": (element) => {
    const columnElement = element.closest("article");
    if (!columnElement) return;
    const columnId = extractIdFromClass(columnElement);
    const modifyCardElement = element.closest(".task-card");
    const modifyCardId = extractIdFromClass(modifyCardElement);
    const titleInput = columnElement.querySelector(".card-input-title");
    const descriptionInput = columnElement.querySelector(
      ".card-input-description"
    );
    const updatedData = {
      title: titleInput?.value || "Modified Task",
      description: descriptionInput?.value || "Modified description",
    };
    Dispatcher.dispatch(
      Actions.updateCard(columnId, modifyCardId, updatedData)
    );
    modifyCardElement?.remove();
  },
  header__history: () => openHistoryModal(),
  "history-modal__header-close": () => closeHistoryModal(),
  "history-modal__footer-btn": () => showDeleteModal(),
};

// 단일 이벤트 리스너를 통해 위임 방식으로 처리
document.body.addEventListener("click", (event) => {
  const actionElement = event.target.closest("button, div");
  if (!actionElement) return;
  const action = actionElement.classList[0];
  const handler = actionHandlers[action];
  if (handler) {
    handler(actionElement);
  }
});
