const LAT = "33.1214924"
const LON = "-117.3702044"
const APIKEY = "978db2dd240194fa98d81c5097cb256c"
const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=imperial`
const forecastapikey = "c06f23df1ed7a24ee4fcee485b38c29b"
const forcasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${forecastapikey}&units=imperial`
const ONE_DAY = 24 * 60 * 60 * 1000
let modifyDate = new Date();
let modifyYear = modifyDate.getFullYear();
const hideButton = document.querySelector('.menu-close');
const showButton = document.querySelector('.menu-open');
const navigation = document.querySelector('.ham-menu');
const fruiturl = "./data/fruit.json"

// Current weather stuff
function displayWeather(weatherData) {
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
    const desc = weatherData.weather[0].description
    const temperature = weatherData.main.temp.toFixed(0)
    const humidity = weatherData.main.humidity

    let weatherIcon = document.getElementById("icon");
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    let weatherDesc = document.getElementById("desc")
    weatherDesc.innerHTML = `${desc}`

    let weatherTemp = document.getElementById("temp")
    weatherTemp.innerHTML = `Temperature: ${temperature}&deg;F`

    let weatherHumid = document.getElementById("humid")
    weatherHumid.innerHTML = `Humidity: ${humidity}%`
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

if (window.location == "index.html"){
    getWeather();
}

// Weather forecast stuff
function displayForecast(forecastData){
    let dates = []
    let mydate = new Date();
    for (let i=0; i < 3; i++){
        // if (i == 0){
            // mydate = new Date(mydate.getTime() + ONE_DAY + ONE_DAY)
        // }else{
            mydate = new Date(mydate.getTime() + ONE_DAY)
        // }
        nextdate = mydate.toISOString().slice(0, 10)
        dates.push(nextdate)
    }
    
    let iconsrc = []
    for (let i of dates){
        if (/09/.test(forecastData.dt_txt)){
            let icon = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`
            iconsrc.push(icon)
        }
    }
    
    weatherElt = document.querySelector("body .forecast")

    // dates = dates.map((date) => {
    //     let mydate = new Date(date)
    //     const newdate = `${mydate.toLocaleString('en-US', {weekday: 'long'})} ${mydate.toLocaleString('en-US', {month: 'long'})} ${mydate.toLocaleString('en-US', {day: 'numeric'})}, ${mydate.toLocaleString('en-US', {year: 'numeric'})}`
    //     return newdate
    // })


    for (let i=0; i < 3; i++){
        let newsection = document.createElement("section");
        newsection.classList.add("day-card");
        newsection.innerHTML = `<h3>${dates[i]}</h3><img src="${iconsrc[i]}" alt="weather icon"><p></p>`
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

if (window.location == "index.html"){
    getForcastData();
}

// Last modified stuff
document.querySelector('#yr').textContent = modifyYear;
document.querySelector('#lastModified').innerHTML = 'Last Modified: ' + document.lastModified;

// Hamburger menu stuff
hideButton.addEventListener('click', () => {
	
	hideButton.classList.toggle('open');
	showButton.classList.toggle('open');
	navigation.classList.toggle('open');
});

showButton.addEventListener('click', () => {
	
	hideButton.classList.toggle('open');
	showButton.classList.toggle('open');
	navigation.classList.toggle('open');
});

// Fruit options

const fruitOptions = (fruits) => {
    if (window.location == "order.html"){
        const fruit1 = document.querySelector("#fruit1");
        const fruit2 = document.querySelector("#fruit2");
        const fruit3 = document.querySelector("#fruit3");
        fruits.forEach((fruitName) => {
            let option = document.createElement("option");
            option.innerHTML = `${fruitName.name}`;
            fruit1.appendChild(option);
        });
        fruits.forEach((fruitName) => {
            let option = document.createElement("option");
            option.innerHTML = `${fruitName.name}`;
            fruit2.appendChild(option);
        });
        fruits.forEach((fruitName) => {
            let option = document.createElement("option");
            option.innerHTML = `${fruitName.name}`;
            fruit3.appendChild(option);
        });
    }
};


let ordered = []
// Order confirmation stuff
if (window.location == "confirmation.html"){
    let confirmationurl = new URL(window.location);
    let params = confirmationurl.searchParams;
    let orderFruit1 = params.get("fruit1");
    let orderFruit2 = params.get("fruit2");
    let orderFruit3 = params.get("fruit3");

    document.querySelector("#order-name").textContent = params.get("firstname");
    document.querySelector("#order-email").textContent = params.get("email");
    document.querySelector("#order-phone").textContent = params.get("phone");
    document.querySelector("#order-fruit1").textContent = orderFruit1;
    document.querySelector("#order-fruit2").textContent = orderFruit2;
    document.querySelector("#order-fruit3").textContent = orderFruit3;
    if (params.get("instructions") == "") {
        document.querySelector("#order-instructions").textContent = "None";
    }else{
        document.querySelector("#order-instructions").textContent = params.get("instructions");
    }
    document.querySelector("#order-date").textContent = params.get("timestamp").substring(0,25);

    ordered = [orderFruit1, orderFruit2, orderFruit3]
}

const fruitNutrition = (fruits) => {
    let carbs = 0
    let protein = 0
    let fat = 0
    let sugar = 0
    let calories = 0
    fruits.forEach((fruitName) => {
        if (`${fruitName.name}` in ordered) {
            let carb = Number(`${fruitName.nutritions.carbohydrates}`);
            let prot = Number(`${fruitName.nutritions.protein}`);
            let ft = Number(`${fruitName.nutritions.fat}`);
            let sug = Number(`${fruitName.nutritions.sugar}`);
            let cal = Number(`${fruitName.nutritions.calories}`);
            carbs += carb;
            protein += prot;
            fat += ft;
            sugar += sug;
            calories += cal;
        }
    });
    document.querySelector("#carbs").textContent = carbs;
    document.querySelector("#protein").textContent = protein;
    document.querySelector("#fat").textContent = fat;
    document.querySelector("#sugar").textContent = sugar;
    document.querySelector("#calories").textContent = calories;
};

async function getFruitData() {
    const response = await fetch(fruiturl);
    if (response.ok) {
        const data = await response.json();
        fruitOptions(data.fruits);
    }else{
        console.error("Data couldn't be loaded");
        fruit.innerHTML = `<option>Data couldn't be loaded</option>`;
    }
}

if (window.location == "./order.html"){
    getFruitData();
}

async function getFruitNutr() {
    const response = await fetch(fruiturl);
    if (response.ok) {
        const data = await response.json();
        fruitNutrition(data.fruits);
    }else{
        console.error("Data couldn't be loaded");
    }
}

if (window.location == "./confirmation.html"){
    getFruitNutr();
}