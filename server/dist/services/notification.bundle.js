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

/***/ "./src/services/notification.js":
/*!**************************************!*\
  !*** ./src/services/notification.js ***!
  \**************************************/
/***/ (() => {

eval("// import events from \"events\"\n// import {ObjectId} from \"mongodb\";\n//\n// import Notification from \"../models/Notification\"\n// import pusher from \"src/pusher/pusher\";\n//\n// const notificationEvent = new events.EventEmitter()\n//\n// // add new notification\n// notificationEvent.on(\"notification\", async function (data) {\n//     const {\n//         recipientId,\n//         message = \"\",\n//         notificationType = \"\",\n//         timestamp = new Date(),\n//         isRead = false,\n//         link = \"\",\n//         metadata = {},\n//         groupId,\n//         senderId,\n//     } = data\n//\n//     try{\n//         let result = await Notification.insertOne({\n//             recipientId: new ObjectId(recipientId),\n//             message,\n//             notificationType,\n//             timestamp,\n//             isRead,\n//             link,\n//             metadata,\n//             groupId: new ObjectId(groupId),\n//             senderId: new ObjectId(senderId),\n//         })\n//\n//         let notification = await Notification.aggregate([\n//             {\n//                 $match: {\n//                     recipientId: new ObjectId(recipientId),\n//                     groupId: new ObjectId(groupId),\n//                     senderId: new ObjectId(senderId),\n//                 }\n//             },\n//         ])\n//\n//         pusher.trigger(\"public-channel\", recipientId, {\n//             notification: notification\n//         }).then(() => {\n//             console.log(\"noti send\")\n//         }).catch(ex => {\n//             console.log(ex?.message)\n//         })\n//     } catch (ex){\n//         console.log(ex.message)\n//     }\n//\n//\n// })\n//\n//\n// export default notificationEvent\n\n//# sourceURL=webpack://server/./src/services/notification.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/services/notification.js"]();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;