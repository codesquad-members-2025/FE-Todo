## JavaScript

1. Mock Data

- 테스트나 개발을 위해 실제 데이터 대신 사용하는 가짜 데이터
- mock (가짜의, 거짓된)
- Mock Data를 사용하는 이유

  - API 개발 전 프론트엔드 개발을 진행하거나, 테스트 환경에서 데이터를 쉽게 조작할 수 있다

  **Mock Data 만드는 방법**

  1. JSON형태의 객체 배열 : 일반적으로 쓰임

  ```javascript
  {
  "colums": [
  {
    "id": "toDo",
    "count": 0,
    "cardList": [
      {
        "title": "GitHub 공부하기",
        "content": "add, commit, push",
        "author": "author by web"
      },
      {
        "title": "블로그에 포스팅할 것",
        "content": "* GitHub 공부내용 \n * 모던 자바스크립트 1장 공부내용",
        "author": "author by web"
      }]
  }]
  }
  ```

  > JSON파일은 {...} 형식으로 작성되며 {...} 안에 데이터 정보를 넣는다  
  > 실제 API에서 받아올 데이터와 유사한 형태로 만듬

  2. JavaScript 클래스와 함수 활용

  - 동적으로 Mock Data를 생성할 수도 있다

2. 비동기 fetch()

- fetch API는 JavaScript에서 네트워크 요청을 보내고 응답을 처리하는 데 사용되는 API입니다
- fetch() 는 비동기적이며, 네트워크 리소스를 요청하고 그 결과를 처리하는 방식을 간단하게 만들어 준다
- 기본적으로 fetch() 는 Promise를 반환하므로, then이나 async/await 구문을 사용해 비동기 처리할 수 있다

  - 기본 문법

  ```javascript
  fetch(url)
    .then((response) => response.json()) // JSON 응답을 파싱
    .then((data) => console.log(data)) // 데이터를 처리
    .catch((error) => console.error("Error:", error)); // 오류 처리
  ```

  - 주요 특징

    - 비동기 처리: fetch는 기본적으로 비동기 요청을 처리  
      이로 인해 사용자 경험을 방해하지 않고 요청을 처리할 수 있다

    - Promise 반환: fetch()는 항상 Promise 객체를 반환하므로, 응답을 기다린 후 처리할 수 있다

    - 옵션 설정 가능: fetch() 는 GET 요청뿐만 아니라 POST, PUT, DELETE 등 다양한 HTTP 메서드를 지원  
      요청 헤더와 본문을 설정할 수 있다

3. ESM

- 자바스크립트의 모듈 시스템
- import/export 키워드를 사용해서 모듈을 가져오고 내보낼 수 있다

  - ESM 특징
    - 1. 정적(import/export 사용)  
         &rarr; 실행 전에 모듈 관계를 분석할 수 있어서 최적화가 가능
      2. 비동기 로딩(브라우저 지원)  
         &rarr; script type="module"을 사용하면 브라우저에서 비동기적으로 불러올 수 있다.
      3. 브라우저 & Node.js 지원
         &rarr; 최신 브라우저는 기본적으로 ESM을 지원  
          Node.js에서는 package.json에 "type": "module"을 추가하면 ESM을 사용할 수 있다
