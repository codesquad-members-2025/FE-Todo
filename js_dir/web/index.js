// import { SidebarController } from "./control-Historybar.js";
// import { sectionHeaderInit } from "../controller/control-mainHeader.js";
// import { renderCards } from "./renderCards.js";

// sectionHeaderInit();
// SidebarController.initialize();

// document.addEventListener("DOMContentLoaded", () => {
//   renderCards(); // 🚀 새로고침 시 자동 실행
// });
import { store } from "../store/store.js";
import { initialize } from "./controller/control-mainHeader.js"; // 이벤트 핸들러 등록

document.addEventListener("DOMContentLoaded", () => {
  store.init();
  initialize();
});
