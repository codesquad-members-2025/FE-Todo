import { fetchData } from '../js/utils/fetch.js';

const ACTIVITY_DATA_URL = './data/activityData.json';

let activityData = null;

async function loadActivityData() {
  if (activityData === null) {
    activityData = await fetchData(ACTIVITY_DATA_URL);
  }
  return activityData;
}

export { loadActivityData };
