# DOM API 활용

## 1. 요소 선택
```javascript
// 단일 요소 선택
const modal = document.querySelector('.modal');
const button = document.querySelector('.action-history__footer-btn-text');
```

## 2. 모달 제어
```javascript
// 모달 열기
modal.showModal();  // backdrop과 함께 모달 표시

// 모달 닫기
modal.close();      // 모달 숨기기
```

## 3. 이벤트 리스너
```javascript
// 클릭 이벤트 처리
button.addEventListener('click', () => {
    modal.showModal();
});
```