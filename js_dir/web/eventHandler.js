import { DeleteAlert } from "../component/deleteAlertModal.js";
import { inputModal } from "../component/inputModalUi.js";
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
    if (findContainClass(button, "register-button")) {
      //데이터 추가한 사실을 컨트롤러에게 전달
      inputModalController.processAddTask(button);
    } else if (findContainClass(button, "cancel-button")) {
      inputModal.clearAndClose(button);
    } else if (findContainClass(button, "delete-task-btn")) {
      //컨트롤러에게 상황 전달 -> 삭제 모달 만들어서 띄워야함,, 이때 클릭한 모달의 id,section을 기억해야한다.
      taskModal.showDeleteModal(button);
    } else if (button.id === "cancel-button") {
      DeleteAlert.closeDeleteModal();
    } else if (button.id === "confirm-delete-button") {
      taskModal.deleteTaskModal();
    }
  });
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
