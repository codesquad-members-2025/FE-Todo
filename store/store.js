import { changeColumnName } from "../eventHandler/createForm.js";
import { addHistoryRecord } from "../eventHandler/view.js";

export const store = {
  state: { columns: [], historyList: [] },

  fetchData(callback) {
    fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.state.columns = data.columns;
        this.state.historyList = data.historyList;
        callback();
      })
      .catch((error) => console.error("오류 발생:", error));
  },

  addCard(columnId, title, content, author = "author by web") {
    const newCard = { title, content, author };
    this.state.columns.forEach((objCol) => {
      if (objCol.id !== columnId) return;
      objCol.cardList.unshift(newCard);
    });
    let ColumnNameInKorean = changeColumnName(columnId);
    this.addHistory("ADD_CARD", title, ColumnNameInKorean);
    addHistoryRecord(this.state.historyList[0]);
  },

  addHistory(action, title, fromColumn, toColumn = null) {
    const historyRecord = {
      photo: "./images/sam.png",
      userName: "@멋진삼",
      action: `${action}`,
      title: `${title}`,
      fromColumn: `${fromColumn}`,
      toColumn: `${toColumn}`,
      timeStamp: new Date(),
    };
    this.state.historyList.unshift(historyRecord);
  },
};
