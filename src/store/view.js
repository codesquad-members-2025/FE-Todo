import { Store } from "./store.js";
import { columnsComponent } from "../components/columns_component.js";
import { historyLogsComponent } from "../components/history_logs_component.js";

// 2) View 업데이트 함수
export const renderColumns = () => {
  const columnContainer = document.querySelector(".column-container");
  // Store에 있는 columns 데이터를 가져와서
  // columnsComponent 컴포넌트 함수(HTML 문자열 생성)를 호출
  columnContainer.innerHTML = columnsComponent(Store.getState().columns);
};

export const renderHistory = () => {
  const historyContainer = document.querySelector(".history-modal__content");
  historyContainer.innerHTML = historyLogsComponent(Store.getState().history);
};
