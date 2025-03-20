import { init } from "./view.js";
import { historyEvent } from "./historyList.js";
import { initializeColumn, updateCardHandler } from "./column.js";

historyEvent();
init();
initializeColumn();
updateCardHandler();
