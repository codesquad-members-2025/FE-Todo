## 미션 관련 학습

1. HTML

- 화면 배치를 위한 태그들

  - 기본적인 레이아웃 태그 : div, span, ...

  - 시맨틱 레이아웃 태그 : header, section, article, nav, aside, footer
    - header : 페이지나 섹션의 머리말 역할 (로고, 내비게이션 등을 포함)
    - section : 독립적인 콘텐츠 영역 (기사, 챕터, 주제별 내용 등을 그룹화할 때 사용)
    - article : 'section' 과 비슷하지만, 자체적으로 완결된 콘텐츠
    - nav : 메뉴를 만들 때 사용
    - aside : 주요 내용과 관련 있지만 부가적인 정보
    - footer : 페이지나 섹션의 바닥글 역할 (저작권 정보, 연락처 등을 포함)

- 그외 여러가지 태그들 : 이미지, 제목, 문단, 표, 목록, 강조, 링크 등등 관련 태그 찾아보기

- 태그 내에 attribute들의 각각의 역할 : class, id, data-\*, style

  - class

    - 여러 개의 요소에 동일한 스타일이나 기능을 적용할 때 사용
    - 한 요소에 여러 개의 클래스를 추가할 수 있다(공백으로 구분)

  - id

    - 문서 내에서 유일한 식별자를 지정(같은 id를 가진 요소는 하나만 존재해야 함,id는 고유해야 함)
    - JavaScript에서 특정 요소를 선택할 때 주로 사용 => getElementById()로 선택 가능

  - data-\*

    - HTML 요소에 추가적인 데이터를 저장할 때 사용
    - data-이름="값"의 형태로 data- 를 붙여 사용
    - JavaScript에서 쉽게 접근 가능 => dataset을 통해

  - style

    - HTML 요소에 직접 CSS를 적용할 때 사용(style속성을 태그 내에 직접 정의)
    - 우선 순위가 가장 높지만, 유지 보수가 어려워 잘 사용하지 않는다

- block 속성 요소 VS inline 속성 요소

  - block 요소 : 항상 새 줄에서 시작하고, 전체 가로 폭을 차지한다. (주로 컨테이너 역할)
    - 예) div, header, section, article, nav, aside, footer, main, figure 등
  - inline 요소 : 현재 줄 안에서 배치되고, 자신의 내용만큼 너비를 차지한다. (텍스트 일부를 꾸밀 때 사용)
    - 예) span, a, b, strong, img 등

---

- CSS 변수(:root) 사용법

  - --이름 형식으로 선언하고, var(--이름) 형식으로 사용할 수 있다
  - 이렇게 하면 해당하는 색을 변경하기 쉽기 때문에 유지보수가 편리하다

- Figma 아이콘 추가 방법 : 저장하고 싶은 아이콘을 선택한 후 우측 하단에 있는 확장자 선택 후 'Export' 클릭

- 요소를 배치하는 방법 : 내가 배치하고자 하는 요소의 상위 요소를 같이 생각하며 고민해보기

  > 예를 들어 header 영역을 body의 가운데 정렬하고자 할때, <br>
  > header 영역에 가운데 정렬시키는 것이 아니라 body 내에서 가운데 정렬을 시켜야 함 <br>
  > 그래야 의도한 header 영역이 가운데 정렬된 것을 확인할 수 있다.

  <br>

  <strong>\*\* HTML 작업시 바깥 영역을 먼저 만들고, 안쪽을 만드는 top-down방식으로 구현해보기 \*\*</strong>

---

### 태그

1. input

