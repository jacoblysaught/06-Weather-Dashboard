let weather = {
    "apiKey": "2544580b8521d4a1a01e303add205e9f",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value)
    }
};

document.querySelector(".searchBtn").addEventListener("click",  function () {
    weather.search();
})

document.querySelector(".searchbar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
})


// sets the current date at the top of the page
var now = moment();
$("#currentDay").text(now.format("MMMM Do YYYY, h:mm:ss a"));
// makes the time at the top of the page live 
window.setInterval(function () {
    $('#currentDay').html(moment().format("MMMM Do YYYY, h:mm:ss a"))
}, 1000);

var currentHour = moment().hour();