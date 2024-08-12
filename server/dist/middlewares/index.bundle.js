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

/***/ "./src/middlewares/index.js":
/*!**********************************!*\
  !*** ./src/middlewares/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   portfolioVisitorId: () => (/* binding */ portfolioVisitorId)\n/* harmony export */ });\n/* harmony import */ var _utils_getToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getToken */ \"./src/utils/getToken.js\");\n\nfunction auth(req, res, next) {\n  var token = (0,_utils_getToken__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(req);\n  if (!token) {\n    req.user = null;\n    return next(\"Please login first\");\n  }\n  // parseToken(token)\n  //     .then((u) => {\n  //         req.user = {\n  //             _id: u._id,\n  //             email: u.email,\n  //             role: u.role,\n  //         };\n  //         next();\n  //     })\n  //     .catch((err) => {\n  //         req.user = null;\n  //         next(\"Authorization, Please login first\");\n  //     });\n}\nfunction portfolioVisitorId(req, res, next) {\n  var id = req.cookies[\"rsl_portfolio_cookie\"];\n  if (!id) return next(\"Unauthorized\");\n  req.user = {\n    userId: id\n  };\n  next();\n}\n\n//# sourceURL=webpack://server/./src/middlewares/index.js?");

/***/ }),

/***/ "./src/utils/getToken.js":
/*!*******************************!*\
  !*** ./src/utils/getToken.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction getToken(req) {\n  var result = \"\";\n  var token = req.headers[\"authorization\"] || \"\";\n  if (token) {\n    result = token.split(\" \")[1];\n  }\n  return result;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getToken);\n\n//# sourceURL=webpack://server/./src/utils/getToken.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/middlewares/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;