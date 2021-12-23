"Use strict";

let orderKey = "0"
let sleutel = "";
let movies = [];
let counter = "0";
let favMovies = [];
let htmlString = "";
let switchMessage = "0";
setup()

function setup() {
    checkLoginState();
    addYears()
}

function addYears() {
    if (document.URL.includes("advanced")) {
        if (counter == "0") {
            let year = 1970;
            let till = 2014;
            let options = "";
            for (var y = year; y <= till; y++) {
                options += "<option>" + y + "</option>";
            }
            document.getElementById("yearStart").insertAdjacentHTML('afterend', options);
        }
        counter += 1;
    }
}

//check if an user is logged in
function checkLoginState() {
    checkPages();
    if (sessionStorage.id || sessionStorage.name || sessionStorage.login) {
        // functie hierin plaatsen die anders met if check session storage werken
        console.log("logged in")
        changeProfile();
        checkSwitchLogin();

    } else {
        console.log("not logged in");
        initWebsite();
        checkSwitchLogin();
    }
}




//starting the website
function initWebsite() {
    if (document.URL.includes("login")) {
        if (!sessionStorage.login && document.getElementById("loginButton")) {
            console.log("running log in button")
            document.getElementById("loginButton").addEventListener('click', async event => {
                event.preventDefault();
                let userDetails = await checkUserInput();
                if (userDetails) {
                    login(userDetails[0], userDetails[1]);
                }
            });
        } else if (!sessionStorage.login && document.getElementById("signUpButton")) {
            console.log("running sign in button")
            document.getElementById("signUpButton").addEventListener('click', async event => {
                event.preventDefault();
                let userDetails = await checkUserInput();
                if (userDetails) {
                    register(userDetails[0], userDetails[1], userDetails[2], userDetails[3]);
                }
            });
        }
    }
}

