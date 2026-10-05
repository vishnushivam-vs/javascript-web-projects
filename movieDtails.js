//import { displayContent } from "./script.js";

let movieName = document.querySelector(".movieName");
let backgroundImg = document.querySelector(".movieposterBox");
let ReleaseDate = document.querySelector(".ReleaseDate");
let language =  document.querySelector(".language");
let movieRating=  document.querySelector(".movieRating");
let overview =  document.querySelector(".overview");
let backdropPoster =  document.querySelector(".backdropPoster");

let selectedMovie = localStorage.getItem("selectedMovie");

const languageMap = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  kn: "Kannada",
  fr: "French",
  ja: "Japanese",
  ko: "Korean",
  es: "Spanish"
  // Add more as needed
}

function movieDetailsDisplay(){
    if(selectedMovie){
        let movieData = JSON.parse(selectedMovie);
        console.log(movieData);
        movieName.textContent = movieData.title;
        ReleaseDate.textContent = "Release Date: " + movieData.release_date
        movieRating.textContent = "⭐ " + movieData.vote_average.toFixed(1) + " " + `(from ${movieData.vote_count} votes)`;
        overview.textContent = movieData.overview
        let fullImageURL = "https://image.tmdb.org/t/p/original" + movieData.backdrop_path;
        backgroundImg.style.backgroundImage = `url(${fullImageURL})`;
        backdropPoster.src = fullImageURL;
        let langCode = movieData.original_language; 
        let languageName = languageMap[langCode] || langCode;
        language.textContent = "Language: " + languageName;
       
    }


}
movieDetailsDisplay();

let apikey = "3a5f946c165910d0b245ea4c6340d304" ;