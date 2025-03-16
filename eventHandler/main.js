import { fetchData } from "./view.js";
import { historyEvent } from "./historyList.js";
import { eventAddCard, update } from "./column.js";
import { eventDelete } from "./deleteForm.js";

historyEvent();
fetchData();
eventAddCard();
eventDelete();
update();
