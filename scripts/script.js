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

















}