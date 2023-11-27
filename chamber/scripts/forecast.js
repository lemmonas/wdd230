const lat = 51.5286051
const lon = -0.4319374
const apikey = `c06f23df1ed7a24ee4fcee485b38c29b`
const forcasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`

const ONE_DAY = 24 * 60 * 60 * 1000

function displayForecast(forecastData){
    let dates = []
    let mydate = new Date();
    for (let i=0; i < 3; i++){
        mydate = new Date(mydate.getTime() + ONE_DAY)
        nextdate = mydate.toISOString().slice(0, 10)
        dates.push(nextdate)
    }
    
    highTemps = dates.map((date) => forecastData
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((prev, next) => prev.main.temp > next.main.temp ? prev : next)
    )    
    
    lowTemps = dates.map((date) => forecastData
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((prev, next) => prev.main.temp < next.main.temp ? prev : next)        
    )    
    
    weatherElt = document.querySelector("body .home-page .weather .forecast")

    dates = dates.map((date) => {
        let mydate = new Date(date)
        const newdate = `${mydate.toLocaleString('en-US', {weekday: 'long'})} ${mydate.toLocaleString('en-US', {month: 'long'})} ${mydate.toLocaleString('en-US', {day: 'numeric'})}, ${mydate.toLocaleString('en-US', {year: 'numeric'})}`
        return newdate
    })


    for (let i=0; i < 3; i++){
        let newsection = document.createElement("section");
        newsection.classList.add("day-card");
        newsection.innerHTML = `<h3>${dates[i]}</h3><p>High: ${highTemps[i].main.temp.toFixed(0)}&deg;</p><p>Low: ${lowTemps[i].main.temp.toFixed(0)}&deg;</p>`
        weatherElt.append(newsection)
    }    
}


async function getForcastData(){
    try {
        const response = await fetch(forcasturl);
        if (response.ok){
            const fdata = await response.json();
            displayForecast(fdata.list);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getForcastData();