import { renderActivityRecords } from './renderer.js';
import { initActivityHandlers } from './handlers.js';
import { fetchAndStoreActivityData, getActivityData } from './store.js';

async function initializeActivity() {
  await fetchAndStoreActivityData();
  const activityData = getActivityData();

  renderActivityRecords(activityData);
  initActivityHandlers();
}

export { initializeActivity };
