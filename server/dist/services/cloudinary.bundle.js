/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/cloudinary.js":
/*!************************************!*\
  !*** ./src/services/cloudinary.js ***!
  \************************************/
/***/ (() => {

eval("// const { v2: cloudinary } = require(\"cloudinary\");\n//\n// export const cloudinaryHandler = () => {\n//     cloudinary.config({\n//         cloud_name: process.env.cloud_name,\n//         api_key: process.env.api_key,\n//         api_secret: process.env.api_secret,\n//     });\n//\n//     return cloudinary;\n// };\n//\n// // export const uploadImage = (imagePath: string, options?: { dir?: string; fieldName?: string; overwrite?: boolean }) => {\n// export const uploadImage = (imagePath, options) => {\n//     return new Promise(async (resolve, reject) => {\n//         try {\n//             let s = await cloudinaryHandler().uploader.upload(imagePath, {\n//                 use_filename: true,\n//                 unique_filename: false,\n//                 folder: options?.dir ? options.dir : \"\",\n//                 overwrite: options?.overwrite ? options.overwrite : false,\n//             });\n//             resolve({ ...s, fieldName: options?.fieldName });\n//         } catch (ex) {\n//             reject(ex);\n//         }\n//     });\n// };\n\n//# sourceURL=webpack://server/./src/services/cloudinary.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/services/cloudinary.js"]();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;