- HTML 폼에서 사용되는 입력 필드를 생성하는 태그
- 사용자로부터 데이터를 입력받는 데 사용

  기본 문법

  ```javascript
  <input type="text" name="username" />
  ```

  주요 속성

  - **type**: 입력 필드의 유형을 정의

    - text: 일반 텍스트 입력 필드
    - password: 비밀번호 입력 필드 (입력한 내용이 \*로 표시됨)
    - email: 이메일 형식의 텍스트 입력 (자동으로 이메일 형식 확인)
    - number: 숫자 입력 필드
    - checkbox: 체크박스
    - radio: 라디오 버튼
    - file: 파일 선택 필드
    - submit: 폼 제출 버튼
    - reset: 폼을 초기 상태로 되돌리는 버튼
    - date, datetime-local, month, week, time: 날짜, 시간 관련 입력 필드
    - tel: 전화번호 입력 필드
    - url: URL 입력 필드

  - **name** : 폼 데이터를 서버로 전송할 때 사용되는 이름  
    &rarr; 폼의 데이터가 서버에 전달될 때,  
    각 입력 필드의 값은 이 name 속성에 의해 구분

  - value : 입력 필드의 기본값을 설정  
    예를 들어, 텍스트 입력 필드에서 기본적으로 표시될 텍스트나,  
    라디오 버튼에서 기본 선택된 값을 설정할 수 있습니다

  - **placeholder** : 입력 필드가 비어 있을 때,  
    사용자에게 필드에 어떤 값을 입력해야 하는지 알려주는 것  
    입력값을 사용자가 입력하면 이 텍스트는 사라짐

  > **placeholder의 텍스트의 color를 적용하고 싶을땐?**  
  > &rarr; ::placeholder 가상 선택자를 꼭 사용해야 함  
  > (input 태그에 폰트 관련 속성은 적용될 수 있음)

  - **required** : 이 속성을 추가하면 폼 제출 전에 필수로 입력해야 하는 필드가 됨  
    &rarr;값이 비어 있으면 폼을 제출할 수 없다

  - readonly : 입력 필드를 읽기 전용으로 설정  
    사용자는 값을 볼 수 있지만 수정할 수 없다

  - disabled : 입력 필드를 비활성화  
    사용자는 해당 입력 필드를 클릭하거나 수정할 수 없다

  - **maxlength**: 텍스트 입력 필드에서 최대 글자 수를 제한

  - size : 입력 필드의 가로 크기를 설정  
    텍스트 필드에서 문자 수에 대한 기본적인 크기를 설정하는 데 사용

  > min 및 max : number, date 등의 필드에서 입력할 수 있는 최소값과 최대값을 설정

  - pattern : type="text"와 같은 일반 텍스트 필드에서 사용할 수 있는 속성으로, 정규 표현식을 사용하여 입력 값의 패턴을 설정할 수 있다

2. textarea

- 여러 줄의 텍스트를 입력할 수 있는 HTML 요소

  기본 문법

  ```javascript
  <textarea></textarea>
  ```

  주요 속성

  - cols : 가로 문자 개수 (너비) 지정
  - **rows** : 세로 줄 개수 지정
  - **maxlength** : 입력 가능한 최대 글자 수
  - **placeholder** : 입력 전 안내 문구 표시
  - **wrap** : 줄바꿈 방식 설정 (soft, hard)
  - readonly : 읽기 전용 (수정 불가)
  - disabled : 비활성화 (입력 불가)
  - required : 필수 입력 값 설정 (폼 제출 시)
  - autofocus : 페이지 로드 시 자동 포커스
  - spellcheck : 맞춤법 검사 (true / false)
  - name : 폼 데이터 전송 시 변수 이름
  - form : 특정 form 태그와 연결

1. textarea \_\_ CSS 관련 속성

- **width** : 너비 설정
- height : 높이 설정
- **resize** : 사용자가 크기 조절을 할 수 있는지 설정  
  &rarr; (none, both, horizontal, vertical)
- overflow : 너비를 초과할 때 내용 처리  
  &rarr;(auto, hidden, scroll, visible)
- **word-wrap** : 긴 단어 줄바꿈  
  &rarr;(normal, break-word)
- **white-space** : 줄바꿈 및 공백 처리

  - normal &rarr; 여러 개의 공백을 하나로 축소, 줄바꿈 없음
  - pre &rarr; 모든 공백 유지, 줄바꿈 없음
  - nowrap &rarr; 줄바꿈 없음
  - pre-wrap &rarr; 공백 유지, 자동 줄바꿈 허용
  - pre-line &rarr; 여러 개의 공백을 하나로 축소, 자동 줄바꿈 허용

- border : 테두리 스타일 설정
- background : 배경색 설정
- padding : 내부 여백 설정
- font-size : 글자 크기 설정

2. textarea \_\_ JavaScript 이벤트 관련 속성

- oninput : 입력할 때마다 이벤트 실행
- onchange : 내용이 변경되고 포커스를 잃으면 실행
- onfocus : 클릭 또는 탭으로 포커스되면 실행
- onblur : 포커스를 잃으면 실행
- onkeydown : 키보드를 누를 때 실행
- onkeyup : 키보드를 눌렀다 뗄 때 실행
- onkeypress : 키 입력 시 실행 (deprecated)
- onpaste : 사용자가 텍스트를 붙여넣을 때 실행

> scrollHeight 속성
>
> - 요소의 실제 내용이 차지하는 총 높이를 반환하는 속성입니다.
>
> ```javascript
> let height = element.scrollHeight;
> ```
>
> element &rarr; 특정 HTML 블록 요소
> scrollHeight &rarr; 요소의 실제 내용 높이(픽셀 단위) 를 반환

> < scrollHeight 주의할 점 >
>
> - display: none; 인 경우 scrollHeight가 0을 반환  
>   → 요소가 숨겨져 있으면 높이를 계산할 수 없음  
>   → 해결 방법: visibility: hidden; 또는 opacity: 0; 사용
