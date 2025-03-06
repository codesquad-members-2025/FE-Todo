# CSS 레이아웃

## 1. 전체 페이지 구조
```css
body {
    min-height: 100vh;
    padding: 0 80px;
}
```
- 최소 높이 100vh로 전체 화면 활용
- 좌우 여백 80px로 컨텐츠 영역 확보

## 2. Flexbox 레이아웃
### 2.1 앱 헤더
```css
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
}
```
- 로고와 히스토리 버튼 양끝 정렬
- 수직 중앙 정렬

### 2.2 칸반 보드
```css
.kanban {
    display: flex;
    padding-top: 32px;
    gap: 24px;
}

.kanban__column {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
```
- 칼럼들을 가로로 배치
- 칼럼 간 간격 24px
- 각 칼럼 너비 320px 고정

### 2.3 칼럼 헤더
```css
.column-header {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.column-header__text-area {
    display: flex;
    align-items: center;
    gap: 8px;
}
```
- 제목과 버튼 영역 양끝 정렬
- 제목과 뱃지 사이 8px 간격

### 2.4 카드 컴포넌트
```css
.card {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    gap: 16px;
}

.card__text-area {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
```
- 텍스트 영역과 버튼 영역 분리
- 내부 여백 16px
- 텍스트 영역 세로 배치

## 3. 공통 레이아웃 패턴
- 버튼들은 24x24 크기로 통일
- 간격은 8px, 16px, 24px 등 8의 배수 사용
- 컨테이너 패딩 16px 일관성 유지
