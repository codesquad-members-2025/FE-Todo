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
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 7.99799H8V13.998H6V7.99799H0V5.99799H6V-0.00201416H8V5.99799H14V7.99799Z" fill="#A0A3BD"/>
                    </svg>
                </button>
                <button class="column-header__close-btn btn"> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="#A0A3BD"/>
                    </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="#A0A3BD"/>
                </svg>
            </button>
            <button class="card__edit-btn btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.727 6.72708L14.9642 5.48991C15.1194 5.33459 15.3038 5.21139 15.5066 5.12733C15.7095 5.04327 15.927 5 16.1466 5C16.3662 5 16.5836 5.04327 16.7865 5.12733C16.9894 5.21139 17.1737 5.33459 17.329 5.48991L18.511 6.67191C18.8244 6.98542 19.0005 7.41059 19.0005 7.8539C19.0005 8.29722 18.8244 8.72238 18.511 9.0359L17.2738 10.2731M13.727 6.72708L5.68877 14.7645C5.41122 15.042 5.24018 15.4084 5.2056 15.7994L5.00331 18.0898C4.99244 18.2115 5.00842 18.3342 5.0501 18.4491C5.09178 18.564 5.15816 18.6684 5.24456 18.7549C5.33096 18.8414 5.43528 18.9078 5.55016 18.9496C5.66503 18.9914 5.78768 19.0075 5.90945 18.9968L8.19988 18.7945C8.59145 18.7603 8.95845 18.5892 9.23642 18.3113L17.2738 10.2731M13.727 6.72708L17.2738 10.2731" stroke="#A0A3BD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
            <a href="#" class="history-panel__item-username display-medium14">
                @${userName}
            </a>

            <p class="history-panel__item-text display-medium14">
                ${text}
            </p>
                
            <time class="history-panel__item-timestamp display-medium12" datetime="${datetime}">
                미구현
            </time>
        </div>
        `);
}

function createPanelNode(isEmpty = false) {
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