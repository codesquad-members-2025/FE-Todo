import { fetchData } from "./view.js";
import { historyEvent } from "./historyList.js";
import { addCardHandler, updateCardHandler } from "./column.js";
import { deleteCardHandler } from "./deleteForm.js";

historyEvent();
fetchData();
addCardHandler();
deleteCardHandler();
updateCardHandler();