//check on which pages the user => load code according to the page
function checkPages() {

    if (document.URL.includes("shuffle")) {
        getMovies()
        shuffleFunction(movies, null, null);
        addFavourite();
        // infoPage();
    } else if (document.URL.includes("advanced")) {
        // searchButtons();
        getMovies();
        updateMovieList(movies, null, null);
        addFavourite();
        // checkSortings(movies);
    } else if (document.URL.includes("index")) {

    } else if (document.URL.includes("watchlist")) {
        getMovies();
        deleteFavourite();
        showUserSettings();
        adjustSettings();
    } else if (document.URL.includes("profile")) {
        loadUserBasedContent("profile");

    } else if (document.URL.includes("login")) {
        initWebsite();
    }
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
                            <input type="text" id="name" placeholder="Name">
                            <input type="password" id="passwordUser" placeholder="Password">
                            <input type="text" id="fMovie" placeholder="Favourite Movie">
                        </form>
                        <button id="signUpButton">Sign</button>
                    </div>
                    `;
                document.getElementById('loginContainer').innerHTML = htmlString;
                sleutel = 1;
                initWebsite();
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
            initWebsite();
        })
    }
}

//get the userdata
async function checkUserInput() {
    // console.log(sessionStorage.login)
    let email = document.getElementById("emailUser").value;
    let pass = document.getElementById("passwordUser").value;
    // let name = document.getElementById("name").value;
    // let fMovie = document.getElementById("fMovie").value;
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
                console.log(data);
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("login", data.login);
                sessionStorage.setItem("name", data.name);
                sessionStorage.setItem("email", data.email);
                sessionStorage.setItem("favouriteMovie", data.fMovie);
                window.location.href = "../index.html";
            } else {
                console.log('Wrong password or email!');
            }
        })
}

//register fetch
function register(email, password, name, fMovie) {
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                fMovie: fMovie

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
                sessionStorage.setItem("email", data.email);
                sessionStorage.setItem("name", data.name);
                sessionStorage.setItem("favouriteMovie", data.fMovie);
                window.location.href = "../index.html";
            } else {
                console.log('Welcome to the movie guide!');
            }
        })
}

function logOut() {
    if (sessionStorage.name) {
        let checkLogOutButton = document.querySelector("ul")
        if (checkLogOutButton) {
            document.querySelectorAll(".logOut").forEach(item => {
                item.addEventListener('click', event => {
                    let logOutButton = event.target.className;
                    if (logOutButton) {
                        sessionStorage.clear();
                        if (document.URL.includes("index")) {
                            location.reload();
                        } else {
                            window.location.href = "../index.html";
                        }
                    }
                })
            })
        }
    }
}

function changeProfile() {
    if (sessionStorage.name && !(document.URL.includes("index"))) {
        console.log("changing profile figure")
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
    logOut();
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

            })
    }
    if (document.URL.includes("watch")) {
        renderWatchPage(movies);
    } else if (document.URL.includes("advanced")) {
        document.getElementById("searchContainer").addEventListener('click', e => {
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
            if (document.getElementById('searchButton') && !(document.querySelector('.genre:checked')) && (selection.options[selection.selectedIndex].value == "0")) {
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
            if (document.querySelector('.genre:checked') && (selection.options[selection.selectedIndex].value == "0")) {
                console.log('LOOK AT THISSSSSSSSSSSSSSS!')
                document.getElementById("searchButton").addEventListener('click', e => {
                    let checkedBoxes = document.querySelector('.genre:checked').value;
                    let sortSetting = document.getElementById('searchGenres').id;
                    let input = null;
                    console.log(checkedBoxes);
                    updateMovieList(movies, sortSetting, input, checkedBoxes);
                })
            }
        })
    }
}

//render the movies on the pages
function renderMovies(movies) {
    if (movies.length === 0 && !(switchMessage == "0")) {
        renderMessage();
    } else {
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
            document.getElementById('results').innerHTML = movieHTML;
        });
    }
    switchMessage += 1;
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
function updateMovieList(movies, sortSetting, input, checked) {
    let resultsContainer = document.getElementById("results");
    let selection = document.getElementById('yearList');
    let selectionResult = selection.options[selection.selectedIndex].value;
    let newList = [];
    if (sortSetting == "releaseDate" && orderKey == "0") {
        resultsContainer.style.margin = "4em";
        movies.sort((a, b) => {
            return a.year - b.year
        });
        newList = movies;
        orderKey = "1";

    } else if (sortSetting == "releaseDate" && orderKey == "1") {
        resultsContainer.style.margin = "4em";
        movies.sort((a, b) => {
            return b.year - a.year
        });
        newList = movies;
        orderKey = "0";

    } else if (sortSetting == "rating" && orderKey == "0") {
        resultsContainer.style.margin = "4em";
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
        resultsContainer.style.margin = "4em";
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
        resultsContainer.style.margin = "4em";
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
        resultsContainer.style.margin = "4em";
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
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            if (m.movieid == "yes") {
                newList.push(m)
            }
        });
        orderKey = "1";
    } else if (sortSetting == "trending" && orderKey == "1") {
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            if (m.trending == "no") {
                newList.push(m)
            }
        });
        orderKey = "0";
    } else if (sortSetting == "mostViews" && orderKey == "0") {
        resultsContainer.style.margin = "4em";
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
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            if (m.views) {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return a.views - b.views
        });
        orderKey = "0";
    } else if (sortSetting == "searchButton" && selectionResult == "0") {
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            let movieTitle = m.name
            let title = movieTitle.toLowerCase()
            if (title.includes(input.toLowerCase())) {
                newList.push(m)
            } else {}
        })
    } else if (sortSetting == "yearList" && selectionResult) {
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            if (m.year == selectionResult) {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return b.year - a.year
        });
    } else if (sortSetting == "searchGenres") {
        resultsContainer.style.margin = "4em";
        movies.forEach(m => {
            if (m.genres == checked) {
                newList.push(m)
            }
        });
        newList.sort((a, b) => {
            return b.year - a.year
        });
    }
    renderMovies(newList);
}



//function that shows message (added movie) and function that adds movie to the userdata
function addFavourite() {
    if (document.URL.includes("shuffle")) {
        document.getElementById("shufflePage").addEventListener('click', event => {
            const favourite = event.target.className.indexOf("movieContainer");
            if (favourite) {
                if (event.target.className.indexOf('addFavourite') !== -1) {
                    const item = event.target.value;
                    sessionStorage.setItem("movieid", item);
                    sessionStorage.setItem("favourite", true);
                    sessionStorage.setItem("email", sessionStorage.email);
                    sendFavourite();
                }
            }
        })
    } else if (document.URL.includes("advanced")) {
        document.getElementById("searchResults").addEventListener('click', event => {
            const favourite = event.target.className.indexOf("movieContainer");
            if (favourite) {
                if (event.target.className.indexOf('addFavourite') !== -1) {
                    const item = event.target.value;
                    sessionStorage.setItem("movieid", item);
                    sessionStorage.setItem("favourite", true);
                    sessionStorage.setItem("email", sessionStorage.email);
                    sendFavourite();
                }
            }
        })
    }
}

function sendFavourite() {
    console.log("Sending favourite movies to database")
    fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: sessionStorage.email,
                movieid: sessionStorage.movieid,
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


function renderMessage() {
    console.log("function is running")
    let movieHTML = "";
    movieHTML += `
        <p>No movies where found!</p>
`
    document.getElementById('results').innerHTML = movieHTML;
}



function deleteFavourite() {
    let deleteData = document.getElementsByClassName("deleteFavourite");
    for (let i = 0; i < deleteData.length; i++) {
        console.log("deleting");
        deleteData[i].addEventListener("click", e => {
            e.preventDefault();
            const item = e.target.value
            fetch(`https://web2-fullstack-teamwork.herokuapp.com/favourite`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        email: sessionStorage.email,
                        movieid: item
                    }
                })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log('Favourite succesfully removed:', data);
                    if (data) {
                        location.reload();
                    }
                })
        })
    }

}


