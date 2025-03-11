import { setupClickDelegate } from "./body_eventDelegate.js";

export function initializeMainHeader() {
  setupClickDelegate("button", (el) => {
    const parentEl = el.parentElement.parentElement;
    const modalOverlay = parentEl.nextElementSibling;
    if (el.classList.contains("add-task-btn")) {
      modalOverlay.classList.add("active");
    } else {
      modalOverlay.classList.remove("active");
    }
  });
}
