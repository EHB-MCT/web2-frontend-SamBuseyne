"Use strict";

let htmlString = "";


window.onload = async function () {
    console.log("Script loaded!")
    //look what pages is active by what the user clicks


    document.getElementById("signUpButton").addEventListener('click', () => {
        let email = document.getElementById("emailUser").value;
        let pass = document.getElementById("passwordUser").value;

        const userCred = {
            email: email,
            password: pass
        }


        fetch(`https://web2-backend-sambuseyne.herokuapp.com/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCred)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    sessionStorage.setItem("id", data.id);
                    sessionStorage.setItem("login", data.login);
                    window.location.assign(`${window.location.origin}../index.html`);
                } else {
                    console.log('Wrong password or email!');
                }
            })

    })


}





function checkPages() {
    let shuffle = document.getElementById('shuffleButton')
    let advanced = document.getElementById('searchButton')
    if (shuffle) {
        console.log("shuffle actived!")
        shuffleFunction()
    } else if (advanced) {
        console.log("advanced actived!")
        // checkInputUser()
        // // advancedSearch()
    }
}

function shuffleFunction() {
    let url = `https://web2-backend-sambuseyne.herokuapp.com/movies`;

    document.getElementById('shuffleButton').addEventListener('click', () => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                htmlString = "";
                console.log(data);
                data.sort(() => Math.random() - 0.5);
                data = data.slice(0, 3);
                console.log(data);
                for (let m of data) {
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
                }
                document.getElementById('shuffle').innerHTML = htmlString;
            })
    });
}


function advancedSearch(input) {
    if (input) {
        document.getElementById('searchButton').addEventListener('click', () => {
            fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    data.find(data.name == input);
                    console.log(data)

                    for (let m of data) {
                        htmlString +=
                            `
                        <div class="movieContainer">
                        <figure>
                        <img src="${m.poster}" alt="${m.name}">
                        </figure>
                        <p>${m.name}</p>
                        <p>${m.director}</p>
                        <p>${m.year}</p>
                        </div>`;
                    }
                    document.getElementById('resultsContainer').innerHTML = htmlString;
                })
        });

        return;

    } else {
        document.getElementById('searchButton').addEventListener('click', () => {
            fetch(`https://web2-backend-sambuseyne.herokuapp.com/movies`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)

                    for (let m of data) {
                        htmlString +=
                            `
                        <div class="movieContainer">
                        <figure>
                        <img src="${m.poster}" alt="${m.name}">
                        </figure>
                        <p>${m.name}</p>
                        <p>${m.director}</p>
                        <p>${m.year}</p>
                        </div>`;
                    }
                    document.getElementById('resultsContainer').innerHTML = htmlString;
                })
        });
    }
}


function checkInputUser() {
    console.log("Checking input")
    document.getElementById("buttonSection").addEventListener('click', () => {
        let inputUser = document.getElementById("field").value
        console.log(inputUser)
        advancedSearch(inputUser)
    })
}