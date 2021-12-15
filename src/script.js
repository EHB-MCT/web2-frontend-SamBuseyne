"Use strict";

import User from "./classes/User.js";



// const server = {
//     userID: null,
//     searchItem: "",
//     user: new User(),
//     codestage: null, //variable to run different parts of the code without having issues of unfinished code


//     init() {
//         this.codestage = 0; //testing searchbar without having to login
//         if (this.codestage = "0") {
//             this.searchEngine()

//         } else if (this.codestage = "1") {
//             this.initFields();
//             this.render();

//             if (this.user.token != null) {
//                 this.checkInput();
//             }
//         }
//     },

//     initFields() {
//         document.getElementById('loginSection').addEventListener("click", (e) => {
//             e.preventDefault();
//             console.log("logging in")
//             const email = document.getElementById('emailUser').value;
//             const password = document.getElementById('passwordUser').value;
//             console.log("credentials are:", email, password)
//         })
//     },

//     searchEngine() {
//         document.querySelector('#inputNavigation').addEventListener('keypress', function (e) {
//             if (e.key === 'Enter') {
//                 const userInput = document.getElementById('searchItem').value;
//                 console.log(userInput)
//             }
//         });
//         const content = document.getElementById("searchItem");

//     }
// }

// server.init();



window.onload = function () {
    console.log("script loaded!")

    let url = `http://www.omdbapi.com/?s=tenet&apikey=3d9f5461&`;


    document.getElementById('shuffleButton').addEventListener('click', () => {

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let movieData = data.Search;
                // console.log(movieData);
                let poster = document.getElementById("moviePoster1")
                let htmlString = "";
                htmlString += `
                <div class="moviePoster">
                <figure id="${movieData.Title}">
                    <img src="${movieData.Poster}" alt="${movieData.Title}">
                </figure>
                <div class="movieInfoSection">
                    <p>${movieData.Title}</p>
                    <p>${movieData.Year}</p>
                    <button class="addButton">+</button>
                </div>
                </div> `;
                poster.innerHTML = htmlString;
            })
    });
}