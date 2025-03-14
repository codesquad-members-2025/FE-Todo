// initKanban, initHistory는 export default
import initKanban from "./kanban-eventHandler.js";
import initHistoryPanel from "./panel-eventHandler.js";
// initModal은 named export
import { initModal } from "./modal-eventHandler.js";

function initEventHandlers() {
    initKanban();
    initHistoryPanel();
    initModal()
}

export default initEventHandlers;