import { makeTaskCard } from "./template.js";

const main = document.querySelector(".page-main__columnlist");
main.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.classList.contains("register-button")) {
    const inputData = getModalInputValues(button);
    const taskObj = createTaskData(inputData);
    saveTasks(inputData.columnType, taskObj);
    const cardForm = makeTaskCard(inputData.titleValue, inputData.contentValue);
    drawModal(inputData.columnType, cardForm);
    clearInputFields(button);
  } else if (button.classList.contains("cancel-button")) {
    closeTaskModal(button);
    clearInputFields(button);
  }

  //이벤트 핸들러 들어갈 공간
});

// -----------------------------

// 입력값을 가져오는 함수
function getModalInputValues(button) {
  const modal = button.closest(".task-modal");

  const titleValue = modal.querySelector(".title-input").value.trim();
  const contentValue = modal.querySelector(".content-input").value.trim();
  const columnType = modal.closest(".task-modal-overlay").dataset.type;
  return { columnType, titleValue, contentValue };
}
// 모달 입력값을 객체로 변환하는 함수
function createTaskData(inputData) {
  const id = Date.now().toString();
  const taskObject = {
    id,
    title: inputData.titleValue,
    content: inputData.contentValue,
  };
  return taskObject;
}
//---------------------------

//dataType에는 컬럼의 데이터 타입 속성이, task에는 객체가 들어간다.
function saveTasks(columnType, taskObject) {
  const storedData = localStorage.getItem("tasks");
  const tasks = storedData ? JSON.parse(storedData) : {};
  if (!tasks[columnType]) tasks[columnType] = [];
  tasks[columnType].push(taskObject);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//카드 템플릿 이용해 카드HMTL을 만드는 함수
// function makeCardForm() {}

//이렇게 하면 로컬 스토리지에 데이터 저장은 완료.
//이제 칼럼 영역에 카드를 뿌려야 한다.
function drawModal(dataTarget, cardForm) {
  const newElement = document.createElement("div");
  newElement.innerHTML = cardForm;
  const targetSection = document.querySelector(
    `.columnlist__col[data-type=${dataTarget}]`
  );
  targetSection.appendChild(newElement);
}

function clearInputFields(button) {
  const modal = button.closest(".task-modal");
  modal.querySelector(".title-input").value = null;
  modal.querySelector(".content-input").value = null;
}

function closeTaskModal(button) {
  const modal = button.closest(".task-modal-overlay");
  modal.classList.toggle("active");
}
