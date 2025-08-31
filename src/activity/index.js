import { renderActivityRecords, updateActivityCounter } from './renderer.js';
import { initActivityHandlers } from './handlers.js';
import activityStore from './store.js';

async function initializeActivity() {
  await activityStore.fetchAndStoreActivityData();
  const activityData = activityStore.getActivityData();

  renderActivityRecords(activityData);
  updateActivityCounter(activityData);
  initActivityHandlers();

  activityStore.subscribe(renderActivityRecords);
  activityStore.subscribe(updateActivityCounter);
}

export { initializeActivity };
