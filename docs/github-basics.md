# GitHub 협업 및 학습 문서

이 문서는 GitHub의 기본 개념과 협업 방식을 이해하기 위한 학습 자료입니다.

## 📌 GitHub 기본 개념

### 🔹 GitHub란?
GitHub는 **Git을 기반으로 한 코드 저장소 관리 플랫폼**입니다. 오픈소스 프로젝트, 협업 개발, 코드 리뷰 등을 쉽게 할 수 있도록 도와줍니다.

### 🔹 GitHub 주요 개념
- **저장소(Repository)**: 프로젝트의 코드와 파일을 저장하는 공간
- **Fork**: 다른 사람의 저장소를 복사하여 내 계정에서 독립적으로 관리하는 기능
- **Branch**: 독립적인 작업을 진행하기 위한 분리된 코드 공간
- **Pull Request(PR)**: 변경 사항을 원본 저장소로 병합 요청하는 기능
- **Merge**: PR이 승인된 후 변경 사항을 원본 저장소에 적용하는 과정
- **Upstream**: 원본 저장소 (보통 Fork한 저장소의 원래 저장소)
- **Origin**: 내 Fork 저장소

### 🔹 기본적인 GitHub 사용 흐름
1. **Fork:** 원본 저장소를 내 계정으로 복사
2. **Clone:** Fork한 저장소를 로컬로 가져오기
   ```bash
   git clone https://github.com/내-계정/저장소명.git
   ```
3. **Branch 생성 후 작업**
   ```bash
   git checkout -b 새로운-기능-브랜치
   ```
4. **변경 사항 커밋 & push**
   ```bash
   git add .
   git commit -m "설명 추가"
   git push origin 새로운-기능-브랜치
   ```
5. **PR 생성:** GitHub에서 `upstream/main`으로 Pull Request 제출
6. **Merge 후 최신 코드 유지**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

## 📢 추가 학습
더 자세한 내용은 [GitHub 공식 문서](https://docs.github.com/)를 참고하세요! 🚀