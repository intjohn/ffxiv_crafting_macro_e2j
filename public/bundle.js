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

/***/ "./assets/translations.json":
/*!**********************************!*\
  !*** ./assets/translations.json ***!
  \**********************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"Basic Synthesis\":\"作業\",\"Basic Touch\":\"加工\",\"Master\\'s Mend\":\"マスターズメンド\",\"Hasty Touch\":\"ヘイスティタッチ\",\"Rapid Synthesis\":\"突貫作業\",\"Observe\":\"経過観察\",\"Tricks of the Trade\":\"秘訣\",\"Waste Not\":\"倹約\",\"Veneration\":\"ヴェネレーション\",\"Standard Touch\":\"中級加工\",\"Great Strides\":\"グレートストライド\",\"Innovation\":\"イノベーション\",\"Final Appraisal\":\"最終確認\",\"Waste Not II\":\"長期倹約\",\"Byregot\\'s Blessing\":\"ビエルゴの祝福\",\"Precise Touch\":\"集中加工\",\"Muscle Memory\":\"確信\",\"Careful Synthesis\":\"模範作業\",\"Manipulation\":\"マニピュレーション\",\"Prudent Touch:\":\"倹約加工\",\"Advanced Touch\":\"上級加工\",\"Reflect\":\"真価\",\"Preparatory Touch\":\"下地加工\",\"Groundwork\":\"下地作業\",\"Delicate Synthesis\":\"精密作業\",\"Intensive Synthesis\":\"集中作業\",\"Trained Eye\":\"匠の早業\",\"Prudent Synthesis\":\"倹約作業\",\"Trained Finesse\":\"匠の神業\",\"Refined Touch\":\"洗練加工\",\"Daring Touch\":\"デアリングタッチ\",\"Immaculate Mend\":\"パーフェクトメンド\",\"Trained Perfection\":\"匠の絶技\"}');\n\n//# sourceURL=webpack://ffxiv_crafting_macro_e2j/./assets/translations.json?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_translations_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/translations.json */ \"./assets/translations.json\");\n\n\nconst tEJ = new Map();\nconst tJE = new Map();\n\nfunction loadTranslations() {\n  Object.entries(_assets_translations_json__WEBPACK_IMPORTED_MODULE_0__)\n    .forEach(([e, j]) => {\n      if (e && j) {\n          tEJ.set(e, j);\n          tJE.set(j, e);\n      }\n    });\n}\n\nconst parserPlaceholder = new RegExp(/(\\/(?:ac|action)\\s+)(.*)(?=(\\s+<[a-z.1-9]+>))/);\nconst parserActionOnly = new RegExp(/(\\/(?:ac|action)\\s+)(.*)$/);\n\n// Function to translate text\nfunction translateText(inputText, isE2J = true) {\n  const tMap = isE2J ? tEJ : tJE;\n  return inputText\n    .split('\\n')\n    .map(line => {\n      line = line.trim();\n      const actionParser = line.endsWith('>') ? parserPlaceholder : parserActionOnly;\n      const parseResult = actionParser.exec(line);\n      if (parseResult) {\n        const [_match, head, action, tail] = parseResult;\n        if (tMap.has(action)) {\n          const translatedAction = tMap.get(action);\n          return `${head}${translatedAction}${tail || ''}`;\n        }\n      }\n      return line;\n    })\n    .join('\\n');\n}\n\nloadTranslations();\n\n// Event listeners for user interactions\ndocument.addEventListener('DOMContentLoaded', () => {\n    const inputTextArea = document.getElementById('inputText');\n    const outputTextArea = document.getElementById('outputText');\n    const translateButton = document.getElementById('translateButton');\n    const languageToggle = document.querySelector('input[type=\"radio\"][name=\"languageOption\"]:checked');\n\n    translateButton.addEventListener('click', () => {\n        const inputText = inputTextArea.value;\n        const toJapanese = languageToggle.value === 'e2j';\n        const translatedText = translateText(inputText, toJapanese);\n        outputTextArea.value = translatedText;\n    });\n    translateButton.disabled = false; // Enable the button after loading translations\n});\n\n//# sourceURL=webpack://ffxiv_crafting_macro_e2j/./src/app.js?");

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