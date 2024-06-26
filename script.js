let temp = document.querySelector('.temperature');
let city = document.querySelector('.cityname');
let humidty = document.querySelector('.humi-value');
let wind = document.querySelector('.wind-value');
let icon = document.querySelector('.icon');
let error = document.querySelector('.error');
let cityname = '';
async function weatherupdate(cityname) {
    try {
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=`;
        const apikey = "f10929c14c44ff859b4c770c57299691";
        const response = await fetch(apiurl + apikey + "&units=metric");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        else {
            const data = await response.json();
            console.log(data);
            error.style.display = "none";
            document.querySelector('.icon-container').style.display = "block";
            temp.innerHTML = Math.round(data.main.temp) + "°C";
            city.innerHTML = data.name;
            humidty.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + "km/h";
            if (data.weather[0].main == "Clouds") {
                icon.src = "./images/clouds.png";
            }
            else if (data.weather[0].main == "Rain") {
                icon.src = "./images/rain.png";
            }
            else if (data.weather[0].main == "Clear") {
                icon.src = "./images/clear.png";
            }
            else if (data.weather[0].main == "Snow") {
                icon.src = "./images/snow.png";
            }
        }
    }
    catch (e) {
        document.querySelector('.icon-container').style.display = "none";
        error.style.display = "block";
    }

}



let text = document.querySelector('.search input');
let searchbtn = document.querySelector('.search-button');
searchbtn.addEventListener('click', () => {
    cityname = text.value;
    weatherupdate(cityname);
})