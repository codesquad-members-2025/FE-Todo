# FE-Todo

## ⚒️ 주요 문제 해결 및 기술적 도전

- [데이터 상태 관리와 참조 문제](https://github.com/wan0514/FE-Todo/wiki/%5B%EA%B3%A0%EB%AF%BC%EA%B3%BC-%ED%95%B4%EA%B2%B0%5D-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%EC%99%80-%EC%B0%B8%EC%A1%B0)
- [디렉토리 구조 선택 (MVC & 도메인 중심)](https://github.com/wan0514/FE-Todo/wiki/%5B%EA%B3%A0%EB%AF%BC%EA%B3%BC-%ED%95%B4%EA%B2%B0%5D-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0-%EC%84%A0%ED%83%9D(mvc-&-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%A4%91%EC%8B%AC))
- [카드 삭제 기능](https://github.com/wan0514/FE-Todo/wiki/%5B%EA%B3%A0%EB%AF%BC%EA%B3%BC-%ED%95%B4%EA%B2%B0%5D-%EC%B9%B4%EB%93%9C-%EC%82%AD%EC%A0%9C-%EA%B8%B0%EB%8A%A5)
- [이벤트 리스너 중복 등록 문제](https://github.com/wan0514/FE-Todo/wiki/%5B%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%5D-%E2%80%90-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%A4%91%EB%B3%B5-%EB%93%B1%EB%A1%9D-%EB%AC%B8%EC%A0%9C)
- [UUID 버전 선택](https://github.com/wan0514/FE-Todo/wiki/%5B%EA%B3%A0%EB%AF%BC%EA%B3%BC-%ED%95%B4%EA%B2%B0%5D-%ED%98%84%EC%9E%AC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%A0-%EC%96%B4%EB%96%A4-version%EC%9D%98-UUID%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%A0-%EA%B2%83%EC%9D%B8%EA%B0%80%3F)


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

[👉 trello 링크](https://trello.com/invite/b/67c68babd9a1af4b5516d24b/ATTI7ba27d245056ee657df8fe675231c998CE45F5BE/todo-project)

# 설계

## 폴더 구조
주차별로 폴더 구조에 대한 회고를 거치며 개선했습니다.
- **1주차**: CSS/JS 분리, `assets` 도입  
- **2주차**: `components`, `utils`, `store`로 세분화  
- **3주차**: **도메인별 + 역할별 분리 구조** 도입 (`handlers`, `renderers`, `store`)
 
👉 [상세 구조 변화 보기](https://github.com/wan0514/FE-Todo/wiki/%5B%EC%84%A4%EA%B3%84%5D-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0-%EA%B0%9C%EC%84%A0-%EA%B3%BC%EC%A0%95)





