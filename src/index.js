import './css/style.css'
import {clearPageUtil, createSiteComponents} from './weatherDisplayController'


const queryBtn = document.querySelector("#locBtn")
queryBtn.addEventListener("click",function(){
   createSiteComponents();
});

//create weather componets

window.addEventListener('beforeunload', function (event) {
   clearPageUtil()
});

