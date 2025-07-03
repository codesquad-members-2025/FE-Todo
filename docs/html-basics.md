# HTML 기초

## 시맨틱 태그 사용 원칙

### 1. 의미에 맞는 태그 선택
- `header`: 상단의 "TASKIFY" 로고/제목 영역
- `main`: 칸반 보드의 주요 내용을 감싸는 영역
- `section`: 각각의 칼럼("해야할 일", "하고있는 일", "완료한 일")
- `article`: 각각의 카드 아이템
- `aside`: 우측의 "사용자 활동 기록" 영역
- `h1`: "TASKIFY" 메인 제목
- `h2`: 각 칼럼의 제목 ("해야할 일" 등)
- `button`: 추가(+), 삭제(x) 등의 동작 버튼

### 2. div 태그 사용
- 카드 내용을 감싸는 래퍼
- 레이아웃을 위한 컨테이너
- 스타일링을 위한 그룹화

### 3. SVG 아이콘 사용
- `svg` 태그로 직접 마크업
- 색상 변경이 가능하도록 `currentColor` 활용
- 아이콘의 크기는 `width`와 `height` 속성으로 지정

### 4. dialog 태그 사용
- 모달 다이얼로그를 위한 시맨틱 태그
- 기본적으로 `display: none`과 `display: block` 상태만 가짐
- 레이아웃을 위해서는 내부에 컨테이너 div 필요
```html
<dialog class="modal">
    <div class="modal__content-area">
        <!-- 모달 내용 -->
    </div>
</dialog>
```