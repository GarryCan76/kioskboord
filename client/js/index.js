const socket = io();
import Jsml from './jsml.js';
const jsml = new Jsml();
socket.on('connect', ()=> {
    socket.on('productsItems', productItems=>{
        let beef = productItems.drinks;

        beef.map(beefBurger=>{
            jsml.createHTMLElement('img', document.body, false, {'src':beefBurger.image})
            jsml.createHTMLElement('p', document.body, beefBurger.name)
            jsml.createHTMLElement('p', document.body, beefBurger.Kcal)
        })
    })
})