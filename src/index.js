import './css/style.css'
import {clearComponentContentsUtil, createSiteComponents} from './weatherDisplayController'


const container = document.querySelector("#componentContainer")
const queryBtn = document.querySelector("#locBtn")


queryBtn.addEventListener("click",function(){

   createSiteComponents();
});

//create weather componets

window.addEventListener('DOMContentLoaded', function (event) {
});

