// initKanban, initHistory는 export default
import initKanban from "./controllers/kanban-eventHandler.js";
import initHistoryPanel from "./controllers/panel-eventHandler.js";
// initModal은 named export
import { initModal } from "./controllers/modal-eventHandler.js";

function initEventHandlers() {
    initKanban();
    initHistoryPanel();
    initModal();
}

initEventHandlers();