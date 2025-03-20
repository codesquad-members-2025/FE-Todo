import { renderActivityRecords } from './renderer.js';
import { initActivityHandlers } from './handlers.js';
import activityStore from './store.js';

async function initializeActivity() {
  await activityStore.fetchAndStoreActivityData();
  const activityData = activityStore.getActivityData();

  renderActivityRecords(activityData);
  initActivityHandlers();

  activityStore.subscribe(renderActivityRecords);
}

export { initializeActivity };
