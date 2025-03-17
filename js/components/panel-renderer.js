import { createLogNode, createPanelNode } from './template-utils.js';

function renderPanel(logs) {
    const PanelNode = createPanelNode(logs.length === 0 ? true : false);

    const logNodes = logs.reduce((fragment, logObj) => {
        fragment.appendChild(createLogNode(logObj));
        return fragment;
    }, getFragment());

    PanelNode.querySelector('.history-panel__list').appendChild(logNodes);
    
    document.querySelector('.history-panel__container').replaceChildren(PanelNode);
}

function getFragment() {
    return document.createDocumentFragment();
}

export { renderPanel };