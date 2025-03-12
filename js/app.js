// KanbanStore, PanelStore는 싱글톤 패턴을 적용하기 위해 IIFE 적용. 따라서 호출 없음
import KanbanStore from './components/kanban-store.js';
import PanelStore from './components/panel-store.js';
import { initEventHandlers } from './components/event-handler.js';

initEventHandlers();