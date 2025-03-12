import { renderPanel } from './panel-renderer.js';

const Store = (function () {
    let historyLogs = null;

    if (historyLogs === null) initStore();

    const setData = ({logs}) => {
        historyLogs = logs;
    }

    const getData = () => {
        return historyLogs;
    }

    const render = () => {
        renderPanel(historyLogs);
    }

    return { setData, getData, render }
})();

function initStore() {
    fetch(".././data/mockPanel.json")
        .then(response => response.json())
        .then(data => {
            Store.setData(data);
            Store.render();
        })
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}

export default Store;