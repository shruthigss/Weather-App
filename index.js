let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

searchbutton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = " ";
});

const getWeather = async (city) => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06e896d1022f0bc2cb71e7a1f5d59e6a`,

            { mode: "cors" }
        );
        const weatherData = await res.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.png"
        }

        else if (id < 400 && id > 300) {
            tempicon.src = "./icons/cloud-solid.png"
        }

        else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rain.jpg"
        }

        else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snow.png"
        }

        else if (id < 800 && id > 700) {
            tempicon.src = "./icons/cloud.png"
        }

        else if (id == 800) {
            tempicon.src = "./icons/cloud&sun.png"
        }

    }
    catch (e) {
        alert("City Not Found");
    }
};

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=06e896d1022f0bc2cb71e7a1f5d59e6a`

            fetch(api).then((res) => {
                return res.json();
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) {
                        tempicon.src = "./icons/thunderstorm.png"
                    }

                    else if (id < 400 && id > 300) {
                        tempicon.src = "./icons/cloud-solid.png"
                    }

                    else if (id < 600 && id > 500) {
                        tempicon.src = "./icons/rain.jpg"
                    }

                    else if (id < 700 && id > 600) {
                        tempicon.src = "./icons/snow.png"
                    }

                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/cloud.png"
                    }

                    else if (id == 800) {
                        tempicon.src = "./icons/cloud&sun.png"
                    }
                    console.log(data);
                })

        }
        )
    }
})