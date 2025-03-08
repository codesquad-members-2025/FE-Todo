## addEventListener

- addEventListener()는 HTML 요소에 이벤트를 추가하는 표준적인 방법

1. 기본 문법

- element.addEventListener('이벤트 유형', 이벤트 핸들러 함수);
  > - element: 이벤트를 적용할 HTML 요소
  > - 이벤트 유형: 적용할 이벤트의 종류
  >   예) click, mouseover, heydown 등등
  > - 이벤트 핸들러 함수: 이벤트가 발생했을 때 실행할 함수

2. addEventListener() / inclick 차이

- 1. addEventListener()
  - 여러개의 이벤트 핸들러 등록이 가능
  - removeEventListener() 사용 가능<br><br>
- 2. onclick
  - 여러개의 이벤트 핸들러 등록 불가능 (마지막 핸들러만 실행됨)
  - removeEventListener() 사용 불가능
