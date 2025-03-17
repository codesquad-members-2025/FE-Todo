import { makeDeleteAlert } from "../template/template.js";

export const DeleteAlert = {
  deleteModal: document.getElementById("delete_modal"),

  makeAlert: function (type, alertMessage, cancel) {
    const alertModal = makeDeleteAlert(type, alertMessage, cancel);
    this.deleteModal.innerHTML = alertModal;
  },
  showDeleteModal: function () {
    this.deleteModal.showModal();
  },
  closeDeleteModal: function () {
    this.deleteModal.close();
  },
};
