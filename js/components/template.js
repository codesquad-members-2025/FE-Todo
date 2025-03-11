function createCardFormNode() {
    const container = document.createElement('div');
    container.innerHTML = `
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
    `;
    return container.firstElementChild;
}

function createCardNode(title, description, author = 'web') {
    const container = document.createElement('div');
    container.innerHTML = `
    <article class="card flex-between">
        <div class="card__content flex-column">
            <div class="card__text flex-column">
                <h3 class="card__title display-bold14">${title}</h3> <!-- 타이틀 -->
                <p class="card__description display-medium14">${description}</p> <!-- 바디 -->
            </div>
            <p class="card__caption display-medium12">author by ${author}</p> <!-- 캡션 -->
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
    `;
    return container.firstElementChild;
}

export { createCardFormNode, createCardNode };