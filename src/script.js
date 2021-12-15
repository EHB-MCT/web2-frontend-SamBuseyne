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
    console.log("Script loaded!")

    let url = `https://web2-backend-sambuseyne.herokuapp.com/movie?id=1234`;

    document.getElementById('shuffleButton').addEventListener('click', () => {

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                // let movieData = data.Search;
                let poster = document.getElementById("moviePoster")
                let htmlString = "";
                htmlString += `
                <figure id="${data.name}">
                    <img src="${data.name}" alt="${data.name}">
                </figure>
                <div class="movieInfoSection">
                    <p>${data.name}</p>
                    <p>${data.year}</p>
                    <button class="addButton">+</button>
                </div> `;
                poster.innerHTML = htmlString;
            })
    });

    document.getElementById('searchButton').addEventListener('click', () =>{
        fetch(`https://web2-backend-sambuseyne.herokuapp.com/movie?id=1234`)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data)
            let results = document.getElementById('resultsContainer')
            let htmlString = "";
            htmlString +=`
            <p>${data.name}</p>
            <p>${data.director}</p>
            <p>${data.year}</p>`;
            results.innerHTML = htmlString;
        })

    });
}