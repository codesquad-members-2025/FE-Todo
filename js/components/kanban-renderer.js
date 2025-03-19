import { createColumnNode, createCardNode } from './template-utils.js';

function createKanbanVirtualDOM(columns) {
    return columns.reduce((fragment, columnObj) => {
        const { id, title, cards } = columnObj;
        const count = cards.length;
        const columnNode = createColumnNode(id, title, count);

        cards.forEach(card => {
            columnNode.appendChild(createCardNode(card));
        });

        fragment.appendChild(columnNode);
        return fragment;
    }, getFragment());
}

function renderKanbanDOM(virtualDOM) {
    document.querySelector('.kanban').replaceChildren(virtualDOM);
}

function updateKanbanBoard(columns) {
    const virtualDOM = createKanbanVirtualDOM(columns);
    renderKanbanDOM(virtualDOM);
}

function getFragment() {
    return document.createDocumentFragment();
}

export { updateKanbanBoard, createKanbanVirtualDOM }