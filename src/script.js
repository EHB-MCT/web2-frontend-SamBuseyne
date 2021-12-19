"Use strict";

let orderKey = "0"
let sleutel = "";
let htmlString = "";
let url = `https://web2-backend-sambuseyne.herokuapp.com/movies`;
let movies = []

setup()

function setup() {
    initWebsite();
    checkLoginState();
    checkSwitchLogin();
    checkPages();
    changeProfile();
}


function checkLoginState() {
    if (sessionStorage.id || sessionStorage.name || sessionStorage.login) {
        //hier all functies runnen wanneer user ingelogd is
        console.log("running userbased functions")
    }
}

function logOut() {
    if (sessionStorage.name) {
        document.getElementById("logOut").addEventListener('click', e => {
            sessionStorage.clear();
            window.location.href = "../index.html";
        })
    }

}

function changeProfile() {
    if (sessionStorage.name) {
        const listItem = document.querySelector("a:last-child")
        const newItem = document.createElement('a');
        newItem.innerHTML = `<a id="profileName" href="./html/profile.html">${sessionStorage.name}</a>`;
        listItem.parentNode.replaceChild(newItem, listItem);
    }
}

async function getMovies() {

    if (sessionStorage.login) {

        await fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                movies = data;
                console.log("Oops i did a fetchcall");
                // renderMovies(movies);
            })
    }

    if (document.getElementById('releaseDate')) {
        document.getElementById('releaseDate').addEventListener('click', e => {
            let sortSetting = document.getElementById('releaseDate').id;
            updateMovieList(movies, sortSetting);
        })
    }

    if (document.getElementById('mostViews')) {
        document.getElementById('mostViews').addEventListener('click', e => {
            let sortSetting = document.getElementById('mostViews').id;
            updateMovieList(movies, sortSetting);
            console.log("views")
        })
    }

    if (document.getElementById('mostSearched')) {
        document.getElementById('mostSearched').addEventListener('click', e => {
            let sortSetting = document.getElementById('mostSearched').id;
            updateMovieList(movies, sortSetting);
        })
    }

    if (document.getElementById('rating')) {
        document.getElementById('rating').addEventListener('click', e => {
            let sortSetting = document.getElementById('rating').id;
            updateMovieList(movies, sortSetting);
        })
    }

    if (document.getElementById('trending')) {
        document.getElementById('trending').addEventListener('click', e => {
            let sortSetting = document.getElementById('trending').id;
            updateMovieList(movies, sortSetting);
        })
    }
    if (document.getElementById('searchButton')) {
        document.getElementById('searchButton').addEventListener('click', e => {
            let input = document.getElementById('field').value;
            updateMovieList(movies, sortSetting);
        })
    }
}


//starting the website
function initWebsite() {
    if (!sessionStorage.login && document.getElementById("loginButton")) {
        document.getElementById("loginButton").addEventListener('click', async event => {
            event.preventDefault();
            let userDetails = await checkUserInput();
            if (userDetails) {
                login(userDetails[0], userDetails[1]);
            }
        });
    } else if (!sessionStorage.login && document.getElementById("signUpButton")) {
        console.log("signup")
        document.getElementById("signUpButton").addEventListener('click', async event => {
            event.preventDefault();
            console.log("signup")
            //     let userDetails = await checkUserInput();
            //     if (userDetails) {
            //         login(userDetails[0], userDetails[1]);
            //     }
        });
    }
}

//get the userdata
async function checkUserInput() {
    console.log(sessionStorage.login)
    let email = document.getElementById("emailUser").value;
    let pass = document.getElementById("passwordUser").value;
    return [email, pass];
}

//login fetch
function login(email, password) {
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data) {
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("login", data.login);
                sessionStorage.setItem("name", data.name);
                window.location.href = "../index.html";
            } else {
                console.log('Wrong password or email!');
            }
        })
}

