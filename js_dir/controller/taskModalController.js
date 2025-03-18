import { DeleteAlert } from "../component/deleteAlertModal.js";
import { store } from "../store/store.js";
import { taskCard } from "../component/CardUi.js";

export const taskModal = {
  titleValue: null,
  targetSection: null,
  targetId: null,

  setTargetCard: function (button) {
    const cardModal = button.closest(".todo-card");
    this.titleValue = cardModal.querySelector(".task-title").textContent;
    this.targetSection = cardModal.closest(".columnlist__col").dataset.type;
    this.targetId = cardModal.id;
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
};
