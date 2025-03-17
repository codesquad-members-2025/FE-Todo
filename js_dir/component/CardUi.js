import { makeTaskCard, makeCalumnTemplate } from "../template/template.js";

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
  renderCards: function () {
    //스토어에서 데이터를 모두 가져온다.
    //가져온 데이터를 모두 그려야하니까 순회하면서 taskCard.create 반복 실행
    //??이 메서드가 필요 할 까?
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
};
