import { fetchData } from '../shared/utils/fetch.js';

const ACTIVITY_DATA_URL = './data/activityData.json';

let activityData = null;

async function loadActivityData() {
  if (activityData === null) {
    activityData = await fetchData(ACTIVITY_DATA_URL);
  }
  return activityData;
}

function clearActivityData() {
  activityData = [];
}

export { loadActivityData, clearActivityData };

// 활동 기록 데이터 가져오기
export function getActivityData() {
  return activityData;
}
