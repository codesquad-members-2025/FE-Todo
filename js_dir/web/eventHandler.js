import { inputModal } from "../component/inputModalUi.js";
import { inputModalController } from "../controller/inputmodalController.js";
//얘도 아래의 kanban에 이벤트 위임으로 넣어보자(리팩토링 사항)
export const initialize = function () {
  const sections = document.querySelectorAll(".columnlist__col");
  sections.forEach((section) => {
    registerAddTaskEvent(section);
  });
};

function kanbanDetector() {
  //이벤트 위임
  const body = document.querySelector(".top-layout-container");
  body.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    //✅ 카드 추가
    if (findContainClass(button, "register-button")) {
      //데이터 추가한 사실을 컨트롤러에게 전달
      inputModalController.processAddTask(button);
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
    inputModal.toggle(taskModal);
  });
}