//render the movies on the pages
function renderMovies(movies) {
    console.log("rendering");
    let movieHTML = "";
    movies.forEach(m => {
        movieHTML += `
    <a class="movieContainer" href="../html/info.html">
    <div>
    <figure>
    <img src="${m.poster}" alt="${m.name}">
    </figure>
    <p>${m.name}</p>
    <p>${m.director}</p>
    <p>${m.year}</p>
    <p>Views: ${m.views}</p>
    <p>Searches: ${m.searches}</p>
    <p>Rating: ${m.rating}/100</p>
    <p>Trending: ${m.trending}</p>
    </div>
    </a>
`
        document.getElementById('resultsContainer').innerHTML = movieHTML;
    });
}


function shuffleFunction() {
    document.getElementById('shuffleButton').addEventListener('click', () => {
        let newList = [];
        htmlString = "";
        movies.sort(() => Math.random() - 0.5);
        newList = movies.slice(0, 3);
        for (let m of newList) {
            htmlString +=
                `<div class="moviePoster">
                <figure id="${m.name}">
                <img src="${m.poster}" alt="${m.name}">
            </figure>
            <div class="movieInfoSection">
                <p>${m.name}</p>
                <p>${m.year}</p>
                <button class="addButton">+</button>
            </div>
            </div>`;
            document.getElementById('shuffle').innerHTML = htmlString;
        }
    });
}

//sort movies when loading in the first time
function sortMovies(movies, sortSetting) {
    if (sortSetting == "year") {
        movies.sort((a, b) => {
            return b.year - a.year;
        });
    }
}

//big sorting machine, sort/filter the movies and put them in new list
function updateMovieList(movies, sortSetting) {

    let newList = [];
    if (sortSetting == "releaseDate" && orderKey == "0") {
        movies.sort((a, b) => {
            return a.year - b.year

        });
        newList = movies;
        orderKey = "1";

    } else if (sortSetting == "releaseDate" && orderKey == "1") {
        movies.sort((a, b) => {
            return b.year - a.year

        });
        newList = movies;
        orderKey = "0";

    } else if (sortSetting == "rating" && orderKey == "0") {
        console.log("let's go down")
        movies.forEach(m => {
            if (m.rating) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return b.rating - a.rating
        });
        orderKey = "1";


    } else if (sortSetting == "rating" && orderKey == "1") {
        console.log("let's go up")
        movies.forEach(m => {
            if (m.rating) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return a.rating - b.rating
        });
        orderKey = "0";

    } else if (sortSetting == "mostSearched" && orderKey == "0") {
        movies.forEach(m => {
            if (m.searches) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return b.searches - a.searches
        })
    } else if (sortSetting == "trending" && orderKey == "0") {
        movies.forEach(m => {
            if (m.trending == "yes") {
                newList.push(m)

            }
        })
    } else if (sortSetting == "mostViews" && orderKey == "0") {
        movies.forEach(m => {
            if (m.views) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return b.view - a.view
        })
    }
    renderMovies(newList);
}

//change login form
async function checkSwitchLogin() {
    if (!sessionStorage.login) {
        document.getElementById("loginPage").addEventListener('click', event => {
            console.log(event.target.className)
            if (event.target.className = "non-activeButton" && sleutel == 0) {
                htmlString = ""
                htmlString += `
                    <div id="loginSection">
                        <p>Create a new account</p>
                        <form action="" id="loginForm">
                            <input type="text" id="emailUser" placeholder="Email">
                            <input type="password" id="passwordUser" placeholder="Password">
                            <input type="password" id="passwordUserConfirmation" placeholder="Confirm Password">
                        </form>
                        <button id="signUpButton">Sign</button>
                    </div>
                    `;
                document.getElementById('loginContainer').innerHTML = htmlString;
                sleutel = 1;
            } else if (event.target.className = "non-activeButton" && sleutel == 1) {
                htmlString = ""
                htmlString += `
                    <div id="loginSection">
                        <form action="" id="loginForm">
                            <input type="text" id="emailUser" placeholder="Email">
                            <input type="text" id="passwordUser" placeholder="Password">
                        </form>
                        <button id="signUpButton">Login</button>
                    </div>
                    `;
                document.getElementById('loginContainer').innerHTML = htmlString;
                sleutel = 0;
            }
        })
    }
}


