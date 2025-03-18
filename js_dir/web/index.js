// import { SidebarController } from "./control-Historybar.js";
// import { sectionHeaderInit } from "../controller/control-mainHeader.js";
// import { renderCards } from "./renderCards.js";

// sectionHeaderInit();
// SidebarController.initialize();

// document.addEventListener("DOMContentLoaded", () => {
//   renderCards(); // 🚀 새로고침 시 자동 실행
// });
import { store } from "../store/store.js";
import { initialize, kanbanDetector, historyBar } from "./eventHandler.js"; //??여기 다시 수정하기
import { taskModal } from "../controller/taskModalController.js";
import { historyBarController } from "../controller/control-Historybar.js";

await store.init();
store.logInit();
taskModal.renderTaskCards();
historyBarController.renderLogData();
initialize();
kanbanDetector();
historyBar();
document.addEventListener("DOMContentLoaded", () => {
  taskModal.renderTaskCards();
});
