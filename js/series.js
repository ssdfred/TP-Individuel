const createSeries = async () => {
    try {
        // Fetch des séries sur L'API
        const getSeries = await fetch(`https://api.betaseries.com/shows/list?key=ce4d0d3aa34d&limit=100&order=popularity`)
        console.log(getSeries)
        if (getSeries.ok) {
            const series = await getSeries.json()
            console.log(series)
            console.log(series.shows)
            let top = [{ name: "", notes: 0, ratio: 0, image: "", description: "", date: "" }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }]

            series.shows.forEach(element => {
                if (element.seasons !== "0" && element.creation === "2022") {
                    let i = 0

                    while (i < top.length) {
                        if (element.notes.mean > top[i].ratio) {
                            top[i].notes = element.notes.mean
                            top[i].name = element.title
                            top[i].ratio = element.notes.mean * element.notes.total
                            top[i].image = element.images.poster
                            top[i].description = element.description
                            top[i].date = element.creation
                            break
                        }
                        i++
                    }
                    i = 0
                }

            });

            let swapped = true
            while (swapped) {
                let i = 0
                swapped = false
                while (i < top.length) {
                    console.log(top)
                    if (top[i].notes < top[i + 1].notes) {
                        let x = top[i]
                        top[i] = top[i + 1]
                        top[i + 1] = x
                        swapped = true

                    }
                    i++
                }
            }
            console.log(top.length)
            console.log(top)
            top.forEach(element => {
                let htmlElement = document.createElement("article");
                htmlElement.innerHTML = `<h4> Titre : ${element.name}</h4>
                            <p>Date de sortie : ${element.date}</p>
                            <p>Description : ${element.description}</p>
                            <img src=${element.image} alt="Poster de ${element.title}" >
                            <p>Note : ${Math.round(element.notes * 10) / 10}/5</p>`;
                document.body.appendChild(htmlElement);

            });
        }
        else throw new Error(`Error ${getSeries.status}`)

    }
    catch (error) {
        console.error("error")

    }
}
createSeries()