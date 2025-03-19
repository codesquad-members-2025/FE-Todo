import { makeTaskCard } from "../template/template.js";

export const taskCard = {
  cardNodes: [],

  create: function (cardId, titleValue, contentValue) {
    const newcard = document.createElement("div");
    newcard.id = cardId;
    newcard.classList.add("todo-card");
    newcard.innerHTML = makeTaskCard(titleValue, contentValue);
    this.cardNodes.push(newcard);
  },
  draw: function (dataType) {
    const fragment = document.createDocumentFragment();
    const targetSection = document
      .querySelector(`.columnlist__col[data-type=${dataType}]`)
      .querySelector(".task-list");
    this.cardNodes.forEach((cardNode) => {
      fragment.appendChild(cardNode);
    });
    targetSection.appendChild(fragment);
    this.cardNodes = [];
  },

  delete: function (id) {
    const cardModal = document.getElementById(id);
    cardModal.remove();
  },
  replaceWithInputModal: function (targetModal, replaceModal) {
    targetModal.replaceWith(replaceModal);
  },
  editCard: function (cardModal, title, content) {
    cardModal.querySelector(".task-title").innerText = title;
    cardModal.querySelector(".task-content").innerText = content;
    return cardModal;
  },
};
