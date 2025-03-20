import { fetchData } from '../shared/utils/fetch.js';

const ACTIVITY_DATA_URL = './data/activityData.json';

class ActivityStore {
  constructor() {
    this.activityData = [];
  }

  async fetchAndStoreActivityData() {
    this.activityData = await fetchData(ACTIVITY_DATA_URL);
  }

  getActivityData() {
    return this.activityData;
  }

  clearActivityData() {
    this.activityData = [];
  }

  addActivity({ action, task, timeStamp, details = {} }) {
    const activity = {
      username: '멋진곰',
      task,
      timeStamp,
      profileImage: './assets/images/default_profile.jpg',
      action,
      details,
    };

    this.activityData.unshift(activity);
  }
}

const activityStore = new ActivityStore();

export default activityStore;
