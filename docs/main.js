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

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("\"Use strict\";\r\n\r\nlet htmlString = \"\";\r\n\r\n\r\nwindow.onload = async function () {\r\n    console.log(\"Script loaded!\")\r\n    //look what pages is active by what the user clicks\r\n    checkPages()\r\n}\r\n\r\nfunction checkPages() {\r\n    let shuffle = document.getElementById('shuffleButton')\r\n    let advanced = document.getElementById('searchButton')\r\n    if (shuffle) {\r\n        console.log(\"shuffle actived!\")\r\n        shuffleFunction()\r\n    } else if (advanced) {\r\n        console.log(\"advanced actived!\")\r\n        advancedSearch()\r\n    }\r\n}\r\n\r\nfunction shuffleFunction() {\r\n    let url = `https://web2-backend-sambuseyne.herokuapp.com/movies`;\r\n\r\n    document.getElementById('shuffleButton').addEventListener('click', () => {\r\n        fetch(url)\r\n            .then(response => {\r\n                return response.json();\r\n            })\r\n            .then(data => {\r\n                htmlString = \"\";\r\n                console.log(data);\r\n                data.sort(()=> Math.random()- 0.5);\r\n                data = data.slice(0,3);\r\n                console.log(data);\r\n                for (let m of data) {\r\n                    htmlString +=\r\n                        `<div class=\"moviePoster\">\r\n                        <figure id=\"${m.name}\">\r\n                        <img src=\"${m.poster}\" alt=\"${m.name}\">\r\n                    </figure>\r\n                    <div class=\"movieInfoSection\">\r\n                        <p>${m.name}</p>\r\n                        <p>${m.year}</p>\r\n                        <button class=\"addButton\">+</button>\r\n                    </div>\r\n                    </div>`\r\n                    ;\r\n                }\r\n                document.getElementById('shuffle').innerHTML = htmlString;\r\n            })\r\n    });\r\n}\r\n\r\n\r\nfunction advancedSearch() {\r\n    document.getElementById('searchButton').addEventListener('click', () => {\r\n        fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)\r\n            .then(response => {\r\n                return response.json();\r\n            })\r\n            .then(data => {\r\n                console.log(data)\r\n\r\n                for (let m of data) {\r\n                    htmlString +=\r\n                        `\r\n                    <div class=\"movieContainer\">\r\n                    <figure>\r\n                    <img src=\"${m.poster}\" alt=\"Tenet\">\r\n                    </figure>\r\n                    <p>Title: ${m.name}</p>\r\n                    <p>Director: ${m.director}</p>\r\n                    <p>Release: ${m.year}</p>\r\n                    </div>`;\r\n                }\r\n                document.getElementById('resultsContainer').innerHTML = htmlString;\r\n            })\r\n    });\r\n}\n\n//# sourceURL=webpack://web2-frontend-sambuseyne/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;