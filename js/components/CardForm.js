export function initCardForm() {
    const addCardFormBtns= document.querySelectorAll('.column-header__add-btn');
    
    // 카드 폼 없으면 생성, 있으면 삭제
    // currentTarget은 이벤트가 발생한 요소를 참조
    // 화살표 함수 대신 함수를 쓰면 this로 btn 참조 가능
    // 화살표 함수는 this 바인딩이 없기 때문
    addCardFormBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const currentColumn = getCurrentColumn(event.currentTarget);
            const cardForm = currentColumn.querySelector('.card-form');
            
            if (cardForm) cardForm.remove();
            else createCardForm(currentColumn);
        });
    });
}
    
// 카드 폼 생성
function createCardForm(currentColumn) {
    const cardFormTemplate = getCardFormTemplate();

    // cloneNode(true)는 모든 자식 요소도 복사 - deep copy
    // cloneNode(false)는 자식 요소는 복사하지 않음 - shallow copy
    const cardForm = cardFormTemplate.content.cloneNode(true);
    addCardFormEvent(cardForm);

    const firstCard = getFirstCard(currentColumn);

    currentColumn.insertBefore(cardForm, firstCard);
}

// 카드 생성
function createCard(cardTitleInput, cardBodyInput) {
    const cardTemplate = getCardTemplate();
    const card = cardTemplate.content.cloneNode(true);

    card.querySelector('.card__title').innerText = cardTitleInput;
    card.querySelector('.card__description').innerText = cardBodyInput;

    return card;
}

// 카드 폼 이벤트리스너 추가
function addCardFormEvent(cardForm) {
    const cardFormCancelBtn = cardForm.querySelector('.card__cancel-btn');
    const cardFormSubmitBtn = cardForm.querySelector('.card__submit-btn');
    
    cardFormCancelBtn.addEventListener('click', () => {
        searchCardForm(cardFormCancelBtn).remove();
    });

    cardFormSubmitBtn.addEventListener('click', (event) => {
        const cardForm = searchCardForm(event.currentTarget);
        const { cardTitleInput, cardBodyInput } = getCardInputValues(cardForm);

        const card = createCard(cardTitleInput, cardBodyInput);
        insertCard(card);

        searchCardForm(cardFormSubmitBtn).remove();
    });
}

function searchCardForm(element) {
    const cardForm = element.closest('.card-form');
    return cardForm;
}

// 현재 컬럼 탐색
function getCurrentColumn(element) {
    // element가 유효한 DOM 요소인지 확인
    if (!(element instanceof Element)) {
        console.error('Invalid element:', element);
        return null;
    }


    const currentColumn = element.closest('.column');
    return currentColumn;
}

// 카드 폼 입력값 탐색
function getCardInputValues(cardForm) {
    const cardTitleInput = cardForm.querySelector('.card__title-input').value;
    const cardBodyInput = cardForm.querySelector('.card__body-input').value;
    return { cardTitleInput, cardBodyInput };
}

// 첫 번째 카드 탐색
function getFirstCard(currentColumn) {
    const firstCard = currentColumn.querySelector('.card');
    return firstCard;
}

// 카드 삽입
function insertCard(card) {
    console.log(card);
    const currentColumn = getCurrentColumn(card);
    const firstCard = getFirstCard(currentColumn);
    currentColumn.insertBefore(card, firstCard);
}

// 카드 폼 템플릿 탐색
function getCardFormTemplate() {
    const cardFormTemplate = document.querySelector('#card-form-template');
    return cardFormTemplate;
}

// 카드 템플릿 탐색
function getCardTemplate() {
    const cardTemplate = document.querySelector('#card-template');
    return cardTemplate;
}