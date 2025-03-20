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
};
