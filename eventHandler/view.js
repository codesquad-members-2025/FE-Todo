import { createRecordForm, createShowCardForm } from "./createForm.js";

export function fetchData() {
  fetch("../data/data.json") // json파일 가져오기
    .then((response) => response.json()) // json형식으로
    .then((data) => {
      cardView(data); // 불러온 데이터를 처리하기
      historyView(data);
    })
    .catch((error) => console.error("오류 발생:", error));
}

function cardView(data) {
  data.colums.forEach((colum) => {
    if (colum.id === "toDo") {
      generateCardsFromList(colum);
    } else if (colum.id === "doing") {
      generateCardsFromList(colum);
    } else if (colum.id === "done") {
      generateCardsFromList(colum);
    }
  });
}

function generateCardsFromList(colum) {
  let index = -1;
  if (colum.id === "toDo") index = 0;
  else if (colum.id === "doing") index = 1;
  else if (colum.id === "done") index = 2;
  let count = 0;
  const id = document.querySelector(`.${colum.id}-cardList`);
  const columnHeader = id.previousElementSibling;
  let countCard = columnHeader.querySelector(".count_card");
  const fragment = document.createDocumentFragment();
  colum.cardList.forEach((cardData) => {
    const cardElement = createShowCardForm(cardData);
    count++;
    fragment.appendChild(cardElement);
  });
  id.appendChild(fragment);
  countCard.textContent = count;
}

function historyView(data) {
  const recordHistory = document.getElementById("recordHistory");
  const fragment = document.createDocumentFragment();
  data.historyList.forEach((record) => {
    const recordElement = createRecordForm(record);
    fragment.appendChild(recordElement);
  });
  recordHistory.appendChild(fragment);
}
