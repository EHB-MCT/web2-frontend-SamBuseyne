"Use strict";

let orderKey = "0"
let sleutel = "";
let htmlString = "";
let movies = [];

setup()

function setup() {
    initWebsite();
    checkLoginState();
    checkPages();
    changeProfile();
    checkInputIndexPage();
    // logOut();
    //functie die mogelijk maakt om te zoeken via hoofdpagina op woorden
    //input doorgeven aan functie die gebruikt wordt om op naam te zoeken bij advanced
}

function checkInputIndexPage() {
    console.log("Work this out")
    //dit nog verder uitwerken zie hierboven
}


//starting the website
function initWebsite() {
    if (document.URL.includes("login")) {
        checkSwitchLogin();
        if (!sessionStorage.login && document.getElementById("loginButton")) {
            console.log("this is now working")
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
                console.log("signuppppp")
                //     let userDetails = await checkUserInput();
                //     if (userDetails) {
                //         login(userDetails[0], userDetails[1]);
                //     }
            });
        }
    }
    return;
}


function checkLoginState() {
    if (sessionStorage.id || sessionStorage.name || sessionStorage.login) {
        //hier all functies runnen wanneer user ingelogd is
        // functie hierin plaatsen die anders met if check session storage werken
        console.log("running userbased functions")
    }
}

