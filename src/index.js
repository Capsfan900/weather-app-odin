import './css/style.css'
import {getWeatherDataFromLocation,processWeatherData} from './weatherDisplayController'


const queryBtn = document.querySelector("#locBtn")
queryBtn.addEventListener("click",function(){
   getWeatherDataFromLocation()
});

//create weather componets



