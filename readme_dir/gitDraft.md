🔥 GitHub Draft To-Do List (카드 드래그 앤 드롭 구현)

⸻

🔹 카드 드래그 앤 드롭 기능 구현

🛠 기본 설정
• 아이템(.todo-card)에 draggable="true" 속성 추가
• 전체 칸반(.page-main\_\_columnlist)에 이벤트 위임 설정
• dragstart 이벤트 감지를 위해 캡처링(useCapture) 방식 사용

⸻

🔥 dragstart 이벤트 처리
• dragstart 이벤트 발생 시, event.target을 가져와 변수에 저장
• 드래그 중인 카드에 .dragging 클래스 추가 (opacity 변경)
• 드래그 종료 시(dragend), .dragging 클래스를 제거하는 이벤트 등록

⸻

🔥 dragover 이벤트 처리 (칼럼 내 이동)
• 모든 칼럼(.column)에 dragover 이벤트 등록 (반복문 사용)
• event.preventDefault()를 호출하여 기본 동작 해제
• dragover가 계속 발생하는 동안, 드래그한 카드의 위치를 결정

⸻

🔥 드래그한 카드의 삽입 위치 결정
• dragging 클래스를 가진 카드 제외한 칼럼 내 아이템 목록 가져오기
• event.clientY(마우스 위치)와 각 아이템의 Y 좌표 비교
• offset = event.clientY - (box.top + box.height / 2) 계산
• offset이 양수인 아이템은 제외 (음수일 때만 실행)
• 가장 작은 offset을 가진 아이템을 찾아 반환

⸻

🔥 카드 이동 로직 구현
• 찾은 아이템이 undefined이면 칼럼 맨 아래(appendChild)에 추가
• 찾은 아이템이 있으면 그 앞에(insertBefore) 드래그한 카드 삽입

⸻

🔍 디버깅 & 로그 추가
• 콘솔 로그를 추가하여 카드 이동 과정 추적
• UI 구현 완료 후, 필요 없는 console.log() 정리

⸻
