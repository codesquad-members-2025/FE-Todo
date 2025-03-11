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

2. z-index

   &rarr; HTML 요소들의 쌓이는 순서를 결정하는 속성

   &rarr; 값이 클수록 더 앞에(위쪽) 배치되고, 값이 작을수록 뒤쪽으로 배치

- z-index 사용 시 주의할 점

  - position : static이면 z-index가 적용되지 않는다

    &rarr; 반드시 relative, absolute, fixed, sticky 중 하나를 사용해야 함

  - 부모 요소(z-index)의 영향을 받음

    &rarr; 부모가 z-index: 0이면, 자식 요소의 z-index 값이 커도 부모보다 앞에 올 수 없다

3. transform

   &rarr; 요소의 위치, 크기, 회전 등을 조절하는 속성
   \*\*\* position 속성과는 다르게, 실제 위치는 변하지 않고 시각적으로만 이동한다

- translate(x, y) &rarr; 이동  
  (좌우(x), 상하(y) 이동)

- scale(x, y) &rarr; 크기 조절  
  (x배, y배 확대/축소)

- rotate(deg) &rarr; 회전  
  (각도만큼 시계 방향으로 회전)

- skew(x, y) &rarr; 기울이기  
   (X축, Y축 기준으로 기울이기)

  **'transform', 'position'을 이용하여 내가 원하는 위치에 적용시키기**

  &rarr; Q. transform만으로 원하는 위치에 배치할 수 없는 이유는?

           A. transform은 상대적인 이동만 가능하다
             즉, 부모 요소의 위치에 따라 이동 범위가 달라진다
             따라서 position을 사용하면 정해진 기준으로 정확한 위치 지정이 가능하다

  **transform VS position/margin**  
  &rarr; 결론부터 말하자면 transform 이 position/margin보다 성능상 이점을 가지고 있다.  
  **왜?** 그이유는 !!!! **브라우저의 렌더링 방식** 때문

1.  레이아웃(Reflow) 발생 방지

    - position이나 margin을 변경하면 브라우저가 레이아웃을 다시 계산한다<br/>
      즉, 전체 문서에서 요소의 위치를 다시 정리하는 Reflow(리플로우) 과정이 발생

    - transform: translate()는 <br/>
      GPU(그래픽 처리 장치)를 이용한 변환(Composite 단계에서 처리)을 수행하기 때문에<br/>
      레이아웃을 다시 계산할 필요가 없음

2.  페인트(Paint) 단계 최소화

    - position, margin을 변경하면 브라우저가 요소를 다시 그리고(Paint 단계),<br/>
      다시 합성해야함(Composite 단계)

    - transform: translate()는 Paint 단계를 건너뛰고 바로 Composite 단계에서 처리할 수 있다
