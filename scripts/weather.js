const LAT = "43.82"
const LON = "-111.80"
const APIKEY = "978db2dd240194fa98d81c5097cb256c"
const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=imperial`

function displayWeather(weatherData) {
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
    const desc = weatherData.weather[0].description
    const windspeed = weatherData.wind.speed.toFixed(0)
    const temperature = weatherData.main.temp.toFixed(0)

    let weatherIcon = document.getElementById("weather-icon");
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    let weatherDesc = document.getElementById("weather-desc")
    weatherDesc.innerHTML = `${desc}`

    let weatherTemp = document.getElementById("weather-temp")
    weatherTemp.innerHTML = `${temperature}&deg;F | ${windspeed} mph wind`
}

async function getWeather() {
    try {
        const response = await fetch(apiurl)
        if (response.ok){
            const data = await response.json()
            displayWeather(data)
        }else{
            throw error(await response.text())
        }
    }catch (error){
        console.log(error)
    }
}

getWeather()