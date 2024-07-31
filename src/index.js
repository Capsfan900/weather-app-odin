import './css/style.css'
import {clearComponentContentsUtil, createSiteComponents} from './weatherDisplayController'


const container = document.querySelector("#componentContainer");
const queryBtn = document.querySelector("#locBtn")


//error handling and prevention of spam clicking
//at least im attempting too 
let clickCount = 0
queryBtn.addEventListener("click",function(){
   clickCount++ 
   createSiteComponents()
   clearComponentContentsUtil(container)
   alert(clickCount)
});
