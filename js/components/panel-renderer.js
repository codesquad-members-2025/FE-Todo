import { createLogNode } from './template-utils.js';

function renderPanel(logs) {
    const logNodes = logs.reduce((fragment, logObj) => {
        fragment.appendChild(createLogNode(logObj));
        return fragment;
    }, getFragment());

    document.querySelector('.history-panel__list').appendChild(logNodes);
}

function getFragment() {
    return document.createDocumentFragment();
}

export { renderPanel };