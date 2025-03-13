import { renderKanban } from './kanban-renderer.js';

const Store = (function () {
    let kanbanNodes = null;

    if (kanbanNodes === null) initStore();

    const setData = ({ columns }) => {
        kanbanNodes = columns;
    }

    const renderData = () => {
        renderKanban(kanbanNodes);
    }

    const addCard = (columnId, cardData) => {
        const column = _findColumn(columnId);
        if (!column) throw new Error(`Column not found: ID "${columnId}"`);
        column.cards.push(_createCard(cardData));

        renderData();
    }
    
    const removeCard = (columnId, cardId) => {
        let curColumn = _findColumn(columnId);
        curColumn.cards = curColumn.cards.filter(card => card.id !== cardId);

        renderData();
    }
    
    const _createCard = ({ id, title, description, author }) => {
        return {
            "id": id,
            "title": title,
            "description": description,
            "author": author
        }
    }
    
    const _findColumn = (columnId) => {
        return kanbanNodes.find(column => column.id === columnId);
    }

    return {
        setData,
        renderData,
        addCard,
        removeCard,
    }
})();

function initStore() {
    fetch(".././data/mock.json")
        .then(response => response.json())
        .then(data => {
            Store.setData(data);
            Store.renderData();
        })
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}

export default Store;