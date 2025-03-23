import { historyLogComponent } from "./history_log_component.js";

export const historyLogsComponent = (logs) => {
  return logs.map((log) => historyLogComponent(log)).join("");
};
