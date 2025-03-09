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

간단한 CRUD 기능뿐만 아니라 애니메이션,필터링 등의 기능을 포함하고 있으므로
css,js를 분리 및 모듈화를 시킬 수 있는 구조를 선택했습니다.
이미지나 아이콘도 프로젝트 폴더에 포함시켜야하므로 assets 폴더로 분리히였습니다.

```

/FE-TODO
│── index.html
│── css/
│   ├── reset.css  // 기본 css 초기화
│   ├── style.css
│── js/
│   ├── main.js
│   ├── components // 컴포넌트 분리
│   ├── utils  // 기능 분리
│── assets/
│   ├── icons/
│   ├── images/
│── data/
│   ├── mockdata.js  // mock데이터

```

## 디자인 시스템(css)

- reset.css를 사용하여 기본 css 제거
- css variables 문법을 사용하여 공통 css 변수로 사용

## branch명 컨밴션

- a. 기능 개발 브랜치 (Feature Branch)
  기능 개발을 위한 브랜치는 주로 feature/로 시작하고, 기능의 이름이나 설명을 덧붙여 구체적으로 명명합니다.

```
feature/login-page
feature/user-authentication
feature/refactor-header
```

b. 버그 수정 브랜치 (Bugfix Branch)
버그 수정을 위한 브랜치는 bugfix/로 시작하고, 수정할 버그의 내용이나 번호를 덧붙여 명명합니다.

```
bugfix/fix-login-error
bugfix/fix-navbar-dropdown
```

### 브랜치명 작성 규칙

- 소문자 사용: 브랜치명은 보통 소문자로 작성합니다.
- 슬래시(/) 사용: 기능, 버그 수정 등을 구분할 때 슬래시를 사용합니다.
- 짧고 명확한 설명: 브랜치명은 최대한 짧고 명확하게 작성해야 합니다. 긴 설명이 필요하다면 하이픈(-)을 사용하여 여러 단어를 구분합니다.
- 이슈 번호 포함: 가능하면 브랜치명에 관련된 이슈 번호를 포함하는 것이 좋습니다. 예를 들어, feature/123-login-page처럼 사용할 수 있습니다.
