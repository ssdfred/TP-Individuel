const createSeries = async () => {
    try {
        // Fetch les regions sur L'API
        const getSeries = await fetch(`https://api.betaseries.com/shows/list?key=ce4d0d3aa34d&limit=1000`)
        console.log(getSeries)
        if (getSeries.ok) {
            const series = await getSeries.json()
            console.log(series)
            console.log(series.shows)
            let top = [{ name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }, { name: "", notes: 0, ratio: 0 }]

            series.shows.forEach(element => {
                if (element.seasons !== "0" && element.creation === "2022") {
                    let i = 0

                    while (i < top.length) {
                        if (element.notes.mean * element.notes.total > top[i].ratio) {
                            top[i].notes = element.notes.mean
                            top[i].name = element.title
                            top[i].ratio = element.notes.mean * element.notes.total
                            break
                        }
                        i++
                    }
                    i = 0
                }

            });
            console.log(top.length)
            console.log(top)
        }
        else throw new Error(`Error ${getSeries.status}`)

    }
    catch (error) {
        console.error("error")

    }
}
createSeries()