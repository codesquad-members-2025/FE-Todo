# 메인 칼럼 부분 설계

- 우선 이벤트 위임을 main태그에 걸어 모든 이벤트를 읽어온다.

main.addEventListener("click",(e)=>{
const target = e.target;
console.log(target);
})

-> 이런식으로 일단 main에 발생하는 모든 이벤트 타겟 읽어오기

- main에는 이미지들이 많다.
  - closet를 이용해 이미지의 상위 태그인 버튼 태그들로 읽어온다.

## 메인에 발생하는 큰 로직을 구분해 보자.

### 새로운 카드 등록하는 박스 컨트롤 파트

#### 등록 버튼에 클릭 이벤트가 발생하면 실행하는 함수를 선언 해야한다.

- **_전체 흐름_**

  1. 테스크 추가 카드에서 "등록" 버튼 클릭
  2. 테스크 추가 카드의 정보를 읽어온다.
  3. js 에서 객체로 저장한다.
  4. JSON 데이터 타입으로 변환뒤 브라우저의 LocalStorage에 저장
  5. LocalStorage에서 전체 JSON데이터를 불러와 js 객체로 변환
  6. 객체를 이용해 js의 템플릿 코드에 리터럴 방식으로 넣는다.

- 클릭 되는 순간의 ID는 date메서드를 이용하여 id 생성한다.
- 각 입력 박스에는 두개의 input의 value 정보를 읽어 변수에 할당.
- 그러면 입력 카드 관련 정보 변수는 다음과 같다.
  - ID: 시간
  - 제목 input 태그 입력값 : input.value
  - 내용 input 태그 입력값 : input.value
  - data-type : 클릭 이벤트가 발생한 열의 데이터 타입을 알아야함.. -> 입력된 투두 카드들을 JSON형식으로 저장할때 구분할 key의 정보를 담당한다.

❗️근데 해당 컬럼은 구분 어떻게 할꺼야..?

- 이벤트 위임을 사용하기에... ~~해당 task 등록 "버튼"에만 입력시 이벤트 리스너가 작동한다는 전제가 있어야한다.(이런 조건이 없으면 범위내 이벤트 발생시 계속 발생한다.)~~ -> 핸들러에서 다루면 해결~
- 등록 버튼이 클릭되면 .closest(".columnlist\_\_col") 를 사용해 칼럼의 최상단 부모 요소로 올라간다.
- 그리고 다른 js 파일에 저장된 입력 카드 템플릿 js 정보를 불러와 input태그에서 받아온 정보를 넣는다.
  - ~~id 속성이 꼭 필요할까...? -> 삭세할때 필요하다고 생각했지만.. 이벤트 위임 사용하니까 closet로 todo카드의 상단 부모 요소를 삭제하기만 하면 될것 같다.~~
  - 따로 저장하지 않으면 새로고침하면 정보가 다 날라간다. -> 이러면 투두 리스트라고 할 수 있을까..?
- input태그에서 받아온 정보를 로컬 스토리지에 저장.
- .columnlist\_\_col태그의 자식요소로 넣는다.

#### 로컬스토리지 JSON구조

```JSON

tasks = {
  todo:{{},{},{}...{}},

  doing:{{},{},{}...{}},

  done:{{},{},{}...{}}
}

```

#### 각 데이터 타입 열의 데이터 구조

```javascript
 todo:{
  id1:{
    title: inputData.titleValue,
    content: inputData.contentValue,
  },
  id2:{
    title: inputData.titleValue,
    content: inputData.contentValue,
  },
  id3:{
    title: inputData.titleValue,
    content: inputData.contentValue,
  }

 }
```

### 로컬 스토리지에서 데이터를 읽어서 해당하는 컬럼 영역에 넣어줘야한다.

1. createTaskData함수를 통해 만들어진 데이터를 통해 UI를 생성한다.

-> 생성된 카드 데이터 정보는 다음과 같다.

```javascript
taskObject = {
  columnType: taskData.columnType,
  card: {
    id,
    title: taskData.titleValue,
    content: taskData.contentValue,
  },
};
```

2. 위 카드 데이터 정보를 바탕으로 카드를 생성하는 함수를 만들어야한다.

- taskObject.card.title , taskObject.card.content 정보를 추출한다.

- js 에서 템플릿을 불러와 위에서 추출한 정보를 이용해 템플릿 안에 넣어야한다. -> makeTaskCard함수 이용

- 완성된 하나의 카드 HTML정보를 반환한다.

3. 칼럼에 카드를 만들어주는 함수를 만들어야한다.

- taskObject.columnType를 통해 카드를 넣을 칼럼의 영역을 정한다.

### 컬럼 파트(메인 할일 조작 파트)

#### 👀할 일 카드 삭제

- 🔥 전체적인 흐름
  1. 할일 카드의 삭제 버튼에 클릭 이벤트 발생
  2. 삭제 경고 dialog를 띄운다.
  3. "유지"버튼이 눌리면 다시 숨긴다.
  4. "삭제" 버튼에 클릭 이벤트 발생시 다음과 같이 진행한다.
  5. 로컬스토리지에서 이벤트가 발생한 카드의 id를 탐색한다.
  6. 해당하는 id의 데이터를 삭제한다.
  7. 이제 화면의 카드도 지워야한다.👀
  8. 클릭이벤트가 발생한 섹션으로 타고올라간다.
  9. 해당하는 섹션에서 id에 해당하는 카드 모달을 삭제한다.
- 일단 클릭한 카드의 id를 알아야 로컬 스토리지에서 삭제할 카드의 id를 탐색할 수 있다.

#### 👀할 일 카드 내용 수정
