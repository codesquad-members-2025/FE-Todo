import { columnComponent } from "./column_component";

export const columnsComponent = (data) => {
  const { columns } = data;
  return columns.map((column) => columnComponent(column)).join("");
};
