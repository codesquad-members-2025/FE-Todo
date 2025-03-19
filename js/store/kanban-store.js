import { updateKanbanBoard } from '../components/kanban-renderer.js';

const Store = (function () {
    let kanbanNodes = null;

    if (kanbanNodes === null) initStore();

    const setData = ({ columns }) => {
        kanbanNodes = columns;
        renderData();
    }

    const renderData = () => {
        updateKanbanBoard(kanbanNodes);
    }

    const addCard = (columnId, cardData) => {
        const column = _findColumn({ columnId: columnId });
        column.cards.unshift(_createCard(cardData));
        renderData();
    }

    const removeCard = (cardId) => {
        let curColumn = _findColumn({ cardId: cardId });
        curColumn.cards = curColumn.cards.filter(card => card.id != cardId);
        renderData();
    }

    const removeColumn = (columnId) => {
        kanbanNodes = kanbanNodes.filter(column => column.id != columnId)
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

    const _findColumn = ({ columnId = null, cardId = null}) => {
        // 컬럼 아이디가 있을 경우
        if (columnId) return kanbanNodes.find(column => column.id == columnId);
        // 카드 아이디만 있을 경우
        else if (cardId) {
            return kanbanNodes.find(column => {
                return column.cards.find(card => card.id == cardId);
            });
        }
    }

    // history-Logger에서 사용되는 함수
    const getTextInfo = ({ cardId, columnId, afterColumnId }) => {
        return {
            cardTitle: cardId ? _getCardTitle(cardId) : '',
            columnTitle: columnId ? _getColumnTitle(columnId) : '',
            afterColumnTitle: afterColumnId ? _getColumnTitle(afterColumnId) : ''
        }
    }

    const _getCardTitle = (cardId) => {
        let curColumn = _findColumn({ cardId: cardId });
        return curColumn.cards.find(card => card.id == cardId).title;
    }

    const _getColumnTitle = (columnId) => {
        return kanbanNodes.find(column => column.id == columnId).title;
    }

    return {
        setData,
        renderData,
        addCard,
        removeCard,
        removeColumn,
        getTextInfo
    }
})();

function initStore() {
    fetch(".././mock/kanban.json")
        .then(response => response.json())
        .then(data => Store.setData(data))
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}

export default Store;