import { fetchData } from '../shared/utils/fetch.js';

const ACTIVITY_DATA_URL = './data/activityData.json';

let activityData = null;

async function fetchAndStoreActivityData() {
  activityData = await fetchData(ACTIVITY_DATA_URL);
}

function getActivityData() {
  return activityData;
}

function clearActivityData() {
  activityData = [];
}

function addActivity({ action, task, timeStamp, details = {} }) {
  const activity = {
    username: '멋진곰',
    task,
    timeStamp,
    profileImage: './assets/images/default_profile.jpg',
    action,
    details,
  };

  activityData.unshift(activity);
}

export {
  getActivityData,
  clearActivityData,
  fetchAndStoreActivityData,
  addActivity,
};
