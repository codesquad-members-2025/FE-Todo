import KanbanStore from './kanban-store.js';
import { renderPanel } from '../components/panel-renderer.js';

const Store = (function () {
    let historyLogs = null;

    if (historyLogs === null) initStore();

    const setData = ({logs}) => {
        historyLogs = logs;
    }

    const addLogEntry = ({ iconName, userName, text, datetime }) => {
        historyLogs.unshift({
            iconName: iconName,
            userName: userName,
            text: text,
            datetime: datetime
        });

        renderData();
    }

    const getTextInfo = (type, { cardId, columnId, afterColumnId }) => {
        return {
            cardTitle: _getCardTitle(cardId),
            columnTitle: _getColumnTitle(columnId),
            afterColumnTitle: _getColumnTitle(columnId)
        }
    }

    const removeAllLogEntry = () => {
        historyLogs = [];

        renderData();
    }
 
    const renderData = () => {
        renderPanel(historyLogs);
    }

    const _getCardTitle = (cardId) => {
        return KanbanStore.getCardTitle(cardId);
    }

    const _getColumnTitle = (columnId) => {
        return KanbanStore.getColumnTitle(columnId)
    }

    return { setData, addLogEntry, renderData, removeAllLogEntry, getTextInfo };
})();

function initStore() {
    fetch(".././data/mockPanel.json")
        .then(response => response.json())
        .then(data => {
            Store.setData(data);
            Store.renderData();
        })
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}

export default Store;