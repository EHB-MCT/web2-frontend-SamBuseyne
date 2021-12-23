"Use strict";

let orderKey = "0"
let sleutel = "";
let htmlString = "";
let movies = [];

setup()

function setup() {
    checkLoginState();
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
            document.getElementById("loginButton").addEventListener('click', async event => {
                event.preventDefault();
                let userDetails = await checkUserInput();
                if (userDetails) {
                    login(userDetails[0], userDetails[1]);
                }
            });
        } else if (!sessionStorage.login && document.getElementById("signUpButton")) {
            document.getElementById("signUpButton").addEventListener('click', async event => {
                event.preventDefault();
                console.log("signuppppp")
                register();
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
        getMovies();
        updateMovieList(movies, null, null);
        addFavourite();
        // checkSortings(movies);
    } else if (document.URL.includes("index")) {
        runIndexPage();
    } else if (document.URL.includes("watchlist")) {
        getMovies();
        renderWatchPage();
        // loadProfileContent(movies);
    } else if (document.URL.includes("profile")) {
        loadUserBasedContent("profile");
    } else if (document.URL.includes("login")) {
        // infoPage();
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

function logOut() {
    if (sessionStorage.name) {
        let checkLogOutButton = document.querySelector("ul")
        if (checkLogOutButton) {
            document.querySelectorAll(".logOut").forEach(item => {
                item.addEventListener('click', event => {
                    let logOutButton = event.target.className;
                    if (logOutButton) {
                        sessionStorage.clear();
                        if(document.URL.includes("index")){
                        location.reload();
                        }else{
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
                if (document.URL.includes("watch")) {
                    renderWatchPage(movies);
                }
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
            if (m.movieid == "yes") {
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

function infoPage(event) {
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





function runIndexPage() {
    console.log("running info link function")
    document.getElementById("infoButton").addEventListener('click', event => {
        event.preventDefault();
        console.log("clicked info button")
        sessionStorage.setItem("movieTitle", "Space Jam");
        window.location.href = "./html/info.html";
    })
}





//TO WORK ON!!//////////////////////////////////////////////////////////



function shuffleFunction(e) {

    document.getElementById("shuffle").addEventListener('click', event => {
        event.preventDefault();
        let click = e.target.closest('.movieContainer').className
        if (click) {
            console.log(click, e.target)
        }
    })

    // document.getElementById("shufflePage").addEventListener('click', e => {
    //     e.preventDefault();
    //     console.log(e.path[2].className);
    //     const favourite = e.target.className.indexOf("movieContainer");
    //     if (favourite) {
    //         console.log("running")
    //         if (e.target.className.indexOf('posterName')) {
    //             console.log("running to")
    //             const item = e.target.className;
    //             console.log(item);
    //             let fMovie = {
    //                 email: sessionStorage.name,
    //                 movieid: item,
    //                 favourite: true
    //             }
    //             console.log(fMovie);
    //         }
    //     }


    //     if (target = "posterName") {
    //         console.log("here comes the info link function")

    //     } else if (target = "addFavourite") {
    //         console.log("here comes the add favourite function")
    //     }


    // })

    // document.getElementById("shufflePage").addEventListener('click', event => {
    //     // event.preventDefault();
    //     console.log(event.target.value);
    //     const favourite = event.target.className.indexOf("movieContainer");
    //     if (favourite) {
    //         let movieid = document.getElementsByClassName("moviePosterContainer").value;


    //         sessionStorage.setItem("movieid", item);
    //         if (event.target.className.indexOf('infoLink')) {
    //             console.log('step2')
    //             console.log(event.target)
    //             const item = event.target.value;
    //             console.log(item);
    //             sessionStorage.setItem("movieid", item);
    //         }
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
                <a class="posterLink" href="">
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


async function loadProfileContent() {
    let favMovies;
    console.log("rendering profile content");
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
            data.forEach(d => {
                if (data.email == sessionStorage.name) {
                    favMovies.push(m)
                }
            })
            console.log(favMovies);

            console.log(favMovies);

            let movieHTML = "";
            data.forEach(d => {
                movieHTML += `
                <div class="movieContainer">
                <div class="moviePosterContainer">
                    <p>The Green Mile</p>
                    <p>Frank Darabont</p>
                    <p>1999</p>
                </div>
                <button class="addFavourite">-</button>
            </div>`;
                document.getElementById('profileContent').innerHTML = movieHTML;
            });
        })
}


async function renderWatchPage() {
    console.log(movies);
    let favMovies = [];
    let favContent = [];
    let favID = [];
    // await fetch(`https://web2-backend-sambuseyne.herokuapp.com/favourites`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data);
    //         data.forEach(data => {
    //             if (data.email == sessionStorage.name) {
    //                 favMovies.push(data)
    //             }
    //         })
    //     })

    //     favMovies.forEach(favMovies => {
    //         if(favMovies.movieid){
    //             favID.push(favMovies.movieid);
    //         }  
    //     });
    //     console.log(favID);

    for (let f of favMovies) {
        let htmlString = "";
        htmlString += `
        <div class="movieContainer">
            <a href="">
            <figure>
                <img src="${f.poster}" alt="${f.name}">
            </figure>
            </a>
            <div class="moviePosterContainer" value ="${f.movieid}">
                <p>${f.name}</p>
                <p>${f.director}</p>
                <p>${f.year}</p>
                <div class="infoS">
                    <div class="infoS1">
                        <p>Views: ${f.views}</p>
                        <p>Searches: ${f.searches}</p>
                    </div>
                    <div class="infoS2">
                        <p>Rating: ${f.rating}/100</p>
                        <p>Trending: ${f.trending}</p>
                    </div>
                </div>
            </div>
            <button class="addFavourite">-</button>
        </div>`;
        document.getElementById('favSection').innerHTML = htmlString;
    }

    let htmlString = "";
    htmlString +=
        `<h3>Favourite movies of ${sessionStorage.name}  </h3>`;
    document.getElementById("favouritesTitle").innerHTML = htmlString;

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