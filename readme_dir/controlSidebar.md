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
