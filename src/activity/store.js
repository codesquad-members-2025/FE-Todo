import { fetchData } from '../shared/utils/fetch.js';
import observer from '../shared/utils/observer.js';

const ACTIVITY_DATA_URL = './data/activityData.json';

class ActivityStore extends observer {
  constructor() {
    super();
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
    this.notify(this.activityData); // 구독한 랜더함수 실행
  }
}

const activityStore = new ActivityStore();

export default activityStore;
