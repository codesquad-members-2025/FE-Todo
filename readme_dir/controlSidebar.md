# 히스토리 사이드바 컨트롤 설계

1. 먼저 사이드 바의 태그 정보를 갖고와야한다.

2. 히스토리 버튼을 누르면 위에서 아래로 나오게 한다.

3. 닫기 버튼을 누르면 사이드 바가 다시 위로 올라가야한다.

4. 메인에 할 일 카드가 생성되면 .popover\_\_empty-message의 정보는 숨기고,
   activity-template의 태그를 조작한다.

5. "기록 전체 삭제"를 누르면 #delete-history\_\_modal인 dialog 태그가 나와야한다.
   - "취소" 버튼을 누르면 dialog태그를 숨긴다.
   - "삭제" 버튼을 누르면 .activity-list\_\_ul의 정보들을 모두 삭제한다. -> .activity-template를 컨트롤 해야한다..? -> 일단 ul태그의 정보들을 삭제하자.
   - ul태그의 정보가 지워졌으면 .popover\_\_empty-message의 문구를 다시 띄어야한다.

---

# 리팩토링 설계

1. setupClickDelegate 모듈을 이용해 이벤트 위임한다.-> 이벤트 위임을 이용하면 어떤 요소에 클릭 이벤트가 발생했는지 알 필요가 없다.

2. 이벤트 타겟에서 이미지를 클릭 했을 경우도 고려하여 closest를 이용해 class="header\_\_history-btn"를 찾는다.

3. 이벤트 타겟이 ".header\_\_history-btn"인 경우

   - ".popover-sidebar"의 클래스에 open을 토글

4. 이벤트 타겟이 ".popover-header\_\_closeBtn"인 경우

   - ".popover-sidebar"의 클래스에 "open"을 제거

5. 타겟이 ".delete-sidebar_button"인 경우

   - "#delete-history\_\_modal"모달을 찾아온다.
   - showModal();메서드를 사용한다.

6. 이때 모달이 열린 상태에서 "#cancel-button"의 이벤트 타겟이 발생 한 경우

   - 삭제 모달에 close()메서드를 사용한다.

7. 이벤트 타겟이 "#confirm-delete-button"인 경우
   - ".activity-list\_\_ul"인 요소를 탐색.
   - 해당 섹션의 html을 빈 문자열로 만든다.
   - ".popover\_\_empty-message"의 요소를 찾은뒤 -> 스타일의 display 속성을 "block"으로 바꾼다.
   - 삭제 모달에 close()메서드 사용.
