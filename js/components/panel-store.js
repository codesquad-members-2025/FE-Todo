import { renderPanel } from './panel-renderer.js';

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

    const removeAllLogEntry = () => {
        historyLogs = [];

        renderData();
    }
 
    const renderData = () => {
        renderPanel(historyLogs);
    }

    return { setData, addLogEntry, renderData, removeAllLogEntry };
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