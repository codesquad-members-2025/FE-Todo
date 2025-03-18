import { makeTaskCard } from "../template/template.js";

export const taskCard = {
  cardNodes: [], //다른곳에서 이 객체를 참조해서 계속 반복해서 create 메서드를 호출하면 cardNodes의 요소에 카드가 쌓일까..?-> 아님 클래스가 아니기에 한번만 선언되면 이걸 계속 참소한다. 그러니까 다 쓰면 초기화를 따로 해줘야함!

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

  // processShowModal: function (cardId, titleValue, contentValue, dataType) {
  //   this.create(cardId, titleValue, contentValue);
  //   this.draw(dataType);
  // },

  //카드 여러개 삭제할 경우도 생각해야함-> 일단 한가지만 생각하기
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
