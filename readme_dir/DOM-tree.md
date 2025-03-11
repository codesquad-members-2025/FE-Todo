# 현재 DOM-TREE 구조

<html lang="ko">
└── <head>
└── <body class="top-layout-container">
    ├── <header class="page-header">
    │   ├── <h1 class="page-header__logo">TASKIFY</h1>
    │   └── <button class="header__history-btn">
    │       └── <img src="/icons/history.svg" alt="history-icon">
    │
    ├── <main class="page-main__columnlist">
    │   ├── <section class="columnlist__col" data-type="todo">
    │   │   ├── <header class="columnlist__header">
    │   │   │   ├── <p class="columnlist__tilte">해야할 일</p>
    │   │   │   ├── <p class="columnlist__count">0</p>
    │   │   │   ├── <button class="add-task-btn">
    │   │   │   │   └── <img src="/icons/plus_icon.svg">
    │   │   │   └── <button class="delete-task-btn">
    │   │   │       └── <img src="/icons/delete_icon.svg">
    │   │   │
    │   │   ├── <div class="task-modal-overlay" data-target="todo">
    │   │   │   ├── <div class="task-modal">
    │   │   │   │   ├── <div class="modal-content">
    │   │   │   │   │   ├── <input class="modal__input title-input">
    │   │   │   │   │   └── <input class="modal__input content-input">
    │   │   │   │   ├── <footer class="modal-footer">
    │   │   │   │   │   ├── <button class="modal-button cancel-button">취소</button>
    │   │   │   │   │   └── <button class="modal-button register-button">등록</button>
    │   │   │
    │   │   ├── <div class="task-list">
    │   │   │   ├── <template id="todo-card-template">
    │   │   │   │   ├── <div class="todo-card">
    │   │   │   │   │   ├── <article class="todo-card__textarea">
    │   │   │   │   │   │   ├── <header class="task-title">GitHub 공부하기</header>
    │   │   │   │   │   │   └── <p class="task-content">add, commit, push</p>
    │   │   │   │   │   ├── <footer class="card-textarea__caption">author by web</footer>
    │   │   │   │   │   ├── <div class="card-actions">
    │   │   │   │   │   │   ├── <button class="delete-task-btn">
    │   │   │   │   │   │   │   └── <img src="/icons/delete-task-btn.svg">
    │   │   │   │   │   │   └── <button class="edit-task-btn">
    │   │   │   │   │   │       └── <img src="/icons/edit.svg">
    │
    │   ├── <section class="columnlist__col" data-type="doing"> <!-- 진행중 -->
    │   ├── <section class="columnlist__col" data-type="done"> <!-- 완료 -->
    │
    ├── <aside class="popover-sidebar"> <!-- 히스토리 사이드바 -->
    │   ├── <header class="popover-header">
    │   ├── <section class="popover__section">
    │   │   ├── <article class="popover__empty-message">사용자 활동 기록이 없습니다.</article>
    │   │   ├── <ul class="activity-list__ul">
    │   │   │   ├── <template id="activity-template">
    │   │   │   │   ├── <li class="activity-list__list">
    │   │   │   │   │   ├── <img src="icons/Image.png">
    │   │   │   │   │   ├── <div class="activity-list__log">
    │   │   │   │   │   │   ├── <header class="history-log__header">@멋진영민</header>
    │   │   │   │   │   │   ├── <div class="log__activityArea">활동 칸이에용</div>
    │   │   │   │   │   │   ├── <div class="log__time">시간</div>
    │   ├── <footer class="popover-footer">
    │   │   └── <button class="delete-sidebar_button">기록 전체 삭제</button>
    │
    ├── <dialog id="delete-history__modal"> <!-- 활동 기록 삭제 모달 -->
    │   ├── <div class="delete-history__content">
    │   │   ├── <p>모든 사용자 활동 기록을 삭제할까요?</p>
    │   │   ├── <div class="delete-history__buttons">
    │   │   │   ├── <button id="cancel-button">취소</button>
    │   │   │   ├── <button id="confirm-delete-button">삭제</button>
