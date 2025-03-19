import { fetchData } from "./view.js";
import { historyEvent } from "./historyList.js";
import { initializeColumn, updateCardHandler } from "./column.js";

historyEvent();
fetchData();
initializeColumn();
updateCardHandler();
