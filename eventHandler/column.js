import { createAddCardForm } from "./createForm.js";

const columnListAll = document.querySelector(".columnList");

export function eventAddCard() {
  columnListAll.addEventListener("click", function (event) {
    const plusButton = event.target.closest(".column-header__plusButton");
    if (plusButton) {
      const columnHeader = plusButton.closest(".column-header");
      const existAddCard = columnHeader.nextElementSibling.firstChild;
      // nextElementSibling 까지 -> column-cardList
      // firstChild 까지 -> column-cardList 밑의 첫번째 자식요소
      if (existAddCard.classList.contains("add-card"))
        return existAddCard.remove();

      const columnList = columnHeader.nextElementSibling;
      if (columnHeader && columnList) {
        const fragment = document.createDocumentFragment();
        const addCardForm = createAddCardForm();
        fragment.appendChild(addCardForm);
        columnList.prepend(fragment);
        processAddCard(addCardForm);
      }
    }
  });
}

function processAddCard(addCardForm) {
  addCardForm.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-card__cancle-btn"))
      return addCardForm.remove();
    if (event.target.classList.contains("add-card__submit-btn")) {
      // 이벤트를 addCardForm, 즉 카드 추가 전체 폼에 설정했기 때문에
      // 이전 처럼 className으로 접근하면 제대로 처리되지 않을 수 있기 때문에
      // classList.contains()로 접근하여 조건을 확인할 수 있다

      const title = addCardForm.querySelector(".add-card__input__title").value;
      const content = addCardForm.querySelector(
        ".add-card__input__content"
      ).value;
      if (TextLengthWithoutGap(title, content))
        return alert("제목, 내용 모두 입력해주세요");

      const createCardForm = createShowCard(title, content);
      const findAddCardElement = event.target.closest(".add-card");
      const cardList = findAddCardElement.parentElement;
      const cardCount =
        cardList.previousElementSibling.querySelector(".count_card");
      findAddCardElement.remove();
      cardList.prepend(createCardForm);
      cardCount.textContent = Number(cardCount.textContent) + 1;
    }
  });
}

function TextLengthWithoutGap(title, content) {
  const titleWithoutGap = title.replace(/\s/g, "").length;
  const contentWithoutGap = content.replace(/\s/g, "").length;
  if (titleWithoutGap === 0 || contentWithoutGap === 0) return true;
  return false;
}

function createShowCard(title, content) {
  // 입력받은 content를 줄바꿈까지 그대로 출력하기 위해 realContent 내용 추가
  // content에 줄바꿈은 \n으로 표시되기에 줄바꿈 태그로 바꿔주기
  let lineBreakContent = content.replace(/\n/g, "<br>");
  let realContent = lineBreakContent.replace(/\s/g, "&nbsp;");
  const cardElement = document.createElement("div");
  cardElement.classList.add("show-card");
  cardElement.innerHTML = `<div class="show-card__total">
      <h3 class="show-card__title">${title}</h3>
      <span class="show-card__content">${realContent}</span>
      <span class="show-card__author">author by web</span>
    </div>
    <div class="show-card__icons">
      <button class="show-card__cancle-icon delete">
        <svg
          class="closed"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z"
          />
        </svg>
      </button>
      <button class="show-card__edit-icon">
        <svg
          class="edit"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.727 2.72708L10.9642 1.48991C11.1194 1.33459 11.3038 1.21139 11.5066 1.12733C11.7095 1.04327 11.927 1 12.1466 1C12.3662 1 12.5836 1.04327 12.7865 1.12733C12.9894 1.21139 13.1737 1.33459 13.329 1.48991L14.511 2.67191C14.8244 2.98542 15.0005 3.41059 15.0005 3.8539C15.0005 4.29722 14.8244 4.72238 14.511 5.0359L13.2738 6.27306M9.727 2.72708L1.68877 10.7645C1.41122 11.042 1.24018 11.4084 1.2056 11.7994L1.00331 14.0898C0.992444 14.2115 1.00842 14.3342 1.0501 14.4491C1.09178 14.564 1.15816 14.6684 1.24456 14.7549C1.33096 14.8414 1.43528 14.9078 1.55016 14.9496C1.66503 14.9914 1.78768 15.0075 1.90945 14.9968L4.19988 14.7945C4.59145 14.7603 4.95845 14.5892 5.23642 14.3113L13.2738 6.27306M9.727 2.72708L13.2738 6.27306"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>`;
  return cardElement;
}
