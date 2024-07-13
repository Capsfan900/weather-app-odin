import './css/style.css'
import {createSiteComponents} from './weatherDisplayController'


const queryBtn = document.querySelector("#locBtn")
queryBtn.addEventListener("click",function(){
   createSiteComponents();
});

//create weather componets



