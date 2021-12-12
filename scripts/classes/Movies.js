"use strict";

class Movies{
    constructor(){

    }

    fetchMovies(searchItem){
        fetch(`http://www.omdbapi.com/?s=${searchItem}&apikey=3d9f5461&`)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let Search =  data.Search;


            })
            .catch(error=>{
                console.log(error.reason);
            });
    }
}




export default Movies;
