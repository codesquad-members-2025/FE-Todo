const addCardBtn = document.querySelectorAll('.column-header__add-btn');

// 카드 폼 없으면 생성, 있으면 삭제
addCardBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const currentColumn = event.currentTarget.closest('.kanban__column');
        const cardForm = currentColumn.querySelector('.card-form');

        if (cardForm) removeCardForm(currentColumn);
        else createCardForm(currentColumn);
    });
});

// 카드 폼 생성
export function createCardForm(currentColumn) {
    const cardFormTemplate = document.querySelector('#card-form-template');
    const cardForm = cardFormTemplate.content.cloneNode(true);

    const firstCard = currentColumn.querySelector('.card');
    currentColumn.insertBefore(cardForm, firstCard);


    // 카드 폼 생성 시점에 이벤트 리스너 추가
    // 카드 폼 생성 후 버튼 탐색
    const cardFormCancelBtn = currentColumn.querySelector('.card__cancel-btn');
    const cardFormSubmitBtn = currentColumn.querySelector('.card__submit-btn');

    cardFormCancelBtn.addEventListener('click', (event) => {
        const cardForm = event.currentTarget.closest('.card-form');
        cardForm.remove();
    });

    cardFormSubmitBtn.addEventListener('click', (event) => {
        const cardForm = event.currentTarget.closest('.card-form');
        const card = createCard(currentColumn);
        currentColumn.insertBefore(card, cardForm);
        cardForm.remove();
    });
}

// 카드 폼 삭제
export function removeCardForm(currentColumn) {
    const cardForm = currentColumn.querySelector('.card-form');

    if (cardForm) {
        cardForm.remove();
        return true;
    } else {
        return false;
    }

}



export function createCard(currentColumn) {
    const cardTemplate = document.querySelector('#card-template');
    const card = cardTemplate.content.cloneNode(true);

    const cardTitleInput = currentColumn.querySelector('.card__title-input').value;

    const cardBodyInput = currentColumn.querySelector('.card__body-input').value;

    card.querySelector('.card__title').innerText = cardTitleInput;
    card.querySelector('.card__body-text').innerText = cardBodyInput;

    return card;
}

