import { locationKey,gifKey,forecastKey } from "./apiVault";

export const getWeatherDataFromLocation = async() =>{
    //---current day data---//
    const img = document.querySelector('img');
    const LocationInputDiv = document.querySelector("#location-query");
    const location = LocationInputDiv.value
    const response = await fetch(locationKey);
    const queryResult = await response.json();

    //main stats + gif query
    const gifResponse = await fetch(gifKey, {mode: 'cors'});
    const gifQueryResult = await gifResponse.json();
    img.src = gifQueryResult.data.images.original.url;
 

    console.log("----start of current day info----")    

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
    
    console.log("Location Information:", locationInfo);
    console.log("Weather Details:", weatherDetails);
    //---current day data and giff info---//


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
    console.log("--start of forecast data--");
    console.log(forecastData);
    //---3 day forecast data---//

    LocationInputDiv.value = " ";
}


//condition object text => query gif for picture => display picture










    













