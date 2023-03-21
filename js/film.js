import { frenchDate } from "./fonctionUtils.js";

// @param{string} years
// @param{parent} HTMLElement


let keys = "ce4d0d3aa34d"
const createMovies = async (year, parent) => {
    try {
        // Fetch des films sur L'API
        const getMovies = await fetch(`https://api.betaseries.com/movies/list?key=${keys}&limit=100&order=popularity`)

        if (getMovies.ok) {
            const movies = await getMovies.json()

            let arrayMovies = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            let i = 0

            //tri des data et stockage dans arrayMovies de l'id des films
            movies.movies.forEach(element => {
                if (element.production_year === year && i < 10) {

                    arrayMovies[i].title = element.title
                    arrayMovies[i].id = Number.parseInt(element.id)
                    i++
                }

            });


            //Fetch des description sur l'api
            arrayMovies.forEach(async (element) => {

                try {

                    const getDescription = await fetch(`https://api.betaseries.com/movies/movie?v=2.0&id=${element.id}&key=${keys}`)

                    if (getDescription.ok) {
                        const descriptioned = await getDescription.json()

                        element.notes = descriptioned.movie.notes.mean
                        element.image = descriptioned.movie.poster
                        element.description = descriptioned.movie.synopsis
                        element.date = frenchDate(descriptioned.movie.release_date)



                        let htmlElement = document.createElement("article");
                        htmlElement.classList.add("articles");
                        htmlElement.innerHTML = `   <h4 style="height : 75px">${element.title}</h4>
                        <p><span class="fw-bold">Date de sortie : </span>${element.date}</p>    
                        <img src="${element.image}" alt="Poster de ${element.title}" width=200px height=300px >
                        <p><span class="fw-bold">Note : </span> ${Math.round(element.notes * 10) / 10}/5</p>
                        <p class="visually-hidden" id="description${element.id}"><span class="fw-bold">Description : </span>${element.description}</p>
                        <button class="btn" id="button${element.id}">Voir la description</button>`;
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

                        }
                    }
                    else throw new Error
                }
                catch (error) {
                    console.error("error")
                }

            });
        }
        else throw new Error
    }
    catch (error) {
        console.error("error")

    }
}
const top2023 = document.getElementById("topmovies2023")
const top2022 = document.getElementById("topmovies2022")
const top2021 = document.getElementById("topmovies2021")


createMovies("2023", top2023)
createMovies("2022", top2022)
createMovies("2021", top2021)