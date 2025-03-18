import { editModal } from "../template/template.js";

export const inputModal = {
  //모달 토글기능
  //등록 버튼 클릭시 input값 삭제 기능
  toggleModal: function (targetModal) {
    targetModal.classList.toggle("active");
  },
  resetFields: function (modal) {
    modal.querySelector(".title-input").value = null;
    modal.querySelector(".content-input").value = null;
  },
  closeModal: function (modal) {
    modal.classList.remove("active");
  },
  clearAndClose: function (button) {
    const modal = button.closest(".task-modal-overlay");
    this.resetFields(modal);
    this.closeModal(modal);
  },
  createInputModal: function (title, content) {
    const inputModal = document.createElement("div"); // <div> 요소 생성
    inputModal.classList.add("task-modal-overlay");
    inputModal.innerHTML = editModal(title, content);
    inputModal.style.display = "block";
    return inputModal;
  },
};
