"Use strict";

let htmlString = "";


window.onload = async function () {
    console.log("Script loaded!")
    //look what pages is active by what the user clicks
    checkPages()
}

function checkPages() {
    let shuffle = document.getElementById('shuffleButton')
    let advanced = document.getElementById('searchButton')
    if (shuffle) {
        console.log("shuffle actived!")
        shuffleFunction()
    } else if (advanced) {
        console.log("advanced actived!")
        advancedSearch()
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
                data.sort(()=> Math.random()- 0.5);
                data = data.slice(0,3);
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
                    </div>`
                    ;
                }
                document.getElementById('shuffle').innerHTML = htmlString;
            })
    });
}


function advancedSearch() {
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
                    <img src="${m.poster}" alt="Tenet">
                    </figure>
                    <p>Title: ${m.name}</p>
                    <p>Director: ${m.director}</p>
                    <p>Release: ${m.year}</p>
                    </div>`;
                }
                document.getElementById('resultsContainer').innerHTML = htmlString;
            })
    });
}