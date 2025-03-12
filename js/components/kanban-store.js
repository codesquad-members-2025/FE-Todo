import { renderKanban } from './kanban-renderer.js';

const Store = (function () {
    let kanbanNodes = null;

    if (kanbanNodes === null) initStore();

    const setData = ({columns}) => {
        kanbanNodes = columns;
    }

    const getData = () => {
        return kanbanNodes;
    }

    const render = () => {
        renderKanban(kanbanNodes);
    }

    return { setData, getData, render }
})();

function initStore() {
    fetch(".././data/mock.json")
        .then(response => response.json())
        .then(data => {
            Store.setData(data);
            Store.render();
        })
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}

export default Store;