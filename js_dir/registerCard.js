import { makeTaskCard } from "./template/template.js";
import {
  showAlert,
  closeAlert,
  deleteModal,
  getStoredModalData,
} from "./deleteCardHandler.js";

//이벤트 위임
const body = document.querySelector(".top-layout-container");
body.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  //✅ 카드 추가
  if (findContainClass(button, "register-button")) {
    const inputData = getModalInputValues(button); //상태변경
    const taskObj = createTaskData(inputData); //상태변경
    saveTasks(inputData.columnType, taskObj);
    //위에는 유저가 스토어에 저장하는 과정

    //아래는 스토어에서 받아와야하는것 근데 지금은 스코프에 있으니까 쓰는거
    const cardForm = makeTaskCard(
      taskObj.id,
      inputData.titleValue,
      inputData.contentValue
    );
    //스코프에 있던 정보 이용해서 dom API로 조작하는거
    drawModal(inputData.columnType, cardForm);
    clearInputFields(button);
    closeTaskModal(button);
  }
  //✅ 카드 삭제
  else if (findContainClass(button, "cancel-button")) {
    closeTaskModal(button);
    clearInputFields(button);
  } else if (findContainClass(button, "delete-task-btn")) {
    const modalId = button.closest(".todo-card").id;
    const modalSection = button.closest(".columnlist__col").dataset.type;
    showAlert(modalId, modalSection);
  } else if (button.id === "cancel-button") {
    closeAlert();
  } else if (button.id === "confirm-delete-button") {
    const { id, section } = getStoredModalData();
    deleteModal(section, id);
    closeAlert();
  }

  //이벤트 핸들러 들어갈 공간
});

// -----------------------------
function findContainClass(button, target) {
  return button.classList.contains(target);
}
// 입력값을 가져오는 함수 (컨트롤러에서 상태 변경 읽어오는 역할)
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
  if (!tasks[columnType]) tasks[columnType] = {}; //객체로 초기화
  tasks[columnType][taskObject.id] = {
    title: taskObject.title,
    content: taskObject.content,
  };
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//카드 템플릿 이용해 카드HMTL을 만드는 함수
// function makeCardForm() {}

//이렇게 하면 로컬 스토리지에 데이터 저장은 완료.
//이제b 칼럼 영역에 카드를 뿌려야 한다.
function drawModal(dataTarget, cardForm) {
  const newElement = document.createElement("div");
  newElement.innerHTML = cardForm;
  const targetSection = document
    .querySelector(`.columnlist__col[data-type=${dataTarget}]`)
    .querySelector(".task-list");
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
