import { store } from "../store/store.js";
import { createRecordForm, createShowCardForm } from "./createForm.js";

export function getData() {
  store.fetchData(function () {
    cardView(store.state.columns);
    historyView(store.state.historyList);
  });
}

function cardView(dataColumns) {
  dataColumns.forEach((column) => {
    generateCardsFromList(column);
  });
}

function generateCardsFromList(column) {
  const id = document.querySelector(`.${column.id}-cardList`);
  const columnHeader = id.previousElementSibling;
  let countCard = columnHeader.querySelector(".count_card");
  const fragment = document.createDocumentFragment();
  column.cardList.forEach((cardData) => {
    const cardElement = createShowCardForm(cardData.title, cardData.content);
    fragment.appendChild(cardElement);
  });
  id.appendChild(fragment);
  countCard.textContent = column.cardList.length;
  column.count = column.cardList.length;
}

function historyView(dataHistoryList) {
  const recordHistory = document.getElementById("recordHistory");
  const fragment = document.createDocumentFragment();
  dataHistoryList.forEach((record) => {
    const recordElement = createRecordForm(record);
    fragment.appendChild(recordElement);
  });
  recordHistory.appendChild(fragment);
}
