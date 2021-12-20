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
    if (sessionStorage.name && !document.URL.includes("index")) {
        let listItem = document.querySelector("a:last-child")
        let newItem = document.createElement('a');
        newItem.innerHTML = `<a id="profileName" href="../html/profile.html">${sessionStorage.name}</a>`;
        listItem.parentNode.replaceChild(newItem, listItem);
    } else if (document.URL.includes("index") && sessionStorage.name) {
        let listItem = document.querySelector("a:last-child")
        let newItem = document.createElement('a');
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
            console.log("search button clicked")
            let sortSetting = document.getElementById('searchButton').id;
            let input = document.getElementById('field').value;
            console.log(sortSetting, input);
            updateMovieList(movies, sortSetting, input);
        })
    }
    if (document.getElementById("yearList")) {

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
        <div class="movieContainer">
        <a href="../html/info.html">
        <figure>
            <img src="${m.poster}" alt="${m.name}">
        </figure>
        </a>
        <div class="moviePosterContainer">
            <p>${m.name}</p>
            <p>${m.director}</p>
            <p>${m.year}</p>
            <div class="infoS">
                <div class="infoS1">
                    <p>Views: ${m.views}</p>
                    <p>Searches: ${m.searches}</p>
                </div>
                <div class="infoS2">
                    <p>Rating: ${m.rating}/100</p>
                    <p>Trending: ${m.trending}</p>
                </div>
            </div>
        </div>
        <button class="addFavourite">+</button>
    </div>

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
            htmlString += `
            <div class="movieContainer">
                <a href="../html/info.html">
                <figure>
                    <img src="${m.poster}" alt="${m.name}">
                </figure>
                </a>
                <div class="moviePosterContainer">
                    <p>${m.name}</p>
                    <p>${m.director}</p>
                    <p>${m.year}</p>
                    <div class="infoS">
                        <div class="infoS1">
                            <p>Views: ${m.views}</p>
                            <p>Searches: ${m.searches}</p>
                        </div>
                        <div class="infoS2">
                            <p>Rating: ${m.rating}/100</p>
                            <p>Trending: ${m.trending}</p>
                        </div>
                    </div>
                </div>
                <button class="addFavourite">+</button>
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
function updateMovieList(movies, sortSetting, input) {
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
    } else if (sortSetting == "searchButton") {
        movies.forEach(m => {
            let movieTitle = m.name
            let title = movieTitle.toLowerCase()
            if (title.includes(input.toLowerCase())) {
                newList.push(m)
            } else {
                //render message => no movies found
            }
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
                        <button id="loginButton">Login</button>
                    </div>
                    `;
                document.getElementById('loginContainer').innerHTML = htmlString;
                sleutel = 0;
            }
        })
    }
}

function addFavourite() {
    document.getElementById("shufflePage").addEventListener('click', event => {
        const favourite = event.target.className.indexOf("movieContainer");
        if (favourite) {
            if (event.target.className.indexOf('addFavourite') !== -1) {
                console.log("got add button!")
                //function that shows message (added movie) and function that adds movie to the userdata
            }
        }
    })






    // document.querySelectorAll('.addFavourite').addEventListener('click', e => {
    //     e.preventDefault();
    //     console.log("added to favourites")
    // })

}


function loadUserBasedContent(guide) {
    console.log("You are logged in bro!")
    if (guide == "watch") {
        console.log("Let's show the watchlist page")
    } else if (guide == "shuffle") {
        getMovies()
        shuffleFunction(movies, null, null);
        addFavourite();
    } else if (guide == "advanced") {
        getMovies();
        updateMovieList(movies, null, null);
        addFavourite();
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
        loadUserBasedContent("shuffle");
    } else if (document.URL.includes("advanced")) {
        loadUserBasedContent("advanced");
    } else if (document.URL.includes("index")) {
        loadUserBasedContent("index");
    } else if (document.URL.includes("watchlist")) {
        loadUserBasedContent("watch");
    } else if (document.URL.includes("profile")) {
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