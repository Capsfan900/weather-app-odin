
import { locationKey,gifKey,forecastKey } from "./apiVault";


//could refactor to handle all promises at once eventually 
export const getWeatherDataFromLocation = async() =>{
    //---current day data---//
    const LocationInputDiv = document.querySelector("#location-query");
    const location = LocationInputDiv.value 
    alert(location)
    const img = document.querySelector('img');
    const response = await fetch(locationKey+location,{mode: 'cors'});
    const queryResult = await response.json();
 
    //main stats + gif query

    const gifResponse = await fetch(gifKey+queryResult.current.condition.text, {mode: 'cors'});
    const gifQueryResult = await gifResponse.json();
    img.src = gifQueryResult.data.images.original.url;

   
    const locationInfo = {
        country: queryResult.location.country,
        name: queryResult.location.name,
        region: queryResult.location.region,
        localTime: queryResult.location.localtime
    };
    
    const weatherDetails = {
        briefDescription: queryResult.current.condition.text,
        heatIndexF: queryResult.current.heatindex_f,
        windSpeedMph: queryResult.current.wind_mph,
        windDirection: queryResult.current.wind_dir,
        humidity: queryResult.current.humidity
    };
    
    //---3 day forecast data---//
    const forecastResponse = await fetch(forecastKey);
    const forecastResult = await forecastResponse.json();
    let forecastData = [];
    //if statement is checking if said data exists (defined data vs undefined data)
    if (forecastResult.forecast && forecastResult.forecast.forecastday) {
        //map(make a new array based off the forecast data and forecast day)
        forecastData = forecastResult.forecast.forecastday.map((day, index) => {
            return {
                day: index + 1,
                date: day.date,
                maxTemp: `${day.day.maxtemp_c}°C`,
                minTemp: `${day.day.mintemp_c}°C`,
                condition: day.day.condition.text
            };
        });
    } else {
        alert("bad weather data!")
    }

    LocationInputDiv.value = " ";
    return  {locationInfo,weatherDetails,forecastData}
}


//pass in weather data
export const createSiteComponents =  async(data) =>{
    const weatherData =  await getWeatherDataFromLocation();
    const locationDiv = document.createElement("div");
    locationDiv.style.height = "200px"
    locationDiv.style.width = "200px"

    //location
    for (const [key,value] of Object.entries(weatherData.locationInfo)){
        let div1 = document.querySelector("#location")
        //error handling
        if (!div1) {
            console.error("Container element not found");
            return;
        }
        const locationDetail = document.createElement("div")
        locationDetail.classList.add("location-details");
        locationDetail.textContent = `${key}: ${value}`;
        locationDetail.style.fontSize = "10px";
        locationDetail.style.height = "fit-content";
        locationDetail.style.width = "fit-content";
        locationDetail.style.color  = 'Black'
        div1.appendChild(locationDetail);
    }
    
    //weather
    for (const [key,value] of Object.entries(weatherData.weatherDetails)){
        let div2 = document.querySelector("#weather")
        //error handling
        if (!div2) {
            console.error("Container element not found");
            return;
        }
        const weatherDetails = document.createElement("div")
        weatherDetails.classList.add("weather-details");
        weatherDetails.textContent = `${key}: ${value}`;
        weatherDetails.style.fontSize = "10px";
        weatherDetails.style.height = "fit-content";
        weatherDetails.style.width = "fit-content";
        weatherDetails.style.color  = 'Black'
        div2.appendChild(weatherDetails);
    }


    
    //forecast 
    const formatThreeDayForecast = () => {
    
        let div3 = document.querySelector(".forecast")
        //error handling
        if (!div3) {
            console.error("Container element not found");
            return;
        }
        let days = weatherData.forecastData
        for(const day of days){
            for (const [key,value] of Object.entries(day)){
                const day1 = document.createElement("div");
                day1.textContent = `${key}: ${value}`;
                day1.classList.add("forecast-data");
                day1.style.fontSize = "10px";
                day1.style.height = "fit-content";
                day1.style.width = "fit-content";
                day1.style.color  = 'Black' 
                day1.style.marginBottom = ".1rem"
                div3.appendChild(day1);
            }
        }
        
    }
    formatThreeDayForecast()

}   
















    













