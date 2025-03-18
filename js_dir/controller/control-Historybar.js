import { historyModalUi } from "../component/historyModal.js";
import { DeleteAlert } from "../component/deleteAlertModal.js";
import { store } from "../store/store.js";
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
    DeleteAlert.closeDeleteModal();
  },
  deleteLog: function () {
    historyModalUi.deleteHistory();
  },
  addRegisterLog: function (taskDataArr) {
    const [title, columnType, id] = taskDataArr;
    historyModalUi.makeRegisterLog(title, columnType, id, "등록");
    historyModalUi.drawRegisterLog();
    store.addLog(title, columnType, id, "등록");
  },
  renderLogData: function () {
    const storedLogData = store.getLogData();
    storedLogData.forEach((logDataArr) => {
      historyModalUi.makeRegisterLog(...logDataArr);
      historyModalUi.drawRegisterLog();
    });
  },
};

//밀리세컨즈
