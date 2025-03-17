import { makeDeleteAlert } from "./template.js";
const alertModal = document.getElementById("delete-history__modal");
let storedModalData = {};
export function showAlert(modalId, modalSection) {
  storedModalData = { id: modalId, section: modalSection };
  const alertMessage = "선택한 카드를 삭제할까여?";
  const cancel = "유지";
  const deleteAlert = makeDeleteAlert(alertMessage, cancel);
  alertModal.innerHTML = deleteAlert;
  alertModal.showModal();
}
export function getStoredModalData() {
  return storedModalData;
}
export function closeAlert() {
  alertModal.close();
}

// 삭제 버튼이벤트 핸들러
function deleteHandler() {}

// function findModalId(target) {
//   return target.closest(".todo-card").id;
// }

function deleteModalData(dataType, id) {
  const storedData = localStorage.getItem("tasks");
  const tasks = JSON.parse(storedData);
  delete tasks[dataType][id];
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteModalUi(id) {
  const cardModal = document.getElementById(id).parentElement;
  cardModal.remove();
}

export function deleteModal(dataType, id) {
  deleteModalData(dataType, id);
  deleteModalUi(id);
}
