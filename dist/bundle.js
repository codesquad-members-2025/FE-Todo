/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/card_component.js":
/*!**************************************!*\
  !*** ./components/card_component.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cardComponent: () => (/* binding */ cardComponent)\n/* harmony export */ });\n// Task Card Component\nconst cardComponent = ({ title, description, author }) => `\n  <div class=\"task-card flex flex-justify-space-between\">\n    <div class=\"task-card__left\">\n      <h1 class=\"task-card__title\">${title}</h1>\n      <h2 class=\"task-card__description\">${description}</h2>\n      <h3 class=\"task-card__author\">author by ${author}</h3>\n    </div>\n    <div class=\"task-card__right flex flex-column flex-justify-start\">\n      <img\n        class=\"task-card__right-delete-icon\"\n        src=\"./icons/delete.png\"\n        width=\"14px\"\n        alt=\"카드를 삭제하는 가위표 아이콘 버튼\"\n      />\n      <img\n        class=\"task-card__right-modify-icon\"\n        src=\"./icons/pen.png\"\n        width=\"14px\"\n        alt=\"카드를 수정하는 펜 아이콘 버튼\"\n      />\n    </div>\n  </div>\n`;\n\n\n//# sourceURL=webpack://taskify/./components/card_component.js?");

/***/ }),

/***/ "./components/column_component.js":
/*!****************************************!*\
  !*** ./components/column_component.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   columnComponent: () => (/* binding */ columnComponent)\n/* harmony export */ });\n/* harmony import */ var _card_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card_component.js */ \"./components/card_component.js\");\n\n\n// 완료한 일 Column\nconst columnComponent = ({ title, cards }) => {\n  const count = cards.length;\n\n  return `\n    <article class=\"column flex flex-column flex-justify-center\">\n      <header class=\"column__header flex flex-justify-space-between\">\n        <div class=\"column__header-left flex flex-align-center\">\n          <h1 class=\"column__header-title\">${title}</h1>\n          <h2 class=\"column__header-card-count\">${count}</h2>\n        </div>\n        <div class=\"column__header-right flex flex-align-center\">\n          <img\n            class=\"column__header-right-icon\"\n            src=\"./icons/plus.png\"\n            width=\"14px\"\n            alt=\"할 일(카드)을 추가하는 플러스 아이콘 버튼\"\n          />\n          <img\n            class=\"column__header-right-icon\"\n            src=\"./icons/delete.png\"\n            width=\"14px\"\n            alt=\"할 일(카드)을 지우는 가위표 아이콘 버튼\"\n          />\n        </div>\n      </header>\n      <!-- Task Card -->\n      ${cards.map((card) => (0,_card_component_js__WEBPACK_IMPORTED_MODULE_0__.cardComponent)(card)).join(\"\")}\n    </article>\n  `;\n};\n\n\n//# sourceURL=webpack://taskify/./components/column_component.js?");

/***/ }),

/***/ "./components/columns_component.js":
/*!*****************************************!*\
  !*** ./components/columns_component.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   columnsComponent: () => (/* binding */ columnsComponent)\n/* harmony export */ });\n/* harmony import */ var _column_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column_component */ \"./components/column_component.js\");\n\n\nconst columnsComponent = (data) => {\n  const { columns } = data;\n  return columns.map((column) => (0,_column_component__WEBPACK_IMPORTED_MODULE_0__.columnComponent)(column)).join(\"\");\n};\n\n\n//# sourceURL=webpack://taskify/./components/columns_component.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_columns_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/columns_component */ \"./components/columns_component.js\");\n\n\n// 히스토리 모달 등장하거나 사라지는 구현\nconst historyOpenBtn = document.querySelector(\".header__history-icon\");\nconst historyModal = document.querySelector(\".history-modal-container\");\nconst historyCloseBtn = document.querySelector(\".history-modal__header-close\");\n\n// 히스토리 모달 열고 닫기\nconst openHistoryModal = () => {\n  historyModal.style.cssText = `\n    display: grid;\n    animation: slideIn 0.5s forwards;\n  `;\n};\n\nconst closeHistoryModal = () => {\n  historyModal.style.cssText += \"animation: slideOut 0.5s forwards;\";\n  setTimeout(() => {\n    historyModal.style.display = \"none\";\n  }, 500);\n};\n\nhistoryOpenBtn.addEventListener(\"click\", openHistoryModal);\nhistoryCloseBtn.addEventListener(\"click\", closeHistoryModal);\n\n//\n\n// 히스토리 삭제 모달 이벤트\nconst historyDeleteBtn = document.querySelector(\".history-modal__footer-btn\");\nconst historyDeleteModal = document.querySelector(\".history-delete-modal\");\nconst historyDeleteCancelBtn = document.querySelector(\"#cancel-delete-btn\");\nconst historyDeleteApproveBtn = document.querySelector(\"#confirm-delete-btn\");\n\nhistoryDeleteModal.close();\n\n// 모달 열고 닫기\nconst showModal = () => {\n  historyDeleteModal.showModal();\n};\n\nconst deleteModal = () => {\n  historyDeleteModal.close();\n};\n\nhistoryDeleteBtn.addEventListener(\"click\", showModal);\nhistoryDeleteCancelBtn.addEventListener(\"click\", deleteModal);\n\n// 모든 사용자 기록 삭제\nhistoryDeleteApproveBtn.addEventListener(\"click\", () => {\n  // 사용자 기록 삭제\n  // 사용자 기록 삭제 후 모달 닫기\n  historyDeleteModal.close();\n});\n\n//\n\n// 칼럼 동적으로 생성하기\n// 비동기로 mock.json 불러오기\nconst fetchMockData = async () => {\n  const response = await fetch(\"./mock.json\");\n  const data = await response.json();\n  return data;\n};\n\nconst renderColumns = async () => {\n  const data = await fetchMockData();\n  console.log(data);\n\n  // 불러온 데이터를 컴포넌트에 넣어서 렌더링\n  const columnContainer = document.querySelector(\".column-container\");\n  columnContainer.innerHTML += (0,_components_columns_component__WEBPACK_IMPORTED_MODULE_0__.columnsComponent)(data);\n};\n\nrenderColumns();\n\n\n//# sourceURL=webpack://taskify/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;