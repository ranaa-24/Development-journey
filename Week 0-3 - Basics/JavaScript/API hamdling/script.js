const city = document.getElementById('city');
const btn = document.getElementById('get-btn');
const weatherDetails = document.getElementsByClassName('weather-details')[0];
const loader = document.getElementById('loader');

const API_KEY = "342255d4a8a595477145fa2c01fa8d84";

city.addEventListener('keypress', (e) => {
    if(e.key == "Enter") btn.click(); 
});

btn.addEventListener('click', async () => {
    let cityName = city.value.trim().toLowerCase();
    if (!cityName) return;
    city.value = "";
    //fetch

    try {
        const data = await getWeatherData(cityName);        //wait till get the reply, note its a async funtion so exe stops here untill we get the return 
        
        displayWeather(data);
        
    } catch (err) {
        alert("ERROR : " + err);
    }

    loader.style.display = 'none';
});


async function getWeatherData(cityName) {
    loader.style.display = 'block';
    const urlEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    let res = await fetch(urlEndPoint);
    if (!res.ok) throw new Error("City Not Found");

    let jsonData = await res.json(); 
    return jsonData;
}

function displayWeather(jsonData) {
    const { name, main, weather } = jsonData;


    let cityName = name;
    let feels = toCelsius(main.feels_like).toFixed(2);
    let des = weather[0].description;

    const location = document.getElementById('cityName');
    const desciption = document.getElementById('description');
    const temp = document.getElementById('feels-Like');

    location.innerText = cityName;
    temp.innerText = feels + " °C";
    desciption.innerText = des;

}

function toCelsius(temp){
    return temp - 273.15;
}