import { columnComponent } from "./column_component";

export const columnsComponent = (data) => {
  return data.map((column) => columnComponent(column)).join("");
};
