# 메인화면 각 섹션 DOM 설계

1. 각 섹션의 할 일 추가 버튼 .add-task-btn 을 모두 읽어 온다.

2. 각 버튼을 불러온 버튼 배열들을 순회 하면서 각 data-type에 맞게 반응 하게끔 구분짓는다.

3. 특정 섹션의 추가 버튼을 누르면 할 일 추가 버튼이 display:block으로 바뀌게끔 조작한다.

4. 할 일 추가 카드 "닫기" 버튼을 누르면 display:none으로 바꿔 다시 숨긴다.

---

# 리팩토링

- 버블링을 이용해서 이벤트 위임으로 DOM 탐색을 효율적으로 한다.
- document.querySelector()의 사용을 최대한 지양한다.
- 함수 표현식을 활용해 외부에서 접근할 수 없게 구현 한다.

0. 먼저 body태그에 이벤트 위임을 사용해 다른 js 에서도 사용해야 한다.(중복되는 작업은 모듈화해서 한번만 실행한다.)

1. 사용자가 각 섹션의 + 버튼 또는 x 버튼을 누를때 event.target을 이용해 타겟 요소를 찾은뒤 closest(".add-task-btn")을 사용해 버튼이 실행되게 한다.
2. - 버튼이 실행되면 해당하는 섹션의 task-modal이 나오게 한다.
3. - 버튼이 실행되면 해당하는 섹션의 task-modal을 숨긴다.

// // ✅먼저 추가, 닫기 버튼들을 불러온다.
// const sections = document.querySelectorAll(".columnlist\_\_col");
// sections.forEach((section) => {
// const addBtn = section.querySelector(".add-task-btn");
// const closeBtn = section.querySelector(".delete-task-btn");
// const taskModal = section.querySelector(".task-modal-overlay");

// addBtn.addEventListener("click", () => {
// taskModal.classList.add("active"); // 모달 보이기
// });
// closeBtn.addEventListener("click", () => {
// taskModal.classList.remove("active"); // 모달 보이기
// });
// });
