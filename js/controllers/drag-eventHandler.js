export default function initDragEvent() {
    const kanban = document.querySelector('.kanban');

    handleCardDrag(kanban);
    // handleColumnDrag(kanban);
}

function handleCardDrag(kanban) {
    const html = document.querySelector('html');
    let isDragging = false;
    let copy;
    let offsetX;
    let offsetY;

    kanban.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const card = e.target.closest('.card');
        const cardRect = card.getBoundingClientRect();
        
        if (!card) return;
        
        isDragging = true;
        copy = createCopy(card);
        offsetX = e.clientX - cardRect.left;
        offsetY = e.clientY - cardRect.top;

        updateDragPosition(copy, e.clientX, e.clientY, offsetX, offsetY);
    });

    html.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateDragPosition(copy, e.clientX, e.clientY, offsetX, offsetY);
    })

    html.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        copy.remove();
        isDragging = false;
    });
}

function createCopy(card) {
    const copy = card.cloneNode(true);
    copy.classList.remove('card');
    copy.classList.add('card-copy');
    document.querySelector('body').appendChild(copy);
    return copy;
}

function updateDragPosition(element, x, y, offsetX, offsetY) {
    element.style.left = `${x - offsetX}px`;
    element.style.top = `${y - offsetY}px`;
}