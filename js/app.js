import { initKanban } from './components/kanban-renderer.js'
import { initPanel } from './components/panel-renderer.js'
import { initEventHandlers } from './components/event-handler.js';

initPanel();
initKanban();
initEventHandlers();