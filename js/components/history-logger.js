import panelStore from './panel-store.js';

export function addLogEntry(type, { cardTitle, columnTitle, beforeColTitle, afterColTitle }) {
    const data = {
        iconName: 'flog.png',
        userName: '나고',
        text: getLogText(type, { cardTitle, columnTitle, beforeColTitle, afterColTitle }),
        datetime: getISODate(new Date()),
    }
    return panelStore.addLogEntry(data);
}

function getLogText(type, { cardTitle, columnTitle, beforeColTitle, afterColTitle }) {
    if (type === 'add') return createAddLog(cardTitle, columnTitle);
    else if (type === 'remove') return createRemoveLog(cardTitle, columnTitle);
    else if (type === 'update') return createUpdateLog(cardTitle);
    else if (type === 'move') return createMoveLog(cardTitle, beforeColTitle, afterColTitle);
}

function createAddLog(cardTitle, columnTitle) {
    return `${S(cardTitle)}을(를) ${S(columnTitle)}에 ${S('등록')}하였습니다.`;
}

function createRemoveLog(cardTitle, columnTitle) {
    return `${S(cardTitle)}을(를) ${S(columnTitle)}에서 ${S('제거')}하였습니다.`;
}

function createUpdateLog(cardTitle) {
    return `${S(cardTitle)}을(를) ${S('변경')}하였습니다.`;
}

function createMoveLog(cardTitle, beforeColTitle, afterColTitle) {
    return `${S(cardTitle)}을(를) ${S(beforeColTitle)}에서 ${afterColTitle} ${S('이동')}하였습니다.`;
}

function S(text) {
    return `<strong>${text}</strong>`;
}

function getISODate(date) {
    return date.toISOString().slice(0, 19); // 초 단위까지 자르고 Z 제거
}