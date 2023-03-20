let keys = "ce4d0d3aa34d"
const createMovies = async () => {
    try {
        // Fetch des films sur L'API
        const getMovies = await fetch(`https://api.betaseries.com/movies/list?key=${keys}&limit=10&order=popularity`)
        console.log(getMovies)
        if (getMovies.ok) {
            const movies = await getMovies.json()
            console.log(movies)
            console.log(movies.movies)
            let top = [{ name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }, { name: "", notes: 0, image: "", description: "", date: "", id: "" }]
            let i = 0

            while (i < top.length) {
                top[i].name = movies.movies[i].title
                top[i].id = Number.parseInt(movies.movies[i].id)
                console.log(typeof (movies.movies[i].id))
                i++

            }
            console.log(top)


            top.forEach(async (element) => {
                console.log(element)
                try {

                    const getDescription = await fetch(`https://api.betaseries.com/movies/movie?v=2.0&id=${element.id}&key=${keys}`)
                    console.log(getDescription)
                    if (getDescription.ok) {
                        const description = await getDescription.json()
                        console.log(description)
                        element.notes = description.movie.notes.mean
                        element.image = description.movie.poster
                        element.description = description.movie.synopsis
                        element.date = description.movie.release_date
                        console.log(element)
                        let htmlElement = document.createElement("article");
                        htmlElement.innerHTML = `<h4> Titre : ${element.name}</h4>
                                    <p>Date de sortie : ${element.date}</p>
                                    <p>Description : ${element.description}</p>
                                    <img src=${element.image} alt="Poster de ${element.title}" >
                                    <p>Note : ${Math.round(element.notes * 10) / 10}/5</p>`;
                        document.body.appendChild(htmlElement);


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

createMovies()