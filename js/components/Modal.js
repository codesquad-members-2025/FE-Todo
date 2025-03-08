export function initModal() {
    const modal = document.querySelector('.modal');
    const modalOpenBtn = document.querySelector('.history-panel__footer-btn');
    const modalCloseBtn = document.querySelector('.modal__cancel-btn');
    const modalConfirmBtn = document.querySelector('.modal__confirm-btn');

    modalOpenBtn.addEventListener('click', () => {
        modal.showModal();
    });

    modalCloseBtn.addEventListener('click', () => {
        modal.close();
    });

    modalConfirmBtn.addEventListener('click', () => {
        /** 사용자 활동 기록 삭제 로직 추후에 구현*/
        modal.close();
    });
}