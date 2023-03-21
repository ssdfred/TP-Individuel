let key = "ce4d0d3aa34d"
// @param{string} years
// @param{parent} HTMLElement

const createSeries = async (year, parent) => {
    try {
        // Fetch des séries sur L'API
        const getSeries = await fetch(`https://api.betaseries.com/shows/list?key=${key}&limit=200&order=popularity`)

        if (getSeries.ok) {
            const series = await getSeries.json()

            let arraySeries = [{ name: "", notes: 0, ratio: 0, image: "", description: "", date: "" }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }]
            //tri des data et stockage des objets dans arraySeries
            series.shows.forEach(element => {
                if (element.seasons !== "0" && element.creation === year) {
                    let i = 0

                    while (i < arraySeries.length) {
                        if (element.notes.mean > arraySeries[i].ratio) {
                            arraySeries[i].notes = element.notes.mean
                            arraySeries[i].title = element.title
                            arraySeries[i].ratio = element.notes.mean * element.notes.total
                            arraySeries[i].image = element.images.poster
                            arraySeries[i].description = element.description
                            arraySeries[i].date = element.creation
                            break
                        }
                        i++
                    }
                    i = 0
                }

            });
            //Création des balises HTML
            arraySeries.forEach(element => {
                let htmlElement = document.createElement("article");
                htmlElement.classList.add("articles");
                htmlElement.innerHTML = ` <h4 style="height : 75px">${element.title}</h4>
                <p><span class="fw-bold">Date de sortie : </span>${element.date}</p>    
                <img src="${element.image}" alt="Poster de ${element.title}" width=200px height=300px >
                <p><span class="fw-bold">Note : </span> ${Math.round(element.notes * 10) / 10}/5</p>
                <p class="visually-hidden" id="description${element.id}"><span class="fw-bold">Description : </span>${element.description}</p>
                <button class="btn" id="button${element.id}">Voir la description</button>  `;

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
        }
        else throw new Error(`Error ${getSeries.status}`)

    }
    catch (error) {
        console.error("error")

    }
}
const topseries2022 = document.getElementById("topseries2022")
const topseries2021 = document.getElementById("topseries2021")
createSeries("2022", topseries2022)
createSeries("2021", topseries2021)