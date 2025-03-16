import { DeleteAlert } from "../component/deleteAlertModal.js";
import { store } from "../store/store.js";
import { taskCard } from "../component/CardUi.js";

export const taskModal = {
  targetId: null,
  targetSection: null,
  setTargetCard: function (button) {
    this.targetId = button.closest(".todo-card").id;
    this.targetSection = button.closest(".columnlist__col").dataset.type;
  },
  showDeleteModal: function (button) {
    this.setTargetCard(button);
    DeleteAlert.makeAlert("선택한 카드를 삭제할까요?", "유지");
    DeleteAlert.showDeleteModal();
  },
  deleteTaskModal: function () {
    store.removeTask(this.targetSection, this.targetId);
    taskCard.delete(this.targetId);
    DeleteAlert.closeDeleteModal();
  },
};
