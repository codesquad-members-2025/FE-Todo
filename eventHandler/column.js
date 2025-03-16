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
        console.log(columnList);
        columnList.prepend(fragment);
        processAddCard(addCardForm);
      }
    }
  });
}

export function processAddCard(addCardForm) {
  const isEmpty = isFormEmpty(addCardForm);
  // 처리해야할 카드가 비어있는지 확인함
  // 비어있을 경우 -> 새로운 카드를 추가 기능
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
  card.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-card__cancle-btn"))
      return card.remove();
    if (event.target.classList.contains("add-card__submit-btn")) {
      // 이벤트를 addCardForm, 즉 카드 추가 전체 폼에 설정했기 때문에
      // 이전 처럼 className으로 접근하면 제대로 처리되지 않을 수 있기 때문에
      // classList.contains()로 접근하여 조건을 확인할 수 있다

      const title = card.querySelector(".add-card__input__title").value;
      const content = card.querySelector(".add-card__input__content").value;
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
  let lineBreakContent = content.replace(/\n/g, "<br/>");
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
      <div class="closed"></div>
      </button>
      <button class="show-card__edit-icon">
      <div class="edit"></div>
      </button>
    </div>`;
  return cardElement;
}

export function update() {
  document.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit");
    if (!editButton) return;
    // edit 클릭 시
    // 가장 가까운 카드를 찾아서 해당 내용을 그대로 유지한 상태로 입력 폼 작성
    const cardTotalContent = event.target.closest(".show-card");
    const title = cardTotalContent.querySelector("h3").textContent;
    let content = cardTotalContent.querySelector("span").innerHTML;
    content = content.replace(/<br\/?>/g, "\n");
    content = content.replace(/&nbsp;/g, " ");

    const cardList = cardTotalContent.parentElement;
    // 입력 폼 만들기
    const modifyCard = createAddCardForm();

    // 해당 위치에 배치 -> 기존 자식 요소 앞에 새로운 요소를 넣는다
    cardList.insertBefore(modifyCard, cardTotalContent);
    cardTotalContent.classList.add("hidden");

    // 기존 내용을 담게 하기
    modifyCard.querySelector("input").value = title;
    modifyCard.querySelector("textarea").value = content;
    processAddCard(modifyCard);
    updateCard(modifyCard);
    // cardTotalContent.classList.remove("hidden"); 얘를 지우고 취소버튼 등록 버튼 작성해보기
  });
}

function updateCard(card) {
  card.addEventListener("click", function (event) {
    // 카드 수정 전에 hidden시킨 카드 찾기
    const previousCard = event.target.closest(".add-card").nextElementSibling;
    if (event.target.classList.contains("add-card__cancle-btn")) {
      card.remove();
      previousCard.classList.remove("hidden");
    }

    if (event.target.classList.contains("add-card__submit-btn")) {
      // 이벤트를 addCardForm, 즉 카드 추가 전체 폼에 설정했기 때문에
      // 이전 처럼 className으로 접근하면 제대로 처리되지 않을 수 있기 때문에
      // classList.contains()로 접근하여 조건을 확인할 수 있다

      const title = card.querySelector(".add-card__input__title").value;
      const content = card.querySelector(".add-card__input__content").value;
      if (TextLengthWithoutGap(title, content))
        return alert("제목, 내용 모두 입력해주세요");

      const createCardForm = createShowCard(title, content);
      const findAddCardElement = event.target.closest(".add-card");
      const cardList = findAddCardElement.parentElement;

      cardList.insertBefore(createCardForm, findAddCardElement);
      findAddCardElement.remove();
      previousCard.remove();
    }
  });
}
