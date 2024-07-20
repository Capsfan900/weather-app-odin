
import { locationKey,gifKey,forecastKey } from "./apiVault";


//could refactor to handle all promises at once eventually 
export const getWeatherDataFromLocation = async() =>{
    //---current day data---//
    const imgBox = document.querySelector("#imgBox");
    const LocationInputDiv = document.querySelector("#location-query");
    const location = LocationInputDiv.value 
    alert(location)
    const img = document.createElement("img")
    const response = await fetch(locationKey+location,{mode: 'cors'});
    const queryResult = await response.json();
    //main stats + gif query

    const gifResponse = await fetch(gifKey+queryResult.current.condition.text, {mode: 'cors'});
    const gifQueryResult = await gifResponse.json();
    img.src = gifQueryResult.data.images.original.url;
    imgBox.appendChild(img)
    
   
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
    const weatherData = await getWeatherDataFromLocation();
    
    const infoContainer = document.querySelector(".infoContainer")
    // Location details
    let div1 = document.querySelector("#location");
    div1.style.border ="1px solid black"
    if (!div1) {
        div1 = document.createElement("div");
        div1.id = "location";
    }

    for (const [key, value] of Object.entries(weatherData.locationInfo)) {
        const locationDetail = document.createElement("div");
        locationDetail.classList.add("location-details");
        locationDetail.textContent = `${key}: ${value}`;
        locationDetail.style.fontSize = "10px";
        locationDetail.style.height = "fit-content";
        locationDetail.style.width = "fit-content";
        locationDetail.style.color = 'Black';
        div1.appendChild(locationDetail);
    }
    infoContainer.appendChild(div1);

    // Weather details
    let div2 = document.querySelector("#weather");
    div2.style.border ="1px solid black"
    if (!div2) {
        div2 = document.createElement("div");
        div2.id = "weather";
    }

    for (const [key, value] of Object.entries(weatherData.weatherDetails)) {
        const weatherDetails = document.createElement("div");
        weatherDetails.classList.add("weather-details");
        weatherDetails.textContent = `${key}: ${value}`;
        weatherDetails.style.fontSize = "10px";
        weatherDetails.style.height = "fit-content";
        weatherDetails.style.width = "fit-content";
        weatherDetails.style.color = 'Black';
        div2.appendChild(weatherDetails);
    }
    infoContainer.appendChild(div2);

    // Append infoContainer to the document body or another parent element
    
  

    //forecast 
        const forecastTitle = document.createElement("h2");
        forecastTitle.id = "forecastTitle"
        forecastTitle.textContent =`3 Day Forecast for  ${weatherData.locationInfo.region}`
        let div3 = document.querySelector(".forecast")
        div3.appendChild(forecastTitle)
        //error handling
        if (!div3) {
            console.error("Container element not found");
            return;
        }
        let days = weatherData.forecastData
        for (const day of days) {
            const dayWrapper = document.createElement("div");
            dayWrapper.style.display = "flex";
            dayWrapper.style.flexDirection = "column";
            dayWrapper.style.height = "10rem";
            dayWrapper.style.width = "10re";
            dayWrapper.style.margin = "0.5rem";
            dayWrapper.style.padding = "0.5rem";
            dayWrapper.style.border = "1px solid #ccc";
        
            for (const [key, value] of Object.entries(day)) {
                const dayData = document.createElement("div");
                dayData.id = "dayData"
                dayData.textContent = `${key}: ${value}`;
                dayData.classList.add("forecast-data");
                dayData.style.fontSize = "10px";
                dayData.style.height = "fit-content";
                dayData.style.width = "fit-content";
                dayData.style.color = 'Black';
                dayData.style.marginBottom = ".1rem";
        
                dayWrapper.appendChild(dayData);
            }
        
            div3.appendChild(dayWrapper);
        }

}


export const clearPageUtil = () =>{
    const container = document.documentElement
    if (container) {
        container.replaceChildren();
    }
}


export const loadingBarController = (promiseReturnStatus) =>{

}












    













