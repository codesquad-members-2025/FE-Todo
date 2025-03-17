import { cancleDelete, createDeleteConfirmModal } from "./historyList.js";

export function eventDelete() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !button.classList.contains("delete")) return;
    // .delete를 포함할 경우
    // 부모요소에 show-card가 있는지 확인 -> 카드를 삭제하는 기능
    const isShowCard = button.closest(".show-card");
    if (isShowCard) return processCard(isShowCard);

    // 부모요소에 section이 있는지 확인 -> 칼럼 전체 삭제
    button.closest("section").remove();
  });
}

function cardDeleteAlert() {
  const title = "선택한 카드를";
  const modal = document.querySelector(".DeleteConfirmationModal");
  const confirmLayer = createDeleteConfirmModal(title);
  modal.appendChild(confirmLayer);
  // 그 다음 화면에 뜨게끔 만들어
  document.body.appendChild(modal);
}

function processCard(card) {
  cardDeleteAlert();
  document.addEventListener(
    "click",
    (event) => {
      if (event.target.className === "cancleButton") return cancleDelete();
      if (event.target.className === "decideDeleteButton") {
        cancleDelete();

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
