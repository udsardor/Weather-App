window.addEventListener("DOMContentLoaded", () => {
    const api = {
        key : "1cfb22e9b53e724da9ae159a83724ab6",
        baseurl : `https://api.openweathermap.org/data/2.5/`
    }
    
    const searchBox = document.querySelector(".search-box");
    searchBox.addEventListener("keypress", setQuery)

    getResults("Uzbekistan")
        
    console.log("sardor")
    function setQuery(e){
        if(e.keyCode == 13){
            getResults(searchBox.value)
        }
    } 

    async function getResults(query){
        const res = await fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(response => response.json())
            .then(displayResults)
    }

    function displayResults(weather){
        console.log(weather)
        let city = document.querySelector(".location .city")
        city.innerHTML = `${weather.name}, ${weather.sys.country}`
        let now = new Date();
        let date = document.querySelector(".date")
        date.innerHTML = getDate(now);
        let temp = document.querySelector(".temp");
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`
        let weatherEl = document.querySelector(".weather");
        weatherEl.innerHTML = weather.weather[0].main;
        let hilow = document.querySelector(".hi-low")
        hilow.innerHTML = `${Math.round(weather.main.temp_min == (weather.main.temp_max)) ?  Math.round(weather.main.temp_max) : ""}°C`
    }

    function getDate(s){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[s.getDay()];
        let date = s.getDate();
        let month = months[s.getMonth()];
        let year = s.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
})