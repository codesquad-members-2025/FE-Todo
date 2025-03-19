import { DeleteAlert } from "../component/deleteAlertModal.js";
import { historyModalUi } from "../component/historyModal.js";
import { inputModal } from "../component/inputModalUi.js";
import { historyBarController } from "../controller/control-Historybar.js";
import { inputModalController } from "../controller/inputmodalController.js";
import { taskModal } from "../controller/taskModalController.js";
//얘도 아래의 kanban에 이벤트 위임으로 넣어보자(리팩토링 사항) -> 동적으로 바뀌는 사항이 아니라 바꿀 필요있을까?
export const initialize = function () {
  const sections = document.querySelectorAll(".columnlist__col");
  sections.forEach((section) => {
    registerAddTaskEvent(section);
  });
};

export function kanbanDetector() {
  //이벤트 위임
  const body = document.querySelector(".top-layout-container");
  body.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    //✅ 카드 추가
    if (
      findContainClass(button, "register-button") &&
      !findContainClass(button, "edit")
    ) {
      const taskDataArr = inputModalController.processAddTask(button);
      //데이터 추가한 사실을 컨트롤러에게 전달
      historyBarController.addHisotryLog(taskDataArr, "등록");
      //로그 추가 기능도 컨트롤러에게 전달
    } else if (
      findContainClass(button, "cancel-button") &&
      !findContainClass(button, "edit")
    ) {
      inputModal.clearAndClose(button);
    } else if (findContainClass(button, "delete-task-btn")) {
      //컨트롤러에게 상황 전달 -> 삭제 모달 만들어서 띄워야함,, 이때 클릭한 모달의 id,section을 기억해야한다.
      taskModal.showDeleteModal(button);
    } else if (button.id === "cancel-button") {
      DeleteAlert.closeDeleteModal();
    } else if (
      button.id === "confirm-delete-button" &&
      button.closest(".taskModal")
    ) {
      taskModal.deleteTaskModal(); //this.targetSection, this.targetId 만 전달__title value필요
    } else if (
      button.id === "confirm-delete-button" &&
      button.closest(".historyModal")
    ) {
      historyBarController.deleteLog();
    } else if (findContainClass(button, "edit-task-btn")) {
      taskModal.tryEdit(button);
    } else if (
      findContainClass(button, "register-button") &&
      findContainClass(button, "edit")
    ) {
      taskModal.confirmEdit(button);
    } else if (
      findContainClass(button, "cancel-button") &&
      findContainClass(button, "edit")
    ) {
      taskModal.cancelEdit(button);
    }
  });
}

export function historyBar() {
  const historyBtn = document.getElementById("header__history-btn");
  const historyBar = historyModalUi.historySidebar;
  const closeBtn = historyBar.querySelector("#popover-header__closeBtn");
  const deleteBtn = historyBar.querySelector("#delete-sidebar_button");

  historyBtn.addEventListener(
    "click",
    historyBarController.toggleHistoryModal.bind(historyBarController)
  );
  closeBtn.addEventListener(
    "click",
    historyBarController.closeHistoryModal.bind(historyBarController)
  );
  deleteBtn.addEventListener(
    "click",
    historyBarController.showAlert.bind(historyBarController)
  ); //지우는 상황 전달
}
// -----------------------------
function findContainClass(button, target) {
  return button.classList.contains(target);
}

function registerAddTaskEvent(section) {
  const addBtn = section.querySelector(".add-task-btn");
  const taskModal = section.querySelector(".task-modal-overlay");
  addBtn.addEventListener("click", () => {
    inputModal.toggleModal(taskModal);
  });
}
