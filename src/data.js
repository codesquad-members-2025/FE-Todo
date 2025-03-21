import { renderColumns } from "./store/view.js";
import { Store } from "./store/store.js";

export const dataInitialize = async () => {
  try {
    const response = await fetch("/data/mock.json");
    const data = await response.json();
    const { columns } = data;

    columns.forEach((column) => {
      if (!column.cards) column.cards = [];
    });

    Store.state.columns = columns;
    Store.initializeIdCounters();
    renderColumns();
  } catch (error) {
    console.error("데이터 로드 에러:", error);
  }
};
