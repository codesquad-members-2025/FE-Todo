# FE-Todo

## WEB TESKIFY 설계

- 해야할 일, 하고있는 일, 완료한 일, 사용자 기록 목록을 처리하는 프로그램 만들기(등록, 삭제, 수정)

#### 기능 구현 목록

1. 메인 페이지 구현

- [x] 헤더 영역

  - 관련 기능
    - [x] history 클릭 -> history list 영역 표시

- [ ] 칼럼 영역 (3가지)
  - 관련 기능
    - [ ] 리스트 갯수를 나타내는 기능

2. 사용자 활동 기록 구현

- [x] 레이어 배치 및 닫기 버튼
- [x] 닫기 버튼을 누르면 애니메이션 효과로 해당 레이어 오른쪽으로 숨기기
- [ ] 기록 삭제 버튼

  **??? 사용자 활동 기록이 없을 경우와 있을 경우를 분리 vs 두 경우를 같이 관리 ???**

  &rarr; 두 경우를 같이 관리!!!!

  기록을 삭제해 없을 경우에는 삭제한 부분에 요소를 추가하면 된다! (innerHTML)

- [x] '기록 전체 삭제' 클릭할 경우 발생하는 UI 구현
  - [x] '기록 전체 삭제' 클릭 시 알림창 표시
  - [x] 취소 버튼 &rarr; 기록 목록으로 돌아가기
  - [x] 삭제 버튼 &rarr; 기록 목록 전체 삭제하기
    - [x] 삭제 후 빈 사용자 활동 기록 넣기

3. 카드 등록

- [x] 칼럼마다 배치된 + 버튼에 마우스를 올리면 색상 바뀌게 하기
- [ ] '+' 버튼 클릭 -> 새로운 카드 등록을 위한 박스 나타나게 하기
  - [ ] 카드 등록 박스 만들기
  - [ ] 다시 '+' 버튼을 누르거나 '취소' 버튼을 누르면 카드 등록 박스가 사라진다
- [ ] 카드 내용을 입력하면 '등록' 버튼이 활성화 된다
- [ ] 내용 입력 후 입력한 내용대로 카드가 생성된다
  - [ ] 글자 수 제한 500자 이내(이때, 박스가 줄어들거나 늘어나야 한다)

4. 카드 이동

- [ ] 같은 칼럼 내에서 위아래로 이동이 가능
- [ ] 다른 칼럼에도 드래그앤드롭으로 이동 가능
  - [ ] 드래그앤드롭시 원래 카드가 있던 자리에 잔상 생기게 하기
  - [ ] 이동 경로의 절반이 지나면 이동할 칼럼 위치로 잔상이 옮겨진다
  - [ ] 드래그를 중단하면 카드는 잔상이 사라지고 원위치로
  - [ ] 이동되는 카드는 반투명하게 처리

5. 카드 삭제

- [ ] columnTitle 'x' 버튼 hover(클릭하지 않고 마우스를 위로 올렸을 때) 색상만 변경되게 처리
- [ ] columnTitle 'x' 버튼은 클릭되었을 때, 하위 카드들을 포함한 칼럼이 삭제된다
- [ ] 카드의 'x' 버튼에 마우스를 올리면 색상만 변경되게 처리
- [ ] 카드의 'x' 버튼 클릭시 알럿창 뜨게 하기
  - [ ] '선택한 카드를 삭제할까요?(유지/삭제)' + 취소 버튼 + 삭제 버튼
  - [ ] 취소 버튼 클릭시 알럿창 닫기
  - [ ] 삭제 버튼 클릭시 알럿창 닫기 + 해당 카드 삭제

6. 카드 수정

- [ ] 수정 버튼 클릭시 등록 카드 박스와 동일한 스타일로 전환
- [ ] 취소 버튼 클릭시 변경 사항이 반영되지 않고 이전 카드 박스 유지
- [ ] 내용을 모두 지우면 저장 버튼 비활성화
- [ ] 내용 수정 후 저장 버튼을 누르면 해당 내용이 저장된 카드로 변경

7. 카드 정렬

- [ ] 로고 옆에 정렬 처리 방식 버튼 배치
  - [ ] 기본은 생성 순
  - [ ] 버튼을 클릭하면 최신 순 으로 변경되게끔 처리
  - [ ] 처리 방식이 전환될 때 애니메이션 효과 넣기
