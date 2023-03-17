import { frenchDate } from "./fonctionUtils.js";

/**
 * Fonction pour récuperer les données des films récents sur the movie db
 * @returns promise
 */
async function getDataFromTMDB() {
  const apiKey = "8f7d1ef21a53b9e37b8e5be7534bb37c";
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
async function getDataFromBetaseries() {
  const apiKey = "2aa9940755f7";
  return fetch(`https://api.betaseries.com/shows/list?key=${apiKey}&limit=1000`)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
/**
 * fonction qui ajoute les éléments recupéres depuis la fonction précédente au HTML
 * @param {*promise} listLastMovies
 * @param {*elementHTML section} listOfResults
 */
function createHtmlElement(listLastMovies, listOfResults) {
  console.log("Liste des films : ", listLastMovies);
  listLastMovies.results.forEach((element) => {
    let htmlElement = document.createElement("article");
    htmlElement.classList.add("articles");
    htmlElement.innerHTML = `
    <h4> Titre : ${element.title}</h4>
    <p>Date de sortie : ${frenchDate(element.release_date)}</p>
    <p class="visually-hidden">Description : ${element.overview}</p>
    <img src="https://image.tmdb.org/t/p/w200${
      element.poster_path
    }" alt="Poster de ${element.title}" >
    <p>Note : ${element.vote_average}/10</p>
    <button class="btn btn-primary">Lire la critique</button>  
  `;
    listOfResults.appendChild(htmlElement);
  });
}
// Pour la taille de l'image , mettre une max-width a 57% = 114px
const listOfResults = document.getElementById("listLastRelease");
document.body.onload = async (e) => {
  let listLastMovies = await getDataFromTMDB();
  if (listLastMovies) {
    createHtmlElement(listLastMovies, listOfResults);
  } else {
    console.log("pas de données");
  }
};
/* document.body.onload = async (e) => {
  let listLastSeries = await getDataFromBetaseries();
  /* if (listLastMovies) {
    createHtmlElement(listLastMovies, listOfResults);
  } else {
    console.log("pas de données");
  }
 
}; */
