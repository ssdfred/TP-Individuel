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
/**
 * Fonction pour récuperer les données de series recentes sur betaseries
 * @returns promise
 */
function getDataFromBetaseries() {
  const apiKey = "2aa9940755f7";
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  let dateForFetch = `${year}-01-${month}`;
  Date.parse(dateForFetch);

  return fetch(
    `https://api.betaseries.com/shows/list?key=${apiKey}&limit=20&since=${dateForFetch}&order=popularity`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

/**
 * Fonction qui recupere les derniers articles de nexs concernant les series
 * @returns promise
 */
function getDataForNews() {
  const apiKey = "2aa9940755f7";
  return fetch(`https://api.betaseries.com/news/last?key=${apiKey}&number=20`)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
/**
 * fonction qui ajoute les éléments recupéres depuis la fonction précédente au HTML
 * @param {*Array} array
 * @param {*elementHTML section} parent
 */
function createHtmlElement(array, parent) {
  if (array[0].hasOwnProperty("note")) {
    array.forEach((element) => {
      let htmlElement = document.createElement("article");
      htmlElement.classList.add("articles");
      htmlElement.innerHTML = `
    <h4 style="height : 75px">${element.title}</h4>
    <p><span class="fw-bold">Date de sortie : </span>${element.dateSortie}</p>    
    <img src="${element.image}" alt="Poster de ${element.title}" width=200px height=300px >
    <p><span class="fw-bold">Note : </span>${element.note}/10</p>
    <p class="visually-hidden" id="description${element.id}"><span class="fw-bold">Description : </span>${element.description}</p>
    <button class="btn" id="button${element.id}">Voir la description</button>  
  `;
      parent.appendChild(htmlElement);
      const buttonDescription = document.getElementById("button" + element.id);
      const description = document.getElementById("description" + element.id);
      buttonDescription.onclick = (e) => {
        description.classList.toggle("visually-hidden");
        if (buttonDescription.innerText === "Voir la description") {
          buttonDescription.innerText = "Cacher la description";
        } else {
          buttonDescription.innerText = "Voir la description";
        }
      };
    });
  } else {
    array.forEach((element) => {
      let htmlElement = document.createElement("article");
      htmlElement.classList.add("articles");
      htmlElement.innerHTML = `
    <h4 class="titreTronque">${element.title}</h4>
    <p><span class="fw-bold">Date de sortie : </span>${element.dateSortie}</p>    
    <img src="${element.image}" alt="Poster de ${element.title}" class="img-news" >    
    <p  id="description${element.id}"><a href="${element.description}">Lien vers la news</a></p>    
  `;
      parent.appendChild(htmlElement);
    });
  }
}

// les variables correspondant aux sections d'affichage de résultat en html
const listLastFilms = document.getElementById("filmsLastRelease");
const listLastSeries = document.getElementById("seriesLastRelease");
const listLastNews = document.getElementById("seriesLastNews");

// Au chargement de la page , on appelle les fonction fetch puis on crée un tableau d'objets avec les résulats du fetch
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

  let listLastNewsData = await getDataForNews();
  console.log(listLastNewsData);
  let newsArray = [];
  listLastNewsData.news.forEach((element) => {
    let news = {
      id: element.id,
      title: element.title,
      dateSortie: frenchDate(element.date),
      image: element.picture_url,
      description: element.url,
    };
    newsArray.push(news);
  });

  // Si les tableaux ne sont pas vide on crée les articles en html a l'aide de la fonction create html element
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
  if (newsArray.length !== 0) {
    createHtmlElement(newsArray, listLastNews);
  } else {
    console.log("pas de données");
  }
};