function loadUserBasedContent(guide) {
    console.log("You are logged in bro!")
    if (guide == "watch") {
        console.log("Let's show the watchlist page")
    } else if (guide == "shuffle") {
        console.log("Let's show the shuffle page")
        getMovies()
        shuffleFunction(movies);
    } else if (guide == "advanced") {
        console.log("Let's show the advanced page")
        getMovies();
        updateMovieList();
        // checkSortings(movies);
    } else if (guide == "info") {
        console.log("Let's show the info page")
    } else if (guide == "login") {
        console.log("Let's show the login page")
    } else if (guide == "index") {
        console.log("Let's show the homepage")
    } else if (guide == "profile") {
        console.log("Let's show the profile page")
        logOut();
    }
}



//check on which pages the user => load code according to the page
function checkPages() {
    if (document.URL.includes("shuffle")) {
        console.log("you are on the shuffle pages");
        loadUserBasedContent("shuffle");

    } else if (document.URL.includes("advanced")) {
        console.log("you are on the advanced pages");
        loadUserBasedContent("advanced");

    } else if (document.URL.includes("index")) {
        console.log("you are on the home pages");
        loadUserBasedContent("index");

    } else if (document.URL.includes("watchlist")) {
        console.log("you are on the watchlist pages");
        loadUserBasedContent("watch");
    } else if (document.URL.includes("profile")) {
        console.log("you are on the profile page");
        loadUserBasedContent("profile");
    }
}







// const service = {

//     sortedMovies: [],
//     input: "",
//     check: "",
//     year: "",


//     init() {
//         this.checkPages()
//         this.checkSwitchLogin()
//         this.checkSearchCriteria();
//         sortedMovies = [];
//     },

//     checkSearchCriteria() {
//         window.onclick = e => {
//             let searchOption = e.target.id;
//             this.advancedSearch(this.input, this.check, this.year, searchOption)
//             // console.log(this.input, this.check, this.year, searchOption);
//         }
//     },

//     async checkPages() {
//         let shuffle = document.getElementById('shuffleButton')
//         let advanced = document.getElementById('searchButton')
//         if (shuffle) {
//             this.shuffleFunction()
//         } else if (advanced) {
//             this.checkInputUser()
//         }
//     },




//         if (check) {
//             console.log(check)
//             document.getElementById('searchButton').addEventListener('click', () => {
//                 fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)
//                     .then(response => {
//                         return response.json();
//                     })
//                     .then(data => {
//                         console.log(data);

//                         let sortedMovies = data.filter(function (data) {
//                             return data.genres == check
//                         })

//                         sortedMovies.forEach(function (m) {
//                             htmlString = "";
//                             htmlString +=
//                                 `
//                         <div class="movieContainer">
//                         <figure>
//                         <img src="${m.poster}" alt="${m.name}">
//                         </figure>
//                         <p>${m.name}</p>
//                         <p>${m.director}</p>
//                         <p>${m.year}</p>
//                         </div>`;
//                             document.getElementById('resultsContainer').innerHTML = htmlString;
//                         })
//                     })
//             });

//         }
//         if (sort) {

//         }


//     checkInputUser() {
//         document.getElementById('buttonSection').addEventListener('click', () => {
//             let selection = document.getElementById('yearList');
//             let selectionResult = selection.options[selection.selectedIndex].value;
//             if (document.querySelector('.genre:checked')) {
//                 let checkedBoxes = document.querySelector('.genre:checked').value;
//                 let userInput = null;
//                 this.advancedSearch(userInput, checkedBoxes)
//             } else if (document.getElementById("field").value) {
//                 userInput = document.getElementById("field").value;
//                 let checkedBoxes = null;
//                 this.advancedSearch(userInput, checkedBoxes)
//             } else if (!selectionResult == "0") {
//                 let userInput = null;
//                 let checkedBoxes = null;
//                 let selection = document.getElementById('yearList');
//                 let selectionResult = selection.options[selection.selectedIndex].value;
//                 this.advancedSearch(userInput, checkedBoxes, selectionResult);
//             } else {
//                 let userInput = null;
//                 let checkedBoxes = null;
//                 let selectionResult = null;
//                 this.advancedSearch(userInput, checkedBoxes, selectionResult);
//             }
//         })
//     },