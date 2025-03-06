# 모달 스타일링

## 1. backdrop 스타일링
```css
.modal::backdrop {
    background-color: rgba(20, 33, 43, 0.3);  /* 반투명 배경 */
}
```

## 2. 모달 기본 속성
```css
.modal {
    margin: 0;
    border: none;
    padding: 0;
}
```

## 3. 모달 컨텐츠 영역
```css
.modal__content-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px 24px;
    gap: 32px;
    border-radius: 8px;
    background-color: rgba(254, 254, 254, 1);
    box-shadow: 0px 2px 8px 0px rgba(110, 128, 145, 0.16);
    
    /* 중앙 정렬 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## 4. 주의사항
- dialog 태그는 display 속성을 직접 제어하지 않음
- 내부 컨테이너로 레이아웃 구성
- `::backdrop`은 모달이 열릴 때만 표시됨