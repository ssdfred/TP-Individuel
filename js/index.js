import { frenchDate } from "./fonctionUtils.js";

/**
 * Fonction pour récuperer les données des films récents sur the movie db
 * @returns promise
 */
function getDataFromTMDB() {
  const apiKey = "8f7d1ef21a53b9e37b8e5be7534bb37c";
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
function getDataFromBetaseries() {
  const apiKey = "2aa9940755f7";
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dateForFetch = `${year}-01-${month}`;
  return fetch(
    `https://api.betaseries.com/shows/list?key=${apiKey}&limit=20&since=${dateForFetch}&order=popularity`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
/**
 * fonction qui ajoute les éléments recupéres depuis la fonction précédente au HTML
 * @param {*promise} listLastMovies
 * @param {*elementHTML section} listOfResults
 */
function createHtmlElement(array, parent) {
  console.log("Liste des films : ", array);
  array.forEach((element) => {
    let htmlElement = document.createElement("article");
    htmlElement.classList.add("articles");
    htmlElement.innerHTML = `
    <h4>${element.title}</h4>
    <p><span class="fw-bold">Date de sortie : </span>${element.dateSortie}</p>    
    <img src="${element.image}" alt="Poster de ${element.title}" width=200px height=300px >
    <p><span class="fw-bold">Note : </span>${element.note}/10</p>
    <p class="visually-hidden" id="description${element.id}"><span class="fw-bold">Description : </span>${element.description}</p>
    <button class="btn" id="button${element.id}">Voir la description</button>  
  `;
    parent.appendChild(htmlElement);
    const button = document.getElementById("button" + element.id);
    const description = document.getElementById("description" + element.id);
    button.onclick = (e) => {
      description.classList.toggle("visually-hidden");
      if (button.innerText === "Voir la description") {
        button.innerText = "Cacher la description";
      } else {
        button.innerText = "Voir la description";
      }
    };
  });
}
// Pour la taille de l'image , mettre une max-width a 57% = 114px
const listLastFilms = document.getElementById("filmsLastRelease");
const listLastSeries = document.getElementById("seriesLastRelease");
document.body.onload = async (e) => {
  let listLastMovies = await getDataFromTMDB();
  let movieArray = [];
  listLastMovies.results.forEach((element) => {
    let media = {
      id: element.id,
      title: element.title,
      dateSortie: frenchDate(element.release_date),
      image: `https://image.tmdb.org/t/p/w200${element.poster_path}`,
      description: element.overview,
      note: element.vote_average,
    };
    movieArray.push(media);
  });

  let listLastShow = await getDataFromBetaseries();
  let seriesArray = [];
  listLastShow.shows.forEach((element) => {
    let media = {
      id: element.id,
      title: element.title,
      dateSortie: element.creation,
      image: element.images.poster,
      description: element.description,
      note: element.notes.mean.toFixed(1),
    };
    seriesArray.push(media);
  });

  if (movieArray.length !== 0) {
    createHtmlElement(movieArray, listLastFilms);
  } else {
    console.log("pas de données");
  }
  if (seriesArray.length !== 0) {
    createHtmlElement(seriesArray, listLastSeries);
  } else {
    console.log("pas de données");
  }
};
