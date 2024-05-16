const socket = io();
import Jsml from './jsml.js';
const jsml = new Jsml();
socket.on('connect', ()=> {
    socket.on('orders', orders=>{
        jsml.deleteChildren(document.body,)
        orders.map(order=>{


            // let orderElement = jsml.createHTMLElement('div', document.body, false, {"classList":"orderElement"})
            // jsml.createHTMLElement('p', orderElement, "Order id: " + order.orderId, {"classList":"orderId"})
            // displayProduct(order, orderElement, 'drinks')
            // displayProduct(order, orderElement, 'burgers')
            // displayProduct(order, orderElement, 'fries')
            // displayProduct(order, orderElement, 'sauces')


            if (order.status === "paid"){
                jsml.createHTMLElement('p', orderElement, "Paid", {"classList":"orderPaid"})
            }
        })

    });

})

function displayProduct(order, orderElement, productType){
    let productTypeElement = jsml.createHTMLElement('div', orderElement, false, {"classList":"productTypeElement"})
    order.products[productType].map(product=>{
        jsml.createHTMLElement('p', productTypeElement, product.quantity + " " + product.name)
    })

}