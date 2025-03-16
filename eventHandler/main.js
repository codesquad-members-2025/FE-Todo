import { fetchData } from "./view.js";
import { historyEvent } from "./historyList.js";
import { eventAddCard } from "./column.js";
import { eventDelete } from "./deleteForm.js";
import { update } from "./updateForm.js";

historyEvent();
fetchData();
eventAddCard();
eventDelete();
update();
