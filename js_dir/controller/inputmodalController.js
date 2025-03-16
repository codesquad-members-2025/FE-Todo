import { taskCard } from "../component/CardUi.js";
import { store } from "../store/store.js";
import { taskCard } from "../component/CardUi.js";

export const inputModalController = {
  getValues: function (button) {
    const modal = button.closest(".task-modal");
    const titleValue = modal.querySelector(".title-input").value.trim();
    const contentValue = modal.querySelector(".content-input").value.trim();
    const columnType = modal.closest(".task-modal-overlay").dataset.type;
    return { columnType, titleValue, contentValue };
  },
  /*
  기본적으로 등록버튼 비활성화,, 이 로직이 참으로 바뀌면 버튼 활성화
  validateInput: function (inputData) {
    if (!inputData.titleValue || !inputData.contentValue) {
      //버튼 비활성화 로직
      return false;
    }
    return true;
  },
  */

  createTaskData: function (inputData) {
    const id = Date.now().toString();
    return {
      id,
      title: inputData.titleValue,
      content: inputData.contentValue,
    };
  },

  processInput: function (button) {
    const inputData = this.getValues(button);
    const taskObj = this.createTaskData(inputData);
    return [inputData, taskObj];
  },

  //얘가 이 컨트롤러의 main로직
  processAddTask: function (button) {
    const [inputData, taskObj] = this.processInput(button);
    store.addTask(inputData.columnType, taskObj);
    const { id, title, content } = taskObj;
    taskCard.create(id, title, content);
    taskCard.draw(inputData.columnType);
  },
};
