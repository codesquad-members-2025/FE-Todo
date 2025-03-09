## CSS

1. 스크롤을 구현하는 방법(overflow)

&rarr; overflow 속성을 사용하면 요소 내에서 스크롤이 필요할 때만 표시되도록 설정

- overflow: auto; &rarr; 내용이 넘칠 경우 자동으로 스크롤 표시
- overflow: hidden; &rarr; 넘치는 부분을 숨김
- overflow: scroll; &rarr; 항상 스크롤바 표시
- overflow-x: scroll; &rarr; 가로 스크롤
- overflow-y: scroll; &rarr; 세로 스크롤

&rarr; 스크롤 바 스타일 변경

- [적용시킬 요소]::-webkit-scrollbar &rarr; 스크롤바 스타일 변경 가능

  &rarr; 이 속성을 추가했을 때 기본적으로 가로/세로 스크롤바가 모두 스타일 적용됨

  &rarr; 만약 가로 스크롤이 필요없다면 'overflow-x: hidden;'를 추가

- [적용시킬 요소]::-webkit-scrollbar-thumb &rarr; 스크롤바 손잡이(드래그하는 부분)

- [적용시킬 요소]::-webkit-scrollbar-track &rarr; 스크롤 트랙 배경

```javascript
.scroll-box::-webkit-scrollbar {
  width: 8px; /* 세로 스크롤바 너비 */
}

.scroll-box::-webkit-scrollbar-thumb {
  background-color: #4CAF50; /* 스크롤바 색상 */
  border-radius: 4px;
}

.scroll-box::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 스크롤 트랙 배경 */
}
```
