import { fetchData } from '../js/utils/fetch.js';

const HISTORY_DATA_URL = './data/historyData.json';

let historyData = null;

async function loadHistoryData() {
  if (historyData === null) {
    historyData = await fetchData(HISTORY_DATA_URL);
  }
  return historyData;
}

export { loadHistoryData };
