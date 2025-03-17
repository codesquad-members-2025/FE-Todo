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
    const time = Math.floor((Date.now().toString() - id) / (1000 * 60));
    const registerLogData = historyModalUi.makeRegisterLog(
      title,
      columnType,
      time
    );
    historyModalUi.drawRegisterLog();
    store.addLog(registerLogData, id);
    store.setLogData();
  },
  renderLogData: function () {
    let logData = store.getLogData();
    logData.forEach(([logContent, id]) => {
      historyModalUi.makeRegisterLog;
    });
  },
};

//밀리세컨즈
