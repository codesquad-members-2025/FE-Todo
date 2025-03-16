import { makeDeleteAlert } from "../template/template.js";

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