function shuffleFunction(e) {
    document.getElementById("shufflePage").addEventListener('click', e => {
        // e.preventDefault();
        let target = e.path[2].className;
        const favourite = e.target.className.indexOf("movieContainer");
        if (favourite) {
            if (e.target.className.indexOf('posterName')) {
                const item = e.target.className;
                if (target == "posterName") {
                    console.log("here comes the info link function")

                } else if (target == "shuffle") {
                    sessionStorage.setItem("movieid", item);
                    sessionStorage.setItem("favourite", true);
                    sessionStorage.setItem("email", sessionStorage.name);
                    sendFavourite();
                }
            }
        }
    })

    document.getElementById('shuffleButton').addEventListener('click', () => {
        let newList = [];
        movies.sort(() => Math.random() - 0.5);
        newList = movies.slice(0, 3);
        let movieHTML = "";
        newList.forEach(m => {
            movieHTML += `
    
            <div class="movieContainer">
            <button value="${m.movieid}">
            <figure>
                <img src="${m.poster}" alt="${m.name}">
            </figure>
            </button>
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
            document.getElementById('shuffle').innerHTML = movieHTML;
        });
    });
}



async function renderWatchPage() {
    console.log(movies);
    let favMovies = [];
    let favID = [];
    await fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourites`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(data => {
                if (data.email == sessionStorage.name) {
                    favMovies.push(data)
                }
            })
        })
    for (let i = 0; i < favMovies.length; i++) {
        sessionStorage.setItem(`"favouriteID${i}"`, `${favMovies[i]._id}`)
    }

    favMovies.forEach(favMovies => {
        if (favMovies.movieid) {
            favID.push(favMovies.movieid);
        }
    });
    getSingleMovie(favID)
}


function getSingleMovie(id) {
    console.log("getting single movies")
    let favMoviesList = [];
    id.forEach(id => {
        fetch(`https://web2-backend-sambuseyne.herokuapp.com/movie/?movieid=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                favMoviesList.push(data)
            })
        console.log(favMoviesList);
    })
    renderFavMovies(favMoviesList)
}

function renderFavMovies(favMoviesList) {
    console.log("rendering favourites")
    let htmlString = "";
    htmlString +=
        `<h3>Favourite movies of ${sessionStorage.name}  </h3>`;
    document.getElementById("favouritesTitle").innerHTML = htmlString;

    let movieHTML = "";
    for (let i = 0; i < movies.length; i++) {
        movieHTML += `
        <div class="movieContainer">
            <button>
            <figure>
                <img src="${movies[i].poster}" alt="${movies[i].name}">
            </figure>
            </button>
            <div class="moviePosterContainer" value ="${movies[i].movieid}">
                <p>${movies[i].name}</p>
                <p>${movies[i].director}</p>
                <p>${movies[i].year}</p>
                <div class="infoS">
                    <div class="infoS1">
                        <p>Views: ${movies[i].views}</p>
                        <p>Searches: ${movies[i].searches}</p>
                    </div>
                    <div class="infoS2">
                        <p>Rating: ${movies[i].rating}/100</p>
                        <p>Trending: ${movies[i].trending}</p>
                    </div>
                </div>
            </div>
            <button class="deleteFavourite">-</button>
        </div>`;
        document.getElementById("favSection").innerHTML = movieHTML;
    }
}


function showUserSettings() {
    let settingsHTLM = "";
    settingsHTLM += `
    <p id="settingsName">Your name: ${sessionStorage.name}</p>
    <p id="settingsName">Your email: ${sessionStorage.email}</p>
    <p id="settingsName">Your favourite movie: ${sessionStorage.favouriteMovie}</p>
    `
    document.getElementById("settings").innerHTML = settingsHTLM;
}



function adjustSettings() {
    document.getElementById('editPreference').addEventListener('submit', e => {
        e.preventDefault('submit');
        let userName = document.getElementById("name").value;
        let userEmail = document.getElementById('email').value;
        let userfMovie = document.getElementById('fMovie').value;
        let userID = sessionStorage.id;

        const update = {
            "_id": userID,
            "name": userName,
            "email": userEmail,
            "fMovie": userfMovie
        }
        fetch(`https://web2-backend-sambuseyne.herokuapp.com/users/${userID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update)
            }).then(res => {
                res.json()
            })
            .then(data => {
                console.log(data);
                if (data == undefined) {
                    location.reload();
                    login();
                }
            });
    })
}