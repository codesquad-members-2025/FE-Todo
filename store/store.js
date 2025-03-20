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
    const column = this.state.columns.find((objCol) => objCol.id === columnId);
    const newCard = { title, content, author };
    column.cardList.unshift(newCard);
    column.count++;
    this.addHistory("ADD_CARD", title, columnId);
    console.log(this.state.columns, this.state.historyList);
  },

  addHistory(action, title, fromColumn, toColumn = null) {
    const historyRecord = {
      photo: "./images/sam.png",
      userName: "@멋진삼",
      action: `${action}`,
      title: `${title}`,
      fromColumn: `${fromColumn}`,
      toColumn: `${toColumn}`,
      timeStemp: new Date().toLocaleString(),
    };
    this.state.historyList.unshift(historyRecord);
  },
};
