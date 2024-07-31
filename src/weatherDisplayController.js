
import { locationKey,gifKey,forecastKey } from "./apiVault";
const componentContainer = document.querySelector("#componentContainer");

//could refactor to be more modular and less hard coded but its just course work
//seperate the css styling from the JS for a more modular and maintainable approach
// maybe refactor for practice but lesson was learned 

export const getWeatherData = async() =>{
    const LocationInputDiv = document.querySelector("#location-query");
    const location = LocationInputDiv.value 
    alert(location)
    LocationInputDiv.textContent = " ";
    alert("started API request")

    const response = await fetch(locationKey+location,{mode: 'cors'});
    const queryResult = await response.json();

    //gif query 
    
    const gifResponse = await fetch(gifKey+queryResult.current.condition.text, {mode: 'cors'});
    const gifQueryResult = await gifResponse.json();

    const forecastResponse = await fetch(forecastKey);
    const forecastResult = await forecastResponse.json();
    return {queryResult,gifQueryResult,forecastResult}
    //func returns JSON objects
}


///////////////////////////////////////////////////////////////

export const formatCollectedData = async(data)=>{
    data =  await getWeatherData()
    const gifQueryResult = data.gifQueryResult
    console.log(data)
    const locationInfo = {
        country: data.queryResult.location.country,
        name: data.queryResult.location.name,
        region: data.queryResult.location.region,
        localTime: data.queryResult.location.localtime
    };
    
    const weatherDetails = {
        briefDescription: data.queryResult.current.condition.text,
        heatIndexF: data.queryResult.current.heatindex_f,
        windSpeedMph: data.queryResult.current.wind_mph,
        windDirection: data.queryResult.current.wind_dir,
        humidity: data.queryResult.current.humidity
    };

    //---3 day forecast data---//
    let forecastData = [];
    //if statement is checking if said data exists (defined data vs undefined data)
    if (data.forecastResult.forecast && data.forecastResult.forecast.forecastday) {
        //map(make a new array based off the forecast data and forecast day)
        forecastData = data.forecastResult.forecast.forecastday.map((day, index) => {
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
    alert("end (promised data is fuffilled)")

    return {locationInfo, weatherDetails, forecastData ,gifQueryResult}
}



//////////////////////////////////////////////////////////////////////////////////////

class DomManipulator {
    constructor(componentContainer) {
        this.componentContainer = componentContainer;
    }

    //parameters must be image url or gif
    createImageBox(gifQueryResult) {
        const imgBox = document.createElement("div");
        imgBox.id = "imgBox";
        const img = document.createElement("img");
        img.src = gifQueryResult.data.images.original.url;
        imgBox.appendChild(img);
        this.componentContainer.appendChild(imgBox);
    }

    //parameters must be objects of data
    createInfoContainer(weatherData) {
        const infoContainer = document.createElement("div");
        infoContainer.id = "infoContainer";
        this.componentContainer.appendChild(infoContainer);

        this.createInfoSection(infoContainer, "Location Information", weatherData.locationInfo, "location");
        this.createInfoSection(infoContainer, "Weather Information", weatherData.weatherDetails, "weather");
    }


    createInfoSection(container, title, data, id) {
        const titleElement = document.createElement("h4");
        titleElement.textContent = title;
        container.appendChild(titleElement);

        const div = document.createElement("div");
        div.id = id;
        div.style.border = "1px solid black";

        for (const [key, value] of Object.entries(data)) {
            const detailPair = this.createDetailPair(key, value);
            div.appendChild(detailPair);
        }

        container.appendChild(div);
    }

    createDetailPair(key, value) {
        const detailPair = document.createElement("div");
        detailPair.classList.add("detail-pair");

        const keyDiv = document.createElement("div");
        keyDiv.classList.add("detail-key");
        keyDiv.textContent = key;

        const separator = document.createElement("div");
        separator.classList.add("detail-separator");
        separator.textContent = "|-----|";

        const valueDiv = document.createElement("div");
        valueDiv.classList.add("detail-value");
        valueDiv.textContent = value;

        detailPair.append(keyDiv, separator, valueDiv);
        detailPair.style.fontSize = "10px";
        detailPair.style.color = 'Black';

        return detailPair;
    }

    createForecastSection(weatherData) {
        const forecast = document.createElement("div");
        forecast.classList.add("forecast");

        const forecastTitle = document.createElement("h2");
        forecastTitle.id = "forecastTitle";
        forecastTitle.textContent = `3 Day Forecast for ${weatherData.locationInfo.name}, ${weatherData.locationInfo.region}`;
        forecast.appendChild(forecastTitle);

        const dayHolder = document.createElement("div");
        dayHolder.id = "dayHolder";

        weatherData.forecastData.forEach(day => {
            const dayWrapper = this.createDayWrapper(day);
            dayHolder.appendChild(dayWrapper);
        });

        forecast.appendChild(dayHolder);
        this.componentContainer.appendChild(forecast);
    }

    createDayWrapper(day) {
        const dayWrapper = document.createElement("div");
        dayWrapper.id = "dayBox";
        dayWrapper.style.display = "flex";
        dayWrapper.style.flexDirection = "column";
        dayWrapper.style.margin = "0.5rem";
        dayWrapper.style.padding = "0.5rem";
        dayWrapper.style.border = "1px solid #ccc";

        for (const [key, value] of Object.entries(day)) {
            const dayData = document.createElement("div");
            dayData.textContent = `${key}: ${value}`;
            dayData.classList.add("forecast-data");
            dayData.style.fontSize = "10px";
            dayData.style.height = "fit-content";
            dayData.style.width = "fit-content";
            dayData.style.color = 'Black';
            dayData.style.marginBottom = ".1rem";

            dayWrapper.appendChild(dayData);
        }

        return dayWrapper;
    }
}

export const createSiteComponents = async () => {
    const weatherData = await formatCollectedData();
    const domManipulator = new DomManipulator(componentContainer);
    domManipulator.createImageBox(weatherData.gifQueryResult);
    domManipulator.createInfoContainer(weatherData);
    domManipulator.createForecastSection(weatherData);
};




export const clearComponentContentsUtil = (component) => {
    component.innerHTML = " "
}














    













