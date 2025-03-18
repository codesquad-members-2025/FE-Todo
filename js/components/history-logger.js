import PanelStore from '../store/panel-store.js';
import KanbanStore from '../store/kanban-store.js';
import { getISODate } from '../utils/index.js'

export default function createLogEntry({ type, cardId, columnId = '', afterColumnId = '' }) {
    const textInfo = KanbanStore.getTextInfo({ cardId, columnId, afterColumnId });
    const logEntry = {
        iconName: 'flog.png',
        userName: 'Nago',
        text: createText(type, textInfo),
        datetime: getISODate(new Date()),
    }
    PanelStore.addLogEntry(logEntry);
}

function createText(type, { cardTitle, columnTitle, afterColumnTitle }) {
    return {
        cardAdd: `${S(cardTitle)}을(를) ${S(columnTitle)}에 ${S('등록')}하였습니다.`,
        cardRemove: `${S(cardTitle)}을(를) ${S(columnTitle)}에서 ${S('제거')}하였습니다.`,
        cardEdit: `${S(cardTitle)}을(를) ${S('변경')}하였습니다.`,
        cardMove: `${S(cardTitle)}을(를) ${S(columnTitle)}에서 ${S(afterColumnTitle)} ${S('이동')}하였습니다.`,
        columnRemove: `${S(columnTitle)}을(를) ${S('제거')}하였습니다.`,
    }[type];
}

function S(text) {
    return `<strong>${text}</strong>`;
}