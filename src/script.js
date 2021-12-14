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
        console.log("let'shuffle!")

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                let movieData = data.Search;
                let poster = document.getElementById('moviePoster1');
                let htmlString = "";
                htmlString += `
            <div id="moviePoster1">
            <figure>
                <img src="${movieData[1].Poster}">
            </figure>
        </div>
            `
            poster.innerHTML = htmlString;
            })
    })


    document.getElementById('signUpButton').addEventListener('click', () => {
        console.log('logging in')
    })


}