//get the userdata
async function checkUserInput() {
    console.log(sessionStorage.login)
    let email = document.getElementById("emailUser").value;
    let pass = document.getElementById("passwordUser").value;
    return [email, pass];
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

//register fetch
function register(email, password, name) {
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
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

// function logOut(event) {
//     console.log("logout function is running")
//     if (sessionStorage.name) {
//         document.getElementById("inputNavigation").addEventListener('click', event => {
//             let logOutButton = event.target.className;
//             if (logOutButton) {
//                 sessionStorage.clear();
//                 // window.location.href = "../index.html";
//                 location.reload();
//             }
//         })
//     }
// }

function changeProfile() {
    if (sessionStorage.name && !document.URL.includes("index")) {
        let listItem = document.querySelector("a:last-child")
        let newItem = document.createElement('a');
        newItem.innerHTML = `
        <div class="dropdown">
        <a href="#" class="dropbtn">${sessionStorage.name}</a>
        <div class="dropdown-content">
            <button class="logOut">Log out</button>
        </div>
        </div>`;
        listItem.parentNode.replaceChild(newItem, listItem);
    } else if (document.URL.includes("index") && sessionStorage.name) {
        console.log("found the last a element on main page")
        let listItem = document.querySelector("a:last-child")
        let newItem = document.createElement('a');
        newItem.innerHTML = `
        <div class="dropdown">
        <a href="#" class="dropbtn">${sessionStorage.name}</a>
        <div class="dropdown-content">
            <button class="logOut">Log out</button>
        </div>
    </div>`;
        listItem.parentNode.replaceChild(newItem, listItem);
    }
}

async function getMovies() {
    let selection = document.getElementById('yearList');
    if (sessionStorage.login) {
        await fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                movies = data;
                console.log("fetched the data");
                renderWatchPage(movies);
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
    if (document.getElementById('searchButton') && !(document.querySelector('.genre:checked'))) {
        console.log('LOOK AT THIS!');
        console.log(document.querySelector('.genre:checked'));
        document.getElementById('searchButton').addEventListener('click', e => {
            console.log("search button clicked")
            let sortSetting = document.getElementById('searchButton').id;
            let input = document.getElementById('field').value;
            updateMovieList(movies, sortSetting, input);
        })
    }
    if (document.getElementById("yearList") && !(selection.options[selection.selectedIndex].value == "0")) {
        document.getElementById('searchButton').addEventListener('click', e => {
            console.log("searching by year")
            let selection = document.getElementById('yearList');
            let selectionResult = selection.options[selection.selectedIndex].value;
            console.log(selectionResult)
            let sortSetting = document.getElementById('yearList').id;
            let input = null;
            updateMovieList(movies, sortSetting, input);
        })
    }
    if (document.querySelector('.genre:checked') && !(selection.options[selection.selectedIndex].value == "0")) {
        console.log('LOOK AT THISSSSSSSSSSSSSSS!')
        // document.getElementById("searchButton").addEventListener('click', e => {
        //     let checkedBoxes = document.querySelector('.genre:checked').value;
        //     let input = null;
        //     console.log(checkedBoxes);
        //     updateMovieList(movies, sortSetting, input);
        // })
    }

    //klopt niet checkt onmiddelijk bij inladen en dan kan er nog geen genres aangeklikt zijn
    // is nu normaal gefixt
}



// document.getElementById('buttonSection').addEventListener('click', () => {

//     if (document.querySelector('.genre:checked')) {
//         let checkedBoxes = document.querySelector('.genre:checked').value;
//         let userInput = null;
//         this.advancedSearch(userInput, checkedBoxes)
//     } else if (document.getElementById("field").value) {
//         userInput = document.getElementById("field").value;
//         let checkedBoxes = null;
//         this.advancedSearch(userInput, checkedBoxes)
//     } else if (!selectionResult == "0") {
//         let userInput = null;
//         let checkedBoxes = null;
//         let selection = document.getElementById('yearList');
//         let selectionResult = selection.options[selection.selectedIndex].value;
//         this.advancedSearch(userInput, checkedBoxes, selectionResult);
//     } else {
//         let userInput = null;
//         let checkedBoxes = null;
//         let selectionResult = null;
//         this.advancedSearch(userInput, checkedBoxes, selectionResult);
//     }
// })
// }

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
        <button value="${m.movieid}" class="addFavourite">+</button>
    </div>
`
        document.getElementById('resultsContainer').innerHTML = movieHTML;
    });
}


function shuffleFunction(event) {
    // document.getElementById("shufflePage").addEventListener('click', event => {
    //     // event.preventDefault();
    //     const hyperlinks = document.querySelectorAll("img").value;
    //     console.log(hyperlinks);
    //     const favourite = event.target.className.indexOf("movieContainer");
    //     if (favourite) {
    //         console.log('step1')
    //         console.log(event.target)
    //         const item = event.target.value;
    //         console.log(item);
    //         sessionStorage.setItem("movieid", item);
    //         // if (event.target.className.indexOf('infoLink')) {
    //         //     console.log('step2')
    //         //     console.log(event.target)
    //         //     const item = event.target.value;
    //         //     console.log(item);
    //         //     sessionStorage.setItem("movieid", item);
    //         // }
    //     }
    // })


    document.getElementById('shuffleButton').addEventListener('click', () => {
        let newList = [];
        htmlString = "";
        movies.sort(() => Math.random() - 0.5);
        newList = movies.slice(0, 3);
        for (let m of newList) {
            htmlString += `
            <div class="movieContainer">
                <a href="">
                <figure>
                    <img src="${m.poster}" alt="${m.name}">
                </figure>
                </a>
                <div class="moviePosterContainer" value ="${m.movieid}">
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
    console.log(movies);
    let newList = [];
    if (sortSetting == "releaseDate" && orderKey == "0") {
        console.log("by ascending year")
        movies.sort((a, b) => {
            return a.year - b.year
        });
        newList = movies;
        orderKey = "1";

    } else if (sortSetting == "releaseDate" && orderKey == "1") {
        console.log("by descending year")
        movies.sort((a, b) => {
            return b.year - a.year
        });
        newList = movies;
        orderKey = "0";

    } else if (sortSetting == "rating" && orderKey == "0") {
        console.log("by ascending rating")
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
        console.log("by descending rating")
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
        console.log("by descending searches")
        movies.forEach(m => {
            if (m.searches) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return b.searches - a.searches
        });
        orderKey = "1";
    } else if ((sortSetting == "mostSearched" && orderKey == "1")) {
        console.log("by ascending searches")
        movies.forEach(m => {
            if (m.searches) {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return a.searches - b.searches
        });
        orderKey = "0";
    } else if (sortSetting == "trending" && orderKey == "0") {
        console.log("by descending trends")
        movies.forEach(m => {
            if (m.trending == "yes") {
                newList.push(m)
            }
        });
        orderKey = "1";
    } else if (sortSetting == "trending" && orderKey == "1") {
        console.log("by ascending trends")
        movies.forEach(m => {
            if (m.trending == "no") {
                newList.push(m)
            }
        });
        orderKey = "0";
    } else if (sortSetting == "mostViews" && orderKey == "0") {
        console.log("by descending views")
        movies.forEach(m => {
            if (m.views) {
                newList.push(m)
            }
        })
        newList.sort((a, b) => {
            return b.views - a.views
        });
        orderKey = "1";
    } else if (sortSetting == "mostViews" && orderKey == "1") {
        console.log("by ascending views")
        movies.forEach(m => {
            if (m.views) {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return a.views - b.views
        });
        orderKey = "0";
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
    } else if (sortSetting == "yearList") {
        console.log("by one exact year")
        movies.forEach(m => {
            if (m.year = "2017") {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return b.year - a.year
        });
        console.log("Here still working on")
        //verder uittypen
    }
    renderMovies(newList);
}

//change login form
async function checkSwitchLogin() {
    if (!sessionStorage.login) {
        document.getElementById("loginPage").addEventListener('click', event => {
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

//function that shows message (added movie) and function that adds movie to the userdata
function addFavourite() {
    if (document.URL.includes("shuffle")) {
        document.getElementById("shufflePage").addEventListener('click', event => {
            const favourite = event.target.className.indexOf("movieContainer");
            if (favourite) {
                if (event.target.className.indexOf('addFavourite') !== -1) {
                    const item = event.target.value;
                    console.log(item);
                    let fMovie = {
                        email: sessionStorage.name,
                        movieid: item,
                        favourite: true
                    }
                    console.log(fMovie);
                }
            }
        })
    } else if (document.URL.includes("advanced")) {
        document.getElementById("searchResults").addEventListener('click', event => {
            const favourite = event.target.className.indexOf("movieContainer");
            if (favourite) {
                if (event.target.className.indexOf('addFavourite') !== -1) {
                    const item = event.target.value;
                    console.log(item);
                    let fMovie = {
                        email: sessionStorage.name,
                        movieid: item,
                        favourite: true
                    }
                    sendFavourite()
                }
            }
        })
    }
}

function sendFavourite(event) {
    console.log("Sending favourite movies to database")
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: sessionStorage.name,
                movieid: event.target.value,
                favourite: true
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}

function loadProfileContent() {
    let favMovies = [];
    console.log("rendering profile content");
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourites`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.filter(data =>data.email == sessionStorage.name)
            console.log(data);
            movies.forEach(m => {
                if (m.movieid == data.movieid) {
                    favMovies.push(m)
                }
            })
            console.log(favMovies);

            // let movieHTML = "";
            // data.forEach(d => {
            //     movieHTML += `
            //     <div class="movieContainer">
            //     <div class="moviePosterContainer">
            //         <p>The Green Mile</p>
            //         <p>Frank Darabont</p>
            //         <p>1999</p>
            //     </div>
            //     <button class="addFavourite">-</button>
            // </div>`;
            //     document.getElementById('profileContent').innerHTML = movieHTML;
            // });
        })
}

function infoPage(event) {
    console.log("Running infopage function")
    let clicked = event.target.value;
    console.log(clicked);

    // if (document.URL.includes("shuffle")) {
    //     document.getElementById("shufflePage").addEventListener('click', event => {
    //         const favourite = event.target.className.indexOf("movieContainer");
    //         if (favourite) {
    //             if (event.target.className.indexOf('addFavourite') !== -1) {
    //                 const item = event.target.value;
    //                 console.log(item);
    //                 let fMovie = {
    //                     email: sessionStorage.name,
    //                     movieid: item,
    //                     favourite: true
    //                 }
    //                 console.log(fMovie);
    //             }
    //         }
    //     })
    // }
}

function renderWatchPage(movies, favourites) {
    console.log("showing watchlist page")
    console.log(movies);
    let htmlString = "";
    htmlString +=
        `<h3>Favourite movies of ${sessionStorage.name}  </h3>`;
    document.getElementById("favouritesTitle").innerHTML = htmlString;
}


function loadUserBasedContent(guide) {
    if (guide == "watch") {
        getMovies();
        renderWatchPage();
        loadProfileContent(movies);
    } else if (guide == "shuffle") {
        getMovies()
        shuffleFunction(movies, null, null);
        addFavourite();
        // infoPage();
    } else if (guide == "advanced") {
        getMovies();
        updateMovieList(movies, null, null);
        addFavourite();
        // checkSortings(movies);
    } else if (guide == "info") {
        infoPage();
    } else if (guide == "login") {
        console.log("Let's show the login page")
    } else if (guide == "index") {
        console.log("Let's show the homepage")
    }
}