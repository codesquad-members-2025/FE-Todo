import { DeleteAlert } from "../component/deleteAlertModal.js";
import { store } from "../store/store.js";
import { taskCard } from "../component/CardUi.js";
import { inputModal } from "../component/inputModalUi.js";
import { inputModalController } from "./inputmodalController.js";
import { historyBarController } from "./control-Historybar.js";
import { calumnCount } from "./calumnCount.js";

export const taskModal = {
  cardModal: null,
  titleValue: null,
  targetSection: null,
  targetId: null,
  taskContent: null,

  setTargetCard: function (button) {
    this.cardModal = button.closest(".todo-card");
    this.titleValue = this.cardModal.querySelector(".task-title").textContent;
    this.targetId = this.cardModal.id;
    // if (button.classList.contains("edit-task-btn"))
    this.taskContent =
      this.cardModal.querySelector(".task-content").textContent;
    this.targetSection =
      this.cardModal.closest(".columnlist__col").dataset.type;
  },
  showDeleteModal: function (button) {
    this.setTargetCard(button);
    DeleteAlert.makeAlert("taskModal", "선택한 카드를 삭제할까요?", "유지");
    DeleteAlert.showDeleteModal();
  },
  deleteTaskModal: function () {
    const timeStamp = Date.now().toString();
    store.removeTask(this.targetSection, this.targetId);
    const taskDataArr = [this.titleValue, this.targetSection, timeStamp];
    calumnCount.updateCardNumbers(this.targetSection);
    historyBarController.addHisotryLog(taskDataArr, "삭제");
    taskCard.delete(this.targetId);
    DeleteAlert.closeDeleteModal();
  },
  renderTaskCards: function () {
    let taskData = store.getState();
    taskData = taskData || {}; // taskData가 null이면 빈 객체로 초기화
    Object.keys(taskData).forEach((dataType) => {
      Object.entries(taskData[dataType] || {}).forEach(([id, card]) => {
        const title = card["title"];
        const content = card["content"];
        taskCard.create(id, title, content);
      });
      taskCard.draw(dataType);
      calumnCount.updateCardNumbers(dataType);
    });
  },
  parseCardModal: function () {
    const taskDataArr = [this.titleValue, this.targetSection, this.targetId];
    return taskDataArr;
  },

  tryEdit: function (button) {
    this.setTargetCard(button);
    const newInputModal = inputModal.createInputModal(
      this.titleValue,
      this.taskContent,
      this.targetSection
    );
    this.cardClone = this.cardModal.cloneNode(true);
    taskCard.replaceWithInputModal(this.cardModal, newInputModal);
  },
  confirmEdit: function (button) {
    const timeStamp = Date.now().toString();
    this.inputModal = button.closest(".task-modal");
    const { columnType, titleValue, contentValue } =
      inputModalController.getValues(button);
    const editedCard = taskCard.editCard(
      this.cardClone,
      titleValue,
      contentValue
    );
    this.cardClone = editedCard;
    const taskDataArr = [titleValue, columnType, timeStamp];
    historyBarController.addHisotryLog(taskDataArr, "변경");
    store.editTask(this.targetId, columnType, titleValue, contentValue);
    taskCard.replaceWithInputModal(this.inputModal, this.cardClone);
  },
  cancelEdit: function (button) {
    this.inputModal = button.closest(".task-modal");
    taskCard.replaceWithInputModal(this.inputModal, this.cardClone);
  },
  updateCardPosition(section) {
    section.addEventListener("dragover", (event) => {
      event.preventDefault();
      const taskList = section.querySelector(".task-list");
      const cards = [...section.querySelectorAll(".todo-card")].filter(
        (card) => !card.classList.contains("dragging")
      );

      this.underCard = this.getClosestCard(cards, event.clientY);
      const draggingCard = document.querySelector(".dragging");

      if (this.underCard === undefined) {
        taskList.appendChild(draggingCard);
      } else {
        taskList.insertBefore(draggingCard, this.underCard);
      }
    });
  },
  getClosestCard(cards, y) {
    return cards.reduce(
      (closest, card) => {
        const cardDomRect = card.getBoundingClientRect();
        const offset = y - (cardDomRect.top + cardDomRect.height / 2);
        if (offset < 0 && Math.abs(offset) < Math.abs(closest.offset)) {
          return { offset, card };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).card;
  },
  dragStart(event) {
    const draggingCard = event.target.closest(".todo-card");
    if (!draggingCard) return;
    draggingCard.classList.add("dragging");
    this.currentSection = draggingCard.closest(".columnlist__col").dataset.type;
    draggingCard.addEventListener("dragend", this.handleDragEnd.bind(this));
  },
  handleDragEnd(event) {
    const timeStamp = Date.now().toString();
    const card = event.target;
    this.setTargetCard(card);
    store.removeTask(this.currentSection, this.targetId);
    calumnCount.updateCardNumbers(this.currentSection);
    const id = this.underCard ? this.underCard.id - 1 : Infinity;
    const taskObj = {
      id: id.toString(),
      title: this.titleValue,
      content: this.taskContent,
    }; //id는 들어갈 카드의 다음 id 를 추적하여 생성한다.

    store.addTask(this.targetSection, taskObj);
    calumnCount.updateCardNumbers(this.targetSection);

    const taskDataArr = [this.titleValue, this.currentSection, timeStamp];
    historyBarController.addHisotryLog(taskDataArr, "이동", this.targetSection);
    card.removeEventListener("dragend", this.handleDragEnd);
    card.classList.remove("dragging");
  },
};
