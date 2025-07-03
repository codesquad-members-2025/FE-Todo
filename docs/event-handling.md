const modal = {
    name: '모달',
    close: function() {
        console.log(this.name);
    }
};

// 1. 일반적인 메서드 호출
modal.close();  // "모달" (this는 modal)

// 2. 이벤트 리스너에 직접 전달 (일반 함수)
cancelBtn.addEventListener('click', modal.close);  
// undefined (this는 cancelBtn이 됨)

// 3. 이벤트 리스너에 화살표 함수로 전달
cancelBtn.addEventListener('click', () => modal.close());  
// "모달" (화살표 함수는 this를 새로 바인딩하지 않아서 modal.close() 그대로 실행)