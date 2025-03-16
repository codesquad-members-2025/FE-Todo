# 폴더 구조

```cli
FE-Todo/
│── js_dir/
│   │── web/                # 🌍 사용자 인터페이스 (UI & 이벤트 처리)
│   │   │── index.js        # 페이지 로드 및 초기 실행
│   │   │── eventHandlers.js # (컨트롤러) 이벤트 감지 및 store 호출
│   │
│   │── controller/          # 🎮 UI와 store를 연결하는 역할 (컨트롤러)
│   │   │── inputController.js  # 입력값 읽고 store에 전달
│   │   │── taskController.js   # 상태 변경 시 UI 업데이트 담당
│   │
│   │── store/               # 📦 데이터 상태 관리
│   │   │── store.js        # store 객체 (데이터 상태 관리 & localStorage 동기화)
│   │   │── indexedDB.js    # IndexedDB 데이터 저장 모듈 (추후 추가 가능)
│   │
│   │── component/           # 🏗 UI 관련 DOM 조작 함수 (컴포넌트)
│   │   │── addCardUi.js     # 카드 UI 생성 및 조작
│   │   │── template.js      # 카드 템플릿 함수
│   │
│   │── utils/               # 🛠 공통 유틸리티 함수 (희망편...)
│   │   │── domUtils.js      # DOM 조작 관련 공통 함수
│   │   │── storageUtils.js  # localStorage / IndexedDB 관련 함수
│
│── assets/                  # 🎨 정적 파일 (CSS, 이미지)
│   │── styles.css
│   │── images/
│
│── index.html               # 메인 페이지

```
