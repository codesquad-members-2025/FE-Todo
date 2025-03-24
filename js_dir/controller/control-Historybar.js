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
    store.removeLogs();
  },
  addHisotryLog: function (taskDataArr, action, targetColumn = "null") {
    const [title, currentColumn, id] = taskDataArr;
    const lodDataArr = [title, currentColumn, targetColumn, id, action];
    store.addLog(lodDataArr);
    if (action === "이동") {
      historyModalUi.makeRegisterLog({
        title: title,
        currentColumn: currentColumn,
        targetColumn: targetColumn,
        id: id,
        action: action,
      });
    } else {
      historyModalUi.makeRegisterLog({
        title: title,
        currentColumn: currentColumn,
        id: id,
        action: action,
      });
    }

    historyModalUi.drawRegisterLog();
  },
  renderLogData: function () {
    const storedLogData = store.getLogData();
    storedLogData.forEach((logDataArr) => {
      const [title, currentColumn, targetColumn, id, action] = logDataArr; //먼저 구조분해 할당

      historyModalUi.makeRegisterLog({
        title,
        currentColumn,
        targetColumn,
        id,
        action,
      });
      historyModalUi.drawRegisterLog();
    });
  },
};
