import { createLogNode } from './template.js';

function renderPanel(data) {
    const logData = data.logs.reduce((fragment, logObj) => {
        fragment.appendChild(createLogNode(logObj));
        return fragment;
    }, getFragment());

    document.querySelector('.history-panel__list').appendChild(logData);
}

function getFragment() {
    return document.createDocumentFragment();
}

export function initPanel() {
    fetch(".././data/mockPanel.json")
        .then(response => response.json())
        .then(data => renderPanel(data))
        .catch(error => console.error(`데이터 로드 오류: ${error})`));
}