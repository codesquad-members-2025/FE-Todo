function templateToNode(template) {
    const container = document.createElement('div')
    container.innerHTML = template;
    return container.firstElementChild;
}

function createColumnNode(id, title, count, cardNodes) {
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

        <article class="card card-form flex-column">
            <div class="card__input-area flex-column">
                <input type="text" class="card__title-input display-bold14" placeholder="제목을 입력하세요">
                <textarea class="card__body-input display-medium14" placeholder="내용을 입력하세요"></textarea>
            </div>
            <div class="card__button-area">
                <button type="button" class="card__cancel-btn btn display-bold14">취소</button>
                <button type="submit" class="card__submit-btn btn display-bold14">등록</button>
            </div>
        </article>
        ${cardNodes}
    </section>
    `);
}

function createCardNode(title, description, author = 'web') {
    return templateToNode(`
    <article class="card flex-between">
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

export { createColumnNode, createCardNode };