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

eval("\"Use strict\";\r\n\r\nlet orderKey = \"0\"\r\nlet sleutel = \"\";\r\nlet htmlString = \"\";\r\nlet movies = [];\r\n\r\nsetup()\r\n\r\nfunction setup() {\r\n    initWebsite();\r\n    checkLoginState();\r\n    checkPages();\r\n    changeProfile();\r\n    checkInputIndexPage();\r\n    // logOut();\r\n    //functie die mogelijk maakt om te zoeken via hoofdpagina op woorden\r\n    //input doorgeven aan functie die gebruikt wordt om op naam te zoeken bij advanced\r\n}\r\n\r\nfunction checkInputIndexPage() {\r\n    console.log(\"Work this out\")\r\n    //dit nog verder uitwerken zie hierboven\r\n}\r\n\r\n\r\n//starting the website\r\nfunction initWebsite() {\r\n    if (document.URL.includes(\"login\")) {\r\n        checkSwitchLogin();\r\n        if (!sessionStorage.login && document.getElementById(\"loginButton\")) {\r\n            console.log(\"this is now working\")\r\n            document.getElementById(\"loginButton\").addEventListener('click', async event => {\r\n                event.preventDefault();\r\n                let userDetails = await checkUserInput();\r\n                if (userDetails) {\r\n                    login(userDetails[0], userDetails[1]);\r\n                }\r\n            });\r\n        } else if (!sessionStorage.login && document.getElementById(\"signUpButton\")) {\r\n            console.log(\"signup\")\r\n            document.getElementById(\"signUpButton\").addEventListener('click', async event => {\r\n                event.preventDefault();\r\n                console.log(\"signuppppp\")\r\n                //     let userDetails = await checkUserInput();\r\n                //     if (userDetails) {\r\n                //         login(userDetails[0], userDetails[1]);\r\n                //     }\r\n            });\r\n        }\r\n    }\r\n    return;\r\n}\r\n\r\n\r\nfunction checkLoginState() {\r\n    if (sessionStorage.id || sessionStorage.name || sessionStorage.login) {\r\n        //hier all functies runnen wanneer user ingelogd is\r\n        // functie hierin plaatsen die anders met if check session storage werken\r\n        console.log(\"running userbased functions\")\r\n    }\r\n}\r\n\r\n//get the userdata\r\nasync function checkUserInput() {\r\n    console.log(sessionStorage.login)\r\n    let email = document.getElementById(\"emailUser\").value;\r\n    let pass = document.getElementById(\"passwordUser\").value;\r\n    return [email, pass];\r\n}\r\n\r\n\r\n//check on which pages the user => load code according to the page\r\nfunction checkPages() {\r\n    if (document.URL.includes(\"shuffle\")) {\r\n        loadUserBasedContent(\"shuffle\");\r\n    } else if (document.URL.includes(\"advanced\")) {\r\n        loadUserBasedContent(\"advanced\");\r\n    } else if (document.URL.includes(\"index\")) {\r\n        loadUserBasedContent(\"index\");\r\n    } else if (document.URL.includes(\"watchlist\")) {\r\n        loadUserBasedContent(\"watch\");\r\n    } else if (document.URL.includes(\"profile\")) {\r\n        loadUserBasedContent(\"profile\");\r\n    }\r\n}\r\n//login fetch\r\nfunction login(email, password) {\r\n    fetch(`https://web2-backend-sambuseyne.herokuapp.com/login`, {\r\n            method: \"POST\",\r\n            headers: {\r\n                \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify({\r\n                email: email,\r\n                password: password\r\n            })\r\n        })\r\n        .then(response => {\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            console.log(data);\r\n            if (data) {\r\n                sessionStorage.setItem(\"id\", data.id);\r\n                sessionStorage.setItem(\"login\", data.login);\r\n                sessionStorage.setItem(\"name\", data.name);\r\n                window.location.href = \"../index.html\";\r\n            } else {\r\n                console.log('Wrong password or email!');\r\n            }\r\n        })\r\n}\r\n\r\n//register fetch\r\nfunction register(email, password, name) {\r\n    fetch(`https://web2-backend-sambuseyne.herokuapp.com/register`, {\r\n            method: \"POST\",\r\n            headers: {\r\n                \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify({\r\n                email: email,\r\n                password: password,\r\n                name: name\r\n            })\r\n        })\r\n        .then(response => {\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            console.log(data);\r\n            if (data) {\r\n                sessionStorage.setItem(\"id\", data.id);\r\n                sessionStorage.setItem(\"login\", data.login);\r\n                sessionStorage.setItem(\"name\", data.name);\r\n                window.location.href = \"../index.html\";\r\n            } else {\r\n                console.log('Wrong password or email!');\r\n            }\r\n        })\r\n}\r\n\r\n// function logOut(event) {\r\n//     console.log(\"logout function is running\")\r\n//     if (sessionStorage.name) {\r\n//         document.getElementById(\"inputNavigation\").addEventListener('click', event => {\r\n//             let logOutButton = event.target.className;\r\n//             if (logOutButton) {\r\n//                 sessionStorage.clear();\r\n//                 // window.location.href = \"../index.html\";\r\n//                 location.reload();\r\n//             }\r\n//         })\r\n//     }\r\n// }\r\n\r\nfunction changeProfile() {\r\n    if (sessionStorage.name && !document.URL.includes(\"index\")) {\r\n        let listItem = document.querySelector(\"a:last-child\")\r\n        let newItem = document.createElement('a');\r\n        newItem.innerHTML = `\r\n        <div class=\"dropdown\">\r\n        <a href=\"#\" class=\"dropbtn\">${sessionStorage.name}</a>\r\n        <div class=\"dropdown-content\">\r\n            <button class=\"logOut\">Log out</button>\r\n        </div>\r\n        </div>`;\r\n        listItem.parentNode.replaceChild(newItem, listItem);\r\n    } else if (document.URL.includes(\"index\") && sessionStorage.name) {\r\n        console.log(\"found the last a element on main page\")\r\n        let listItem = document.querySelector(\"a:last-child\")\r\n        let newItem = document.createElement('a');\r\n        newItem.innerHTML = `\r\n        <div class=\"dropdown\">\r\n        <a href=\"#\" class=\"dropbtn\">${sessionStorage.name}</a>\r\n        <div class=\"dropdown-content\">\r\n            <button class=\"logOut\">Log out</button>\r\n        </div>\r\n    </div>`;\r\n        listItem.parentNode.replaceChild(newItem, listItem);\r\n    }\r\n}\r\n\r\nasync function getMovies() {\r\n    let selection = document.getElementById('yearList');\r\n    if (sessionStorage.login) {\r\n        await fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)\r\n            .then(response => {\r\n                return response.json();\r\n            })\r\n            .then(data => {\r\n                movies = data;\r\n                console.log(\"fetched the data\");\r\n                renderWatchPage(movies);\r\n            })\r\n    }\r\n\r\n    if (document.getElementById('releaseDate')) {\r\n        document.getElementById('releaseDate').addEventListener('click', e => {\r\n            let sortSetting = document.getElementById('releaseDate').id;\r\n            updateMovieList(movies, sortSetting);\r\n        })\r\n    }\r\n\r\n    if (document.getElementById('mostViews')) {\r\n        document.getElementById('mostViews').addEventListener('click', e => {\r\n            let sortSetting = document.getElementById('mostViews').id;\r\n            updateMovieList(movies, sortSetting);\r\n        })\r\n    }\r\n\r\n    if (document.getElementById('mostSearched')) {\r\n        document.getElementById('mostSearched').addEventListener('click', e => {\r\n            let sortSetting = document.getElementById('mostSearched').id;\r\n            updateMovieList(movies, sortSetting);\r\n        })\r\n    }\r\n\r\n    if (document.getElementById('rating')) {\r\n        document.getElementById('rating').addEventListener('click', e => {\r\n            let sortSetting = document.getElementById('rating').id;\r\n            updateMovieList(movies, sortSetting);\r\n        })\r\n    }\r\n\r\n    if (document.getElementById('trending')) {\r\n        document.getElementById('trending').addEventListener('click', e => {\r\n            let sortSetting = document.getElementById('trending').id;\r\n            updateMovieList(movies, sortSetting);\r\n        })\r\n    }\r\n    if (document.getElementById('searchButton') && !(document.querySelector('.genre:checked'))) {\r\n        console.log('LOOK AT THIS!');\r\n        console.log(document.querySelector('.genre:checked'));\r\n        document.getElementById('searchButton').addEventListener('click', e => {\r\n            console.log(\"search button clicked\")\r\n            let sortSetting = document.getElementById('searchButton').id;\r\n            let input = document.getElementById('field').value;\r\n            updateMovieList(movies, sortSetting, input);\r\n        })\r\n    }\r\n    if (document.getElementById(\"yearList\") && !(selection.options[selection.selectedIndex].value == \"0\")) {\r\n        document.getElementById('searchButton').addEventListener('click', e => {\r\n            console.log(\"searching by year\")\r\n            let selection = document.getElementById('yearList');\r\n            let selectionResult = selection.options[selection.selectedIndex].value;\r\n            console.log(selectionResult)\r\n            let sortSetting = document.getElementById('yearList').id;\r\n            let input = null;\r\n            updateMovieList(movies, sortSetting, input);\r\n        })\r\n    }\r\n    if (document.querySelector('.genre:checked') && !(selection.options[selection.selectedIndex].value == \"0\")) {\r\n        console.log('LOOK AT THISSSSSSSSSSSSSSS!')\r\n        // document.getElementById(\"searchButton\").addEventListener('click', e => {\r\n        //     let checkedBoxes = document.querySelector('.genre:checked').value;\r\n        //     let input = null;\r\n        //     console.log(checkedBoxes);\r\n        //     updateMovieList(movies, sortSetting, input);\r\n        // })\r\n    }\r\n\r\n    //klopt niet checkt onmiddelijk bij inladen en dan kan er nog geen genres aangeklikt zijn\r\n    // is nu normaal gefixt\r\n}\r\n\r\n\r\n\r\n// document.getElementById('buttonSection').addEventListener('click', () => {\r\n\r\n//     if (document.querySelector('.genre:checked')) {\r\n//         let checkedBoxes = document.querySelector('.genre:checked').value;\r\n//         let userInput = null;\r\n//         this.advancedSearch(userInput, checkedBoxes)\r\n//     } else if (document.getElementById(\"field\").value) {\r\n//         userInput = document.getElementById(\"field\").value;\r\n//         let checkedBoxes = null;\r\n//         this.advancedSearch(userInput, checkedBoxes)\r\n//     } else if (!selectionResult == \"0\") {\r\n//         let userInput = null;\r\n//         let checkedBoxes = null;\r\n//         let selection = document.getElementById('yearList');\r\n//         let selectionResult = selection.options[selection.selectedIndex].value;\r\n//         this.advancedSearch(userInput, checkedBoxes, selectionResult);\r\n//     } else {\r\n//         let userInput = null;\r\n//         let checkedBoxes = null;\r\n//         let selectionResult = null;\r\n//         this.advancedSearch(userInput, checkedBoxes, selectionResult);\r\n//     }\r\n// })\r\n// }\r\n\r\n//render the movies on the pages\r\nfunction renderMovies(movies) {\r\n    console.log(\"rendering\");\r\n    let movieHTML = \"\";\r\n    movies.forEach(m => {\r\n        movieHTML += `\r\n        <div class=\"movieContainer\">\r\n        <a href=\"../html/info.html\">\r\n        <figure>\r\n            <img src=\"${m.poster}\" alt=\"${m.name}\">\r\n        </figure>\r\n        </a>\r\n        <div class=\"moviePosterContainer\">\r\n            <p>${m.name}</p>\r\n            <p>${m.director}</p>\r\n            <p>${m.year}</p>\r\n            <div class=\"infoS\">\r\n                <div class=\"infoS1\">\r\n                    <p>Views: ${m.views}</p>\r\n                    <p>Searches: ${m.searches}</p>\r\n                </div>\r\n                <div class=\"infoS2\">\r\n                    <p>Rating: ${m.rating}/100</p>\r\n                    <p>Trending: ${m.trending}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <button value=\"${m.movieid}\" class=\"addFavourite\">+</button>\r\n    </div>\r\n`\r\n        document.getElementById('resultsContainer').innerHTML = movieHTML;\r\n    });\r\n}\r\n\r\n\r\nfunction shuffleFunction(event) {\r\n    // document.getElementById(\"shufflePage\").addEventListener('click', event => {\r\n    //     // event.preventDefault();\r\n    //     const hyperlinks = document.querySelectorAll(\"img\").value;\r\n    //     console.log(hyperlinks);\r\n    //     const favourite = event.target.className.indexOf(\"movieContainer\");\r\n    //     if (favourite) {\r\n    //         console.log('step1')\r\n    //         console.log(event.target)\r\n    //         const item = event.target.value;\r\n    //         console.log(item);\r\n    //         sessionStorage.setItem(\"movieid\", item);\r\n    //         // if (event.target.className.indexOf('infoLink')) {\r\n    //         //     console.log('step2')\r\n    //         //     console.log(event.target)\r\n    //         //     const item = event.target.value;\r\n    //         //     console.log(item);\r\n    //         //     sessionStorage.setItem(\"movieid\", item);\r\n    //         // }\r\n    //     }\r\n    // })\r\n\r\n\r\n    document.getElementById('shuffleButton').addEventListener('click', () => {\r\n        let newList = [];\r\n        htmlString = \"\";\r\n        movies.sort(() => Math.random() - 0.5);\r\n        newList = movies.slice(0, 3);\r\n        for (let m of newList) {\r\n            htmlString += `\r\n            <div class=\"movieContainer\">\r\n                <a href=\"\">\r\n                <figure>\r\n                    <img src=\"${m.poster}\" alt=\"${m.name}\">\r\n                </figure>\r\n                </a>\r\n                <div class=\"moviePosterContainer\" value =\"${m.movieid}\">\r\n                    <p>${m.name}</p>\r\n                    <p>${m.director}</p>\r\n                    <p>${m.year}</p>\r\n                    <div class=\"infoS\">\r\n                        <div class=\"infoS1\">\r\n                            <p>Views: ${m.views}</p>\r\n                            <p>Searches: ${m.searches}</p>\r\n                        </div>\r\n                        <div class=\"infoS2\">\r\n                            <p>Rating: ${m.rating}/100</p>\r\n                            <p>Trending: ${m.trending}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <button class=\"addFavourite\">+</button>\r\n            </div>`;\r\n            document.getElementById('shuffle').innerHTML = htmlString;\r\n        }\r\n    });\r\n}\r\n\r\n//sort movies when loading in the first time\r\nfunction sortMovies(movies, sortSetting) {\r\n    if (sortSetting == \"year\") {\r\n        movies.sort((a, b) => {\r\n            return b.year - a.year;\r\n        });\r\n    }\r\n}\r\n\r\n//big sorting machine, sort/filter the movies and put them in new list\r\nfunction updateMovieList(movies, sortSetting, input) {\r\n    console.log(movies);\r\n    let newList = [];\r\n    if (sortSetting == \"releaseDate\" && orderKey == \"0\") {\r\n        console.log(\"by ascending year\")\r\n        movies.sort((a, b) => {\r\n            return a.year - b.year\r\n        });\r\n        newList = movies;\r\n        orderKey = \"1\";\r\n\r\n    } else if (sortSetting == \"releaseDate\" && orderKey == \"1\") {\r\n        console.log(\"by descending year\")\r\n        movies.sort((a, b) => {\r\n            return b.year - a.year\r\n        });\r\n        newList = movies;\r\n        orderKey = \"0\";\r\n\r\n    } else if (sortSetting == \"rating\" && orderKey == \"0\") {\r\n        console.log(\"by ascending rating\")\r\n        movies.forEach(m => {\r\n            if (m.rating) {\r\n                newList.push(m)\r\n            }\r\n        })\r\n        newList.sort((a, b) => {\r\n            return b.rating - a.rating\r\n        });\r\n        orderKey = \"1\";\r\n\r\n\r\n    } else if (sortSetting == \"rating\" && orderKey == \"1\") {\r\n        console.log(\"by descending rating\")\r\n        movies.forEach(m => {\r\n            if (m.rating) {\r\n                newList.push(m)\r\n            }\r\n        })\r\n        newList.sort((a, b) => {\r\n            return a.rating - b.rating\r\n        });\r\n        orderKey = \"0\";\r\n\r\n    } else if (sortSetting == \"mostSearched\" && orderKey == \"0\") {\r\n        console.log(\"by descending searches\")\r\n        movies.forEach(m => {\r\n            if (m.searches) {\r\n                newList.push(m)\r\n            }\r\n        })\r\n        newList.sort((a, b) => {\r\n            return b.searches - a.searches\r\n        });\r\n        orderKey = \"1\";\r\n    } else if ((sortSetting == \"mostSearched\" && orderKey == \"1\")) {\r\n        console.log(\"by ascending searches\")\r\n        movies.forEach(m => {\r\n            if (m.searches) {\r\n                newList.push(m)\r\n            }\r\n        });\r\n        newList.sort((a, b) => {\r\n            return a.searches - b.searches\r\n        });\r\n        orderKey = \"0\";\r\n    } else if (sortSetting == \"trending\" && orderKey == \"0\") {\r\n        console.log(\"by descending trends\")\r\n        movies.forEach(m => {\r\n            if (m.trending == \"yes\") {\r\n                newList.push(m)\r\n            }\r\n        });\r\n        orderKey = \"1\";\r\n    } else if (sortSetting == \"trending\" && orderKey == \"1\") {\r\n        console.log(\"by ascending trends\")\r\n        movies.forEach(m => {\r\n            if (m.trending == \"no\") {\r\n                newList.push(m)\r\n            }\r\n        });\r\n        orderKey = \"0\";\r\n    } else if (sortSetting == \"mostViews\" && orderKey == \"0\") {\r\n        console.log(\"by descending views\")\r\n        movies.forEach(m => {\r\n            if (m.views) {\r\n                newList.push(m)\r\n            }\r\n        })\r\n        newList.sort((a, b) => {\r\n            return b.views - a.views\r\n        });\r\n        orderKey = \"1\";\r\n    } else if (sortSetting == \"mostViews\" && orderKey == \"1\") {\r\n        console.log(\"by ascending views\")\r\n        movies.forEach(m => {\r\n            if (m.views) {\r\n                newList.push(m)\r\n            }\r\n        });\r\n        newList.sort((a, b) => {\r\n            return a.views - b.views\r\n        });\r\n        orderKey = \"0\";\r\n    } else if (sortSetting == \"searchButton\") {\r\n        movies.forEach(m => {\r\n            let movieTitle = m.name\r\n            let title = movieTitle.toLowerCase()\r\n            if (title.includes(input.toLowerCase())) {\r\n                newList.push(m)\r\n            } else {\r\n                //render message => no movies found\r\n            }\r\n        })\r\n    } else if (sortSetting == \"yearList\") {\r\n        console.log(\"by one exact year\")\r\n        movies.forEach(m => {\r\n            if (m.year = \"2017\") {\r\n                newList.push(m)\r\n            }\r\n        });\r\n        newList.sort((a, b) => {\r\n            return b.year - a.year\r\n        });\r\n        console.log(\"Here still working on\")\r\n        //verder uittypen\r\n    }\r\n    renderMovies(newList);\r\n}\r\n\r\n//change login form\r\nasync function checkSwitchLogin() {\r\n    if (!sessionStorage.login) {\r\n        document.getElementById(\"loginPage\").addEventListener('click', event => {\r\n            if (event.target.className =  true && sleutel == 0) {\r\n                htmlString = \"\"\r\n                htmlString += `\r\n                    <div id=\"loginSection\">\r\n                        <p>Create a new account</p>\r\n                        <form action=\"\" id=\"loginForm\">\r\n                            <input type=\"text\" id=\"emailUser\" placeholder=\"Email\">\r\n                            <input type=\"password\" id=\"passwordUser\" placeholder=\"Password\">\r\n                            <input type=\"password\" id=\"passwordUserConfirmation\" placeholder=\"Confirm Password\">\r\n                        </form>\r\n                        <button id=\"signUpButton\">Sign</button>\r\n                    </div>\r\n                    `;\r\n                document.getElementById('loginContainer').innerHTML = htmlString;\r\n                sleutel = 1;\r\n            } else if (event.target.className =  true && sleutel == 1) {\r\n                htmlString = \"\"\r\n                htmlString += `\r\n                    <div id=\"loginSection\">\r\n                        <form action=\"\" id=\"loginForm\">\r\n                            <input type=\"text\" id=\"emailUser\" placeholder=\"Email\">\r\n                            <input type=\"text\" id=\"passwordUser\" placeholder=\"Password\">\r\n                        </form>\r\n                        <button id=\"loginButton\">Login</button>\r\n                    </div>\r\n                    `;\r\n                document.getElementById('loginContainer').innerHTML = htmlString;\r\n                sleutel = 0;\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\n//function that shows message (added movie) and function that adds movie to the userdata\r\nfunction addFavourite() {\r\n    if (document.URL.includes(\"shuffle\")) {\r\n        document.getElementById(\"shufflePage\").addEventListener('click', event => {\r\n            const favourite = event.target.className.indexOf(\"movieContainer\");\r\n            if (favourite) {\r\n                if (event.target.className.indexOf('addFavourite') !== -1) {\r\n                    const item = event.target.value;\r\n                    console.log(item);\r\n                    let fMovie = {\r\n                        email: sessionStorage.name,\r\n                        movieid: item,\r\n                        favourite: true\r\n                    }\r\n                    console.log(fMovie);\r\n                }\r\n            }\r\n        })\r\n    } else if (document.URL.includes(\"advanced\")) {\r\n        document.getElementById(\"searchResults\").addEventListener('click', event => {\r\n            const favourite = event.target.className.indexOf(\"movieContainer\");\r\n            if (favourite) {\r\n                if (event.target.className.indexOf('addFavourite') !== -1) {\r\n                    const item = event.target.value;\r\n                    console.log(item);\r\n                    let fMovie = {\r\n                        email: sessionStorage.name,\r\n                        movieid: item,\r\n                        favourite: true\r\n                    }\r\n                    sendFavourite()\r\n                }\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\nfunction sendFavourite(event) {\r\n    console.log(\"Sending favourite movies to database\")\r\n    fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourite`, {\r\n            method: \"POST\",\r\n            headers: {\r\n                \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify({\r\n                email: sessionStorage.name,\r\n                movieid: event.target.value,\r\n                favourite: true\r\n            })\r\n        })\r\n        .then(response => {\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            console.log(data);\r\n        })\r\n}\r\n\r\nfunction loadProfileContent() {\r\n    let favMovies = [];\r\n    console.log(\"rendering profile content\");\r\n    fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourites`, {\r\n            method: \"GET\",\r\n            headers: {\r\n                \"Content-Type\": \"application/json\"\r\n            }\r\n        })\r\n        .then(response => {\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            data.filter(data =>data.email == sessionStorage.name)\r\n            console.log(data);\r\n            movies.forEach(m => {\r\n                if (m.movieid == data.movieid) {\r\n                    favMovies.push(m)\r\n                }\r\n            })\r\n            console.log(favMovies);\r\n\r\n            // let movieHTML = \"\";\r\n            // data.forEach(d => {\r\n            //     movieHTML += `\r\n            //     <div class=\"movieContainer\">\r\n            //     <div class=\"moviePosterContainer\">\r\n            //         <p>The Green Mile</p>\r\n            //         <p>Frank Darabont</p>\r\n            //         <p>1999</p>\r\n            //     </div>\r\n            //     <button class=\"addFavourite\">-</button>\r\n            // </div>`;\r\n            //     document.getElementById('profileContent').innerHTML = movieHTML;\r\n            // });\r\n        })\r\n}\r\n\r\nfunction infoPage(event) {\r\n    console.log(\"Running infopage function\")\r\n    let clicked = event.target.value;\r\n    console.log(clicked);\r\n\r\n    // if (document.URL.includes(\"shuffle\")) {\r\n    //     document.getElementById(\"shufflePage\").addEventListener('click', event => {\r\n    //         const favourite = event.target.className.indexOf(\"movieContainer\");\r\n    //         if (favourite) {\r\n    //             if (event.target.className.indexOf('addFavourite') !== -1) {\r\n    //                 const item = event.target.value;\r\n    //                 console.log(item);\r\n    //                 let fMovie = {\r\n    //                     email: sessionStorage.name,\r\n    //                     movieid: item,\r\n    //                     favourite: true\r\n    //                 }\r\n    //                 console.log(fMovie);\r\n    //             }\r\n    //         }\r\n    //     })\r\n    // }\r\n}\r\n\r\nfunction renderWatchPage(movies, favourites) {\r\n    console.log(\"showing watchlist page\")\r\n    console.log(movies);\r\n    let htmlString = \"\";\r\n    htmlString +=\r\n        `<h3>Favourite movies of ${sessionStorage.name}  </h3>`;\r\n    document.getElementById(\"favouritesTitle\").innerHTML = htmlString;\r\n}\r\n\r\n\r\nfunction loadUserBasedContent(guide) {\r\n    if (guide == \"watch\") {\r\n        getMovies();\r\n        renderWatchPage();\r\n        loadProfileContent(movies);\r\n    } else if (guide == \"shuffle\") {\r\n        getMovies()\r\n        shuffleFunction(movies, null, null);\r\n        addFavourite();\r\n        // infoPage();\r\n    } else if (guide == \"advanced\") {\r\n        getMovies();\r\n        updateMovieList(movies, null, null);\r\n        addFavourite();\r\n        // checkSortings(movies);\r\n    } else if (guide == \"info\") {\r\n        infoPage();\r\n    } else if (guide == \"login\") {\r\n        console.log(\"Let's show the login page\")\r\n    } else if (guide == \"index\") {\r\n        console.log(\"Let's show the homepage\")\r\n    }\r\n}\n\n//# sourceURL=webpack://web2-frontend-sambuseyne/./src/script.js?");

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