import { frenchDate } from "./fonctionUtils.js";


let keys = "ce4d0d3aa34d"
const createMovies = async (year, parent) => {
    try {
        // Fetch des films sur L'API
        const getMovies = await fetch(`https://api.betaseries.com/movies/list?key=${keys}&limit=100&order=popularity`)
        console.log(getMovies)
        if (getMovies.ok) {
            const movies = await getMovies.json()
            console.log(movies)
            console.log(movies.movies)
            let top = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            let i = 0


            movies.movies.forEach(element => {
                if (element.production_year === year && i < 10) {

                    console.log("coucou")
                    top[i].title = element.title
                    top[i].id = Number.parseInt(element.id)
                    console.log(top)
                    i++



                }

            });


            console.log(top)


            top.forEach(async (element) => {
                console.log(element)
                try {

                    const getDescription = await fetch(`https://api.betaseries.com/movies/movie?v=2.0&id=${element.id}&key=${keys}`)
                    console.log(getDescription)
                    if (getDescription.ok) {
                        const descriptioned = await getDescription.json()
                        console.log(descriptioned)


                        element.notes = descriptioned.movie.notes.mean
                        element.image = descriptioned.movie.poster
                        element.description = descriptioned.movie.synopsis
                        element.date = frenchDate(descriptioned.movie.release_date)
                        console.log(element)


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

            })

                ;
        }
        else throw new Error
    }
    catch (error) {
        console.error("error")

    }
}

const createBestMovies = async (parent) => {
    try {
        // Fetch des films sur L'API
        const getBestMovies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=8f7d1ef21a53b9e37b8e5be7534bb37c&language=fr&page=1`)

        if (getBestMovies.ok) {
            const bestMovies = await getBestMovies.json()
            console.log(bestMovies)

            bestMovies.results.forEach(element => {

                let htmlElement = document.createElement("article");
                htmlElement.classList.add("articles");
                htmlElement.innerHTML = `   <h4 style="height : 75px">${element.title}</h4>
                        <p><span class="fw-bold">Date de sortie : </span>${frenchDate(element.release_date)}</p>    
                        <img src="https://image.tmdb.org/t/p/w200${element.poster_path}" alt="Poster de ${element.title}" width=200px height=300px >
                        <p><span class="fw-bold">Note : </span> ${element.vote_average}/10</p>
                        <p class="visually-hidden" id="description${element.id}"><span class="fw-bold">Description : </span>${element.overview}</p>
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

            })

        }
    }




    catch (error) {
        console.error("error")

    }
}

const top2023 = document.getElementById("topmovies2023")
const top2022 = document.getElementById("topmovies2022")
const top2021 = document.getElementById("topmovies2021")
const bestMoviesAllTimes = document.getElementById("bestMovies")

createBestMovies(bestMoviesAllTimes)
createMovies("2023", top2023)
createMovies("2022", top2022)
createMovies("2021", top2021)