function templateToNode(template) {
    const container = document.createElement('div')
    container.innerHTML = template;
    return container.firstElementChild;
}

function createColumnNode(id, title, count) {
    return templateToNode(`
    <section class="column flex-column" data-id="${id}">
        <header class="column-header flex-between">
            <div class="column-header__text-area flex-center">
                <h2 class="column-header__title display-bold16">${title}</h2>
                <span class="badge flex-center">
                    <span class="badge__text display-medium12">${count}</span>
                </span>
            </div>
            <div class="column-header__buttons flex-center">
                <button class="column-header__add-btn btn">
                    <img src="./assets/icons/plus.svg">
                </button>
                <button class="column-header__close-btn btn"> 
                    <img src="./assets/icons/close.svg">
                </button>
            </div>
        </header>

        <article class="card card-form flex-column hidden">
            <div class="card__input-area flex-column">
                <input type="text" class="card__title-input display-bold14" placeholder="제목을 입력하세요">
                <textarea class="card__body-input display-medium14" placeholder="내용을 입력하세요"></textarea>
            </div>
            <div class="card__button-area">
                <button type="button" class="card__cancel-btn btn display-bold14">취소</button>
                <button type="submit" class="card__submit-btn btn display-bold14">등록</button>
            </div>
        </article>
    </section>
    `);
}

function createCardNode({ id = getRandomId(), title, description, author = 'web' }) {
    return templateToNode(`
    <article class="card flex-between" data-id="${id}">
        <div class="card__content flex-column">
            <div class="card__text flex-column">
                <h3 class="card__title display-bold14">${title}</h3>
                <p class="card__description display-medium14">${description}</p>
            </div>
            <p class="card__caption display-medium12">author by ${author}</p>
        </div>
        <div class="card__icon-buttons">
            <button class="card__close-btn btn">
                <img src="./assets/icons/close.svg">
            </button>
            <button class="card__edit-btn btn">
                <img src="./assets/icons/edit.svg">
            </button>
        </div>
    </article>
    `);
}

function getRandomId() {
    return Math.floor(Math.random() * 100000);
}

function createLogNode({ iconName, userName, text, datetime }) {
    return templateToNode(`
        <div class="history-panel__item">
            <div class="history-panel__item-icon">
                <img src="./assets/images/${iconName}" class="history-panel__item-image">
            </div>
        <div>

        <div class="history-panel__item-body flex-column">
            <a href="#" class="history-panel__item-username display-medium14">@${userName}</a>
                <p class="history-panel__item-text display-medium14">
                    ${text}
                </p>
                
                <time class="history-panel__item-timestamp display-medium12" datetime="${datetime}">
                    미구현
                </time>
            </div>
        </div>
        `);
}

function createPanelNode(logNodes, isEmpty = false) {
    return templateToNode(`
        <aside class="history-panel flex-column">
            <div class="history-panel__header flex-between">
                <h2 class="history-panel__title display-bold16">사용자 활동 기록</h2>
                <button class="history-panel__close-btn btn flex-center">
                    <img src="./assets/icons/close.svg" class="size-16">
                    <span class="history-panel__close-btn-text display-bold14">닫기</span>
                </button>
            </div>
            
            <div class="history-panel__list">
                <div class="history-panel__empty flex-center${isEmpty ? '' : ' hidden'}">
                    <p class="history-panel__empty-text display-medium14">사용자 활동 기록이 없습니다</p>
                </div>
            </div>
            
            <div class="history-panel__footer flex-end${isEmpty ? ' hidden' : ''}">
                <button class="history-panel__footer-btn btn">
                    <span class="history-panel__footer-btn-text display-bold14">기록 전체 삭제</span>
                </button>
            </div>
        </aside>
        `);
}

export { createColumnNode, createCardNode, createLogNode, createPanelNode };