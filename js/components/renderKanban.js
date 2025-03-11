export function render(data) {
    
}

fetch(".././data/mock.json")
.then(response => response.json())
.then(data => render(data))
.catch(error => console.error(`데이터 로드 오류: ${error})`));