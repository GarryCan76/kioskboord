const socket = io();
import Jsml from './jsml.js';
const jsml = new Jsml();
socket.on('connect', ()=> {
    socket.on('productsItems', productItems=>{
        console.log(productItems.burgers.beef[0].image)
        jsml.createHTMLElement('img', document.body, false, {'src':productItems.burgers.beef[0].image})
    })
})