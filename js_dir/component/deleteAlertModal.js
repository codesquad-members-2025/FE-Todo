import { makeDeleteAlert } from "../template/template";

//현재 문제점 히스토리 삭제 모달밖에 못 만든다.(유연성 떨어짐)
//모달 삭제할때 띄울 기능도 추가해야함
//수정 완료
export const DeleteAlert = {
  deleteModal: document.getElementById("delete_modal"),

  makeAlert: function (alertMessage, cancel) {
    const alertModal = makeDeleteAlert(alertMessage, cancel);
    this.deleteModal.innerHTML = alertModal;
  },
  showDeleteModal: function () {
    this.deleteModal.showModal();
  },
  closeDeleteModal: function () {
    this.deleteModal.close();
  },
};
