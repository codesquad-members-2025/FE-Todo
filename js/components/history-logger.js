import panelStore from '../store/panel-store.js';

function createLogEntry(type, { cardId = null, columnId = null, afterColumnId = null }) {
    const textInfo = panelStore.getTextInfo(type, { cardId, columnId, afterColumnId });
    const logEntry = {
        iconName: 'flog.png',
        userName: '나고',
        text: createText(type, textInfo),
        datetime: getISODate(new Date()),
    }
    panelStore.addLogEntry(logEntry);
}


// type이 받을 매개변수 종류
// addCard, addColumn, editCard, removeCard, removeColumn  => { cardId, columnId }
// editCard => { cardId }
// moveCard => { cardId, columnId, afterColumnId }
// undo, redo => { ? }

// 반환되는 값 종류
// addCard, addColumn, editCard, removeCard, removeColumn  => { cardTitle, columnTitle }
// editCard => { cardTitle }
// moveCard => { cardTitle, columnTitle, afterColumnTitle }
// undo, redo => { ? }

// 하나로 퉁친다면?
function createText(type, { cardTitle, columnTitle, afterColumnTitle }) {
    if (type === 'addCard')           return `${S(cardTitle)}을(를) ${S(columnTitle)}에 ${S('등록')}하였습니다.`;
    else if (type === 'removeCard')   return ``;
    else if (type === 'editCard')     return ``;
    else if (type === 'moveCard')     return ``;
    else if (type === 'addColumn')    return ``;
    else if (type === 'removeColumn') return ``;
    else if (type === 'editColumn')   return ``;
    else if (type === 'undo')         return ``;
    else if (type === 'redo')         return ``;
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
    const pad = num => String(num).padStart(2, '0');
    
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default createLogEntry;