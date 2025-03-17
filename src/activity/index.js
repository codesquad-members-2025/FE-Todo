import { renderActivityRecords } from './renderer.js';
import { initActivityHandlers } from './handlers.js';
import { loadActivityData } from './store.js';

async function initializeActivity() {
  const activityData = await loadActivityData();
  renderActivityRecords(activityData);
  initActivityHandlers();
}

export { initializeActivity };
