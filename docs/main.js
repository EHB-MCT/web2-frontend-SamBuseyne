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

/***/ "./src/classes/User.js":
/*!*****************************!*\
  !*** ./src/classes/User.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\nclass User {\r\n  constructor(firstname, lastname, email, password) {\r\n    this.firstname = firstname;\r\n    this.lastname = lastname;\r\n    this.email = email;\r\n    this.password = password;\r\n  }\r\n\r\n  // get token() {\r\n  //   return localStorage.getItem('token');\r\n  // }\r\n  // set token(t) {\r\n  //   localStorage.setItem('token', t);\r\n  // }\r\n\r\n  // logout(t) {\r\n  //   localStorage.removeItem(\"token\",t);\r\n  //   location.reload();\r\n  // }\r\n\r\n  // async login(email, password) {\r\n  //   fetch(\"Link API\",{\r\n  //     method: \"POST\",\r\n  //     body: JSON.stringify({email,password})\r\n  //   })\r\n  //     .then((response) => {\r\n  //       return response.json();\r\n  //     })\r\n  //     .then((data)=>{\r\n  //       this.service.userID = data.handle;\r\n  //       this.token = data.token;\r\n  //       if(data.token){\r\n  //         this.data = data.token;\r\n  //         document.getElementById('loginForm').style.display = \"none\";\r\n  //       }else{\r\n  //         console.log(\"wrong password\");\r\n  //       }\r\n  //       console.log(this.token);\r\n  //     });\r\n  // }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n\n//# sourceURL=webpack://web2-frontend-sambuseyne/./src/classes/User.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_User_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/User.js */ \"./src/classes/User.js\");\n\"Use strict\";\r\n\r\n\r\n\r\n\r\n\r\n// const server = {\r\n//     userID: null,\r\n//     searchItem: \"\",\r\n//     user: new User(),\r\n//     codestage: null, //variable to run different parts of the code without having issues of unfinished code\r\n\r\n\r\n//     init() {\r\n//         this.codestage = 0; //testing searchbar without having to login\r\n//         if (this.codestage = \"0\") {\r\n//             this.searchEngine()\r\n\r\n//         } else if (this.codestage = \"1\") {\r\n//             this.initFields();\r\n//             this.render();\r\n\r\n//             if (this.user.token != null) {\r\n//                 this.checkInput();\r\n//             }\r\n//         }\r\n//     },\r\n\r\n//     initFields() {\r\n//         document.getElementById('loginSection').addEventListener(\"click\", (e) => {\r\n//             e.preventDefault();\r\n//             console.log(\"logging in\")\r\n//             const email = document.getElementById('emailUser').value;\r\n//             const password = document.getElementById('passwordUser').value;\r\n//             console.log(\"credentials are:\", email, password)\r\n//         })\r\n//     },\r\n\r\n//     searchEngine() {\r\n//         document.querySelector('#inputNavigation').addEventListener('keypress', function (e) {\r\n//             if (e.key === 'Enter') {\r\n//                 const userInput = document.getElementById('searchItem').value;\r\n//                 console.log(userInput)\r\n//             }\r\n//         });\r\n//         const content = document.getElementById(\"searchItem\");\r\n\r\n//     }\r\n// }\r\n\r\n// server.init();\r\n\r\n\r\n\r\nwindow.onload = function () {\r\n\r\n    let url = `https://web2-backend-sambuseyne.herokuapp.com/movie?id=1234`;\r\n\r\n    document.getElementById('shuffleButton').addEventListener('click', () => {\r\n\r\n        fetch(url)\r\n            .then(response => {\r\n                return response.json();\r\n            })\r\n            .then(data => {\r\n                console.log(data)\r\n                // let movieData = data.Search;\r\n                let poster = document.getElementById(\"moviePoster\")\r\n                let htmlString = \"\";\r\n                htmlString += `\r\n                <figure id=\"${data.name}\">\r\n                    <img src=\"${data.name}\" alt=\"${data.name}\">\r\n                </figure>\r\n                <div class=\"movieInfoSection\">\r\n                    <p>${data.name}</p>\r\n                    <p>${data.year}</p>\r\n                    <button class=\"addButton\">+</button>\r\n                </div> `;\r\n                poster.innerHTML = htmlString;\r\n            })\r\n    });\r\n\r\n    document.getElementById('searchButton').addEventListener('click', () =>{\r\n        fetch(`https://web2-backend-sambuseyne.herokuapp.com/movie?id=1234`)\r\n        .then(response =>{\r\n            return response.json();\r\n        })\r\n        .then(data =>{\r\n            console.log(data)\r\n            let results = document.getElementById('resultsContainer')\r\n            let htmlString = \"\";\r\n            htmlString +=`\r\n            <p>${data.name}</p>\r\n            <p>${data.director}</p>\r\n            <p>${data.year}</p>`;\r\n            results.innerHTML = htmlString;\r\n        })\r\n\r\n    });\r\n}\n\n//# sourceURL=webpack://web2-frontend-sambuseyne/./src/script.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;