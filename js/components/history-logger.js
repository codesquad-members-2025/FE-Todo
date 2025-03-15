import panelStore from '../store/panel-store.js';
import KanbanStore from '../store/kanban-store.js';

export default function createLogEntry(type, { cardId, columnId = '', afterColumnId = '' }) {
    const textInfo = KanbanStore.getTextInfo({ cardId, columnId, afterColumnId });
    const logEntry = {
        iconName: 'flog.png',
        userName: 'Nago',
        text: createText(type, textInfo),
        datetime: getISODate(new Date()),
    }
    panelStore.addLogEntry(logEntry);
}

function createText(type, { cardTitle, columnTitle, afterColumnTitle }) {
    return {
        addCard: `${S(cardTitle)}을(를) ${S(columnTitle)}에 ${S('등록')}하였습니다.`,
        removeCard: `${S(cardTitle)}을(를) ${S(columnTitle)}에서 ${S('제거')}하였습니다.`,
        editCard: `${S(cardTitle)}을(를) ${S('변경')}하였습니다.`,
        moveCard: `${S(cardTitle)}을(를) ${S(columnTitle)}에서 ${S(afterColumnTitle)} ${S('이동')}하였습니다.`,
        addColumn: `${S(columnTitle)}을(를) ${S('등록')}하였습니다.`,
        removeColumn: `${S(columnTitle)}을(를) ${S('제거')}하였습니다.`,
        editColumn: `${S(columnTitle)}을(를) ${S('변경')}하였습니다.`,
    }[type];
}

function S(text) {
    return `<strong>${text}</strong>`;
}

function getISODate(date) {
    const pad = num => String(num).padStart(2, '0');
    
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}