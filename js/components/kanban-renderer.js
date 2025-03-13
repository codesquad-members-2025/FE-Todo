import { createColumnNode, createCardNode } from './template-utils.js';

function renderKanban(columns) {
    const kanbanNodes = columns.reduce((fragment, columnObj) => {
        const { id, title, count, cards } = columnObj;
        const columnNode = createColumnNode(id, title, count);

        cards.forEach(card => {
            columnNode.appendChild(createCardNode(card));
        });

        fragment.appendChild(columnNode);

        return fragment;
    }, getFragment())

    document.querySelector('.kanban').replaceChildren(kanbanNodes);
}

function getFragment() {
    return document.createDocumentFragment();
}

export { renderKanban };