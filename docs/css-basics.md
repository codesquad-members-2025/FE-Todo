# CSS 기초

## 1. 디자인 시스템 변수화
```css
:root {
    /* 색상 시스템 */
    --grayscale-50: #fefefe;  /* 배경색 */
    --grayscale-600: #6e7191; /* 기본 텍스트 */
    
    /* 목적성 있는 변수명 */
    --text-default: var(--grayscale-600);
    --surface-default: var(--grayscale-50);
}
```
- 왜 변수를 사용하는가?
  - 일관된 디자인 시스템 유지
  - 테마 변경 용이
  - 유지보수 효율성

## 2. 아이콘 시스템
- 별도 `icon.css` 분리 이유
  - 아이콘 관련 스타일의 재사용성
  - 일관된 크기와 색상 관리
  - 유지보수 용이성

## 3. CSS 작성 단계
### 3.1 초기 개발 단계
- 피그마의 정확한 값을 하드코딩으로 구현
  ```css
  .card__title {
      width: 248px;
      height: 17px;
      font-size: 14px;
      color: rgba(20, 20, 43, 1);
  }
  ```
- 실제 동작하는 UI를 먼저 만들기
- 디자인 정확도 확보

### 3.2 리팩토링 단계
- 공통 스타일 추출
- 반응형 디자인 적용
- 하드코딩된 값들을 변수화
- 재사용 가능한 클래스 설계

## 4. 텍스트 스타일
- 제목: Pretendard Variable, bold(700)
- 본문: Pretendard Variable, medium(500)
- 캡션: 12px, grayscale-500
