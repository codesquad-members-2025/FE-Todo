import { historyModalUi } from "../component/historyModal.js";
import { DeleteAlert } from "../component/deleteAlertModal.js";
export const historyBarController = {
  toggleHistoryModal: function () {
    historyModalUi.toggleSidebar();
  },
  closeHistoryModal: function () {
    historyModalUi.closeSidebar();
  },
  showAlert: function () {
    DeleteAlert.makeAlert(
      "historyModal",
      "모든 사용자 활동 기록을 삭제할까요?",
      "취소"
    );
    DeleteAlert.showDeleteModal();
  },
  closeAlert: function () {
    DeleteAlert.closeDeleteModal;
  },
  deleteLog: function () {
    historyModalUi.deleteHistory();
  },
};
