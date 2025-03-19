import { store } from "../store/store.js";
import { initialize, kanbanDetector, historyBar } from "./eventHandler.js";
import { taskModal } from "../controller/taskModalController.js";
import { historyBarController } from "../controller/control-Historybar.js";

await store.init();
store.logInit();
taskModal.renderTaskCards();
historyBarController.renderLogData();
initialize();
kanbanDetector();
historyBar();
// document.addEventListener("DOMContentLoaded", () => {
//   taskModal.renderTaskCards();
// });
