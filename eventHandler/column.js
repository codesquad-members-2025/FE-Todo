import { store } from "../store/store.js";
import { createAddCardForm, createShowCardForm } from "./createForm.js";
import { cancelDelete, createDeleteConfirmModal } from "./historyList.js";

const columnListAll = document.querySelector(".columnList");

function addCardHandler() {
  columnListAll.addEventListener("click", function (event) {
    const plusButton = event.target.closest(".column-header__plusButton");
    if (!plusButton) return;

    const columnHeader = plusButton.closest(".column-header");
    const existAddCard = columnHeader.nextElementSibling.firstChild;

    if (existAddCard.classList.contains("add-card"))
      return existAddCard.remove();

    const columnList = columnHeader.nextElementSibling;
    if (!columnHeader && !columnList) return;

    const addCardForm = createAddCardForm();
    columnList.prepend(addCardForm);
    processAddCard(addCardForm);
  });
}

export function processAddCard(addCardForm) {
  const isEmpty = isFormEmpty(addCardForm);

  if (isEmpty) return newAddCard(addCardForm);
  return;
}

function isFormEmpty(card) {
  const title = card.querySelector(".add-card__input__title").value;
  const content = card.querySelector(".add-card__input__content").value;
  if (title.length !== 0 && content.length !== 0) return false;
  else if (title.length === 0 && content.length === 0) return true;
}

function newAddCard(card) {
  card.addEventListener("click", function ({ target }) {
    const { classList } = target;
    if (classList.contains("add-card__cancel-btn")) return card.remove();
    if (classList.contains("add-card__submit-btn")) {
      const title = card.querySelector(".add-card__input__title").value;
      const content = card.querySelector(".add-card__input__content").value;

      if (textLengthWithoutGap(title, content))
        return alert("제목, 내용 모두 입력해주세요");

      const columnId = target.closest(".column-cardList").dataset.columnId;
      store.addCard(columnId, title, content); // 카드가 추가될 때 store 접근하여 저장

      const createCardForm = createShowCardForm(title, content);
      const findAddCardElement = target.closest(".add-card");
      const cardList = findAddCardElement.parentElement;
      const cardCount =
        cardList.previousElementSibling.querySelector(".count_card");
      findAddCardElement.remove();
      cardList.prepend(createCardForm);
      cardCount.textContent = Number(cardCount.textContent) + 1;
    }
  });
}

function textLengthWithoutGap(title, content) {
  const titleWithoutGap = title.replace(/\s/g, "").length;
  const contentWithoutGap = content.replace(/\s/g, "").length;
  if (titleWithoutGap === 0 || contentWithoutGap === 0) return true;
  return false;
}

export function updateCardHandler() {
  document.addEventListener("click", ({ target }) => {
    const editButton = target.closest(".edit");
    if (!editButton) return;

    const cardTotalContent = target.closest(".show-card");
    const title = cardTotalContent.querySelector("h3").textContent;
    let content = cardTotalContent.querySelector("span").innerHTML;
    content = content.replace(/<br\/?>/g, "\n").replace(/&nbsp;/g, " ");

    const cardList = cardTotalContent.parentElement;

    const modifyCard = createAddCardForm();

    cardList.insertBefore(modifyCard, cardTotalContent);
    cardTotalContent.classList.add("hidden");

    modifyCard.querySelector("input").value = title;
    modifyCard.querySelector("textarea").value = content;
    processAddCard(modifyCard);
    updateCard(modifyCard);
  });
}

function updateCard(card) {
  card.addEventListener("click", function ({ target }) {
    const { classList } = target;
    const previousCard = target.closest(".add-card").nextElementSibling;
    if (classList.contains("add-card__cancel-btn")) {
      card.remove();
      previousCard.classList.remove("hidden");
    }

    if (classList.contains("add-card__submit-btn")) {
      const title = card.querySelector(".add-card__input__title").value;
      const content = card.querySelector(".add-card__input__content").value;
      if (textLengthWithoutGap(title, content))
        return alert("제목, 내용 모두 입력해주세요");

      const createCardForm = createShowCardForm(title, content);
      const findAddCardElement = target.closest(".add-card");
      const cardList = findAddCardElement.parentElement;

      cardList.insertBefore(createCardForm, findAddCardElement);
      findAddCardElement.remove();
      previousCard.remove();
    }
  });
}

function deleteCardHandler() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !button.classList.contains("delete")) return;

    const isShowCard = button.closest(".show-card");
    if (isShowCard) return processCard(isShowCard);

    button.closest("section").remove();
  });
}

function cardDeleteAlert() {
  const title = "선택한 카드를";
  const modal = document.querySelector(".DeleteConfirmationModal");
  const confirmLayer = createDeleteConfirmModal(title);
  modal.appendChild(confirmLayer);
  document.body.appendChild(modal);
}

function processCard(card) {
  cardDeleteAlert();
  document.addEventListener(
    "click",
    ({ target }) => {
      const { className } = target;
      if (className === "cancelButton") return cancelDelete();
      if (className === "decideDeleteButton") {
        cancelDelete();

        const columnHeader =
          card.closest(".column-cardList").previousElementSibling;
        const countCard = columnHeader.querySelector(".count_card");
        countCard.textContent = Number(countCard.textContent) - 1;
        card.remove();
      }
    },
    { once: true }
  );
}

export function initializeColumn() {
  addCardHandler();
  deleteCardHandler();
}
