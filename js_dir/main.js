import { SidebarController } from "./control-Historybar.js";
import { initialize } from "./control-mainHeader.js";
import { renderCards } from "./renderCards.js";

initialize();
SidebarController.initialize();

document.addEventListener("DOMContentLoaded", () => {
  renderCards(); // 🚀 새로고침 시 자동 실행
});
