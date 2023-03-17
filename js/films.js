const createMovies = async () => {
    try {
        // Fetch des films sur L'API
        const getMovies = await fetch(`https://api.betaseries.com/movies/list?key=ce4d0d3aa34d&limit=1000`)
        console.log(getMovies)
        if (getMovies.ok) {
            const movies = await getMovies.json()
            console.log(movies)
            console.log(movies.movies)
            let top = [{ name: "", notes: 0, ratio: 0, image: "", description: "", date: "" }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }]

            //     movies.shows.forEach(element => {
            //         if (element.seasons !== "0" && element.creation === "2022") {
            //             let i = 0

            //             while (i < top.length) {
            //                 if (element.notes.mean * element.notes.total > top[i].ratio) {
            //                     top[i].notes = element.notes.mean
            //                     top[i].name = element.title
            //                     top[i].ratio = element.notes.mean * element.notes.total
            //                     top[i].image = element.images.poster
            //                     top[i].description = element.description
            //                     top[i].date = element.creation
            //                     break
            //                 }
            //                 i++
            //             }
            //             i = 0
            //         }

            //     });
            //     console.log(top.length)
            //     console.log(top)
            //     top.forEach(element => {
            //         let htmlElement = document.createElement("article");
            //         htmlElement.innerHTML = `<h4> Titre : ${element.name}</h4>
            //                     <p>Date de sortie : ${element.date}</p>
            //                     <p>Description : ${element.description}</p>
            //                     <img src=${element.image} alt="Poster de ${element.title}" >
            //                     <p>Note : ${element.notes}/5</p>`;
            //         document.body.appendChild(htmlElement);

            //     });
        }
        else throw new Error(`Error ${getMovies.status}`)

    }
    catch (error) {
        console.error("error")

    }
}
createMovies()