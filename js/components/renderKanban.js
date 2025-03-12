import { createColumnNode, createCardNode } from './template.js';

function render(data) {
    const kanbanData = data.columns.reduce((fragment, columnObj) => {
        const { id, title, count, cards } = columnObj;
        const columnNode = createColumnNode(id, title, count);

        cards.forEach(card => {
            columnNode.appendChild(createCardNode(card));
        });

        fragment.appendChild(columnNode);

        return fragment;
    }, getFragment())

    document.querySelector('.kanban').appendChild(kanbanData);
}

function getFragment() {
    return document.createDocumentFragment();
}

export function initKanban() {
    fetch(".././data/mock.json")
        .then(response => response.json())
        .then(data => render(data))
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}