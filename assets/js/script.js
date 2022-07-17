const city = $('.searchbar').val();
const searchbar = document.querySelector(".searchbar");
const searchValue = searchbar.value

// For loop for persisting the data onto HTML page
for (var i = 0; i < localStorage.length; i++) {

    const city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
// calls and displays data onto main card
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
        document.querySelector(".city").innerText = "Weather  in  " + name;
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

let uvURL = {
    "apiKey": "2544580b8521d4a1a01e303add205e9f",
    fetchUVindex: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&units=metric&appid=" +_this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayUVindex: function(data) {
        console.log(data);
    }
}

//listens for button to be clicked while then calls search function which changes the city and adds to localstorage
document.querySelector(".searchBtn").addEventListener("click",  function () {
    const searchText = searchbar.value;
    localStorage.setItem(localStorage.length, searchText);
    weather.search();
})

// listens for enter key to be pressed while in the searchbar then calls search function which changes the city
document.querySelector(".searchbar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const searchText = searchbar.value;
        localStorage.setItem(localStorage.length, searchText);
        weather.search();
    }
})

// sets the current date at the top of the page
let today = moment();
$("#currentDay").text(today.format("MMMM Do YYYY"));
$(".card-title").text(today.format("L"));

// displays time added by one from one another to create the 5day forecast
document.querySelector("#day-1").innerText = today.add(1, "days").format("L");
document.querySelector("#day-2").innerText = today.add(1, "days").format("L");
document.querySelector("#day-3").innerText = today.add(1, "days").format("L");
document.querySelector("#day-4").innerText = today.add(1, "days").format("L");
document.querySelector("#day-5").innerText = today.add(1, "days").format("L");