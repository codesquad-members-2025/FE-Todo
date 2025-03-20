import { getData } from "./view.js";
import { historyEvent } from "./historyList.js";
import { initializeColumn, updateCardHandler } from "./column.js";

historyEvent();
getData();
initializeColumn();
updateCardHandler();
