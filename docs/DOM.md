## DOM

- HTML을 트리 구조의 객체 모델로 변환하여 자바스크립트에서 조작할 수 있도록 만든 것

### DOM API

- HTML을 검색, 수정, 추가, 삭제할 수 있는 자바스크립트 메서드 및 속성

### 이벤트 추가 - addEventListener

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

#### classList

- HTML 요소의 클래스(class)를 조작하는 속성

1. add()

- .classList 앞에 있는 HTML 요소에 클래스를 추가할 때 사용한다
- 단, 이미 존재하는 클래스는 중복 추가되지 않음

2. remove()

- 클래스를 제거할 때 사용한다

2. toggle()

- 클래스를 추가하거나 제거하는 기능을 한번에 수행
- 추가하려는 클래스가 존재하면 제거하고, 없으면 추가한다

### 요소 선택자

- DOM(Document Object Model) 에서 특정 요소를 찾기 위해 사용하는 JavaScript 메서드

1. getElementById() &rarr; ID로 단일 요소 선택

- 단 하나의 요소만 반환 (HTMLElement 객체)
- Id는 문서 내에서 고유해야 하므로 중복 불가능
- Id가 존재하지 않으면 null 반환

2. getElementsByClassName() &rarr; 같은 클래스를 가진 모든 요소 선택

- 일치하는 모든 요소를 반환 (\*HTMLCollection)
- 여러 개의 요소가 포함될 수 있음
- 실시간 컬렉션 &rarr; DOM 변경 시 자동 업데이트됨
- 요소가 없으면 빈 HTMLCollection 반환

  **HTMLCollection**

  > - 유사 배열 객체
  > - 배열처럼 여러 개의 요소를 담고 있지만, 배열은 아니다
  > - 배열처럼 length 속성을 가지며, 인덱스로 개별 요소에 접근할 수 있음
  > - 하지만 배열의 메서드(map(), filter() 등)를 직접 사용할 수 없다
  > - 문서(DOM)가 변경될 때 자동으로 업데이트(Live Collection)  
  >   &rarr; 즉, 새로운 요소가 추가되거나 삭제되면 자동으로 반영됨

  **HTMLCollection을 배열로 변환하는 방법**

  > 배열 메서드를 사용하려면 Array.from() 또는 [...spread] 연산자를 사용하여 변환 가능

3. querySelector() &rarr; 첫 번째 요소 하나만 반환

- 첫 번째로 일치하는 요소만 반환 (\*Node 객체 반환)
- 해당하는 요소가 여러 개 있어도 첫 번째 요소 하나만 가져옴
- 요소가 없으면 null 반환

4. querySelectorAll() &rarr; 모든 요소를 가져옴

- 모든 일치하는 요소를 반환 (\*NodeList 반환)
- NodeList는 배열처럼 여러 개의 요소를 담고 있음 (forEach() 사용 가능)
- 요소가 없으면 빈 NodeList 반환 ([])

  **Node**

  > - Node는 DOM 에서 사용되는 기본적인 요소
  > - Node는 HTML 문서 내에서 모든 요소, 텍스트, 속성 등을 포함하는 가장 기본적인 단위

  **NodeList**

  > - 여러 Node 객체를 포함하는 유사 배열 객체
  > - NodeList는 반드시 Node 객체만 포함
  > - 실시간 업데이트 불가능(Static Collection)
