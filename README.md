# FE-Todo

## 학습 목표

- git branch 이해
- 함수 기반 모듈, 프로그래밍
- 개발 환경 구성
- 복잡한 UX 구현
- 브라우저에서 웹사이트의 동작방식 이해
- task/sprint 나누고 계획하는 연습

## trello

유저 시나리오를 기반으로 task를 분리하여, sprint 단위로 나누어 진행합니다.

- 1주 : 레이아웃 보고 시작하기, 새로운 카드 등록하기, 카드 삭제하기
- 2주 : 카드 수정하기, 카드 이동하기, 칼럼 관리하기, 전체 활동 기록 확인하기, 전체 활동 기록 삭제하기
- +a : 실행취소, 다시 실행

[trello 링크](https://trello.com/invite/b/67c68babd9a1af4b5516d24b/ATTI7ba27d245056ee657df8fe675231c998CE45F5BE/todo-project)

# 설계

## 폴더 구조

### [1주차]

간단한 CRUD 기능뿐만 아니라 애니메이션, 필터링 등의 기능을 포함하고 있으므로, CSS와 JS를 분리하고 모듈화를 할 수 있는 구조를 선택했습니다. 또한, 이미지나 아이콘도 프로젝트 폴더에 포함시켜야 하므로, 이를 `assets` 폴더로 분리했습니다.

### [2주차]

기능을 추가하다 보니 파일과 폴더로 분리하는 것이 필요하다고 판단하여 구조를 재설계했습니다. `js` 폴더 내에서 entry point로 사용할 `main.js`에서는 각각의 모듈 파일을 실행시키는 초기화 함수만 사용하고, 나머지 로직은 `components` 폴더 내부의 각각의 모듈 파일에서 관리하도록 구성했습니다. `utils` 폴더에서는 자주 사용하는 유틸리티 함수들을 각각의 파일에 넣어 관리합니다. 또한, `main.js`에서 데이터를 관리하고 사용하면 entry point의 책임이 커지기 때문에, 별도의 `store` 폴더를 만들어 데이터 관리 로직을 분리했습니다.

```
/FE-TODO
│── index.html
│── css/
│   ├── reset.css  // 기본 css 초기화
│   ├── style.css
│── js/
│   ├── main.js
│   ├── components/
│   │   ├── cardColumn.js
│   │   ├── history.js
│   │   ├── modal.js
│   │   ├── template.js
│   ├── utils/
│   │   ├── dom.js
│   │   ├── fetch.js
│   │   ├── main.js
│── assets/
│   ├── icons/
│   ├── images/
│── data/
│   ├── columnData.json
│   ├── historyData.json
│── store/
│   ├── column.js
│   ├── history.js


```

### [3주차]

렌더링(render), 핸들러(handler) 로직, 이벤트(event) 처리 코드가 하나의 파일에서 관리되면서 다음과 같은 문제가 발생했습니다.

- 하나의 파일에서 UI 렌더링, 데이터 조작, 이벤트 핸들링을 동시에 관리 → **가독성 저하**
- 기능별 수정 시 불필요한 코드까지 변경될 가능성이 높음 → **유지보수 어려움**
- 역할이 명확하지 않아 **확장성 저하**

이를 해결하기 위해 **도메인별 분리 + 역할별 분리 구조**를 도입했습니다.

```
/FE-TODO
│── index.html
│── css/
│   ├── reset.css  // 기본 css 초기화
│   ├── style.css
│── js/
│   ├── main.js
│   ├── board/
│   │   ├── handlers/
│   │   │   ├── eventHandlers.js
│   │   │   ├── sortHandlers.js
│   │   │   └── taskHandlers.js
│   │   ├── renderers/
│   │   │   ├── column.js
│   │   │   ├── task.js
│   │   │   └── template.js
│   │   ├── store.js
│   │   └── index.js
│   ├── activity/
│   │   ├── handlers.js
│   │   ├── renderer.js
│   │   ├── store.js
│   │   └── index.js
│   ├── shared/
│   │   ├── components/
│   │   │   └── dialog/
│   │   │       ├── index.js
│   │   │       └── renderer.js
│   │   ├── utils/
│   │   │   ├── dom.js
│   │   │   ├── fetch.js
│   │   │   ├── common.js
│   │   │   └── index.js
│── assets/
│   ├── icons/
│   ├── images/
│── data/
│   ├── columnData.json
│   ├── historyData.json
│── store/
│   ├── column.js
│   ├── history.js
```

---

## 디자인 시스템(css)

- `reset.css`를 사용하여 기본 스타일 초기화
- `CSS variables`을 활용하여 공통 스타일 변수화

---

## Branch명 컨벤션

### 기능 개발 브랜치 (Feature Branch)

```
feature/login-page
feature/user-authentication
feature/refactor-header
```

### 버그 수정 브랜치 (Bugfix Branch)

```
bugfix/fix-login-error
bugfix/fix-navbar-dropdown
```

### 브랜치명 작성 규칙

- 소문자 사용
- `/`를 사용하여 기능, 버그 수정 구분
- 짧고 명확한 설명 (여러 단어는 `-`로 구분)
- 관련 이슈 번호 포함 가능 (`feature/123-login-page`)
