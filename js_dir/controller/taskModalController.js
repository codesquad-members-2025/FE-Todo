import { DeleteAlert } from "../component/deleteAlertModal.js";
import { store } from "../store/store.js";
import { taskCard } from "../component/CardUi.js";
import { inputModal } from "../component/inputModalUi.js";
import { inputModalController } from "./inputmodalController.js";

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
    if (button.classList.contains("edit-task-btn"))
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
    store.removeTask(this.targetSection, this.targetId);
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
    this.inputModal = button.closest(".task-modal");
    const { columnType, titleValue, contentValue } =
      inputModalController.getValues(button);
    const editedCard = taskCard.editCard(
      this.cardClone,
      titleValue,
      contentValue
    );
    this.cardClone = editedCard;
    taskCard.replaceWithInputModal(this.inputModal, this.cardClone);
    store.editTask(this.targetId, columnType, titleValue, contentValue);
  },
  cancelEdit: function (button) {
    this.inputModal = button.closest(".task-modal");
    taskCard.replaceWithInputModal(this.inputModal, this.cardClone);
  },
};
