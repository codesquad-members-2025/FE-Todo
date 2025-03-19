import { cancelDelete, createDeleteConfirmModal } from "./historyList.js";

export function deleteCardHandler() {
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
