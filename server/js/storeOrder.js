const {OrderSchema} = require('../database/models/orderModel')
const mongoose = require('mongoose');

async function storeOrder (socket){
    console.log('ok')
    // const order = new OrderSchema({
    //     orderId: 2334,
    //     status: "paid",
    //     drinks: [
    //         {
    //             "name": "Sprite Zero",
    //             "KJ": 20,
    //             "Kcal": 4,
    //             "image": "./assets/product_images/gui_nl_main_medium_sprite_product-header-desktop.jpg",
    //             "isCup": true,
    //             "available": true,
    //             "size":"L",
    //             "quantity": 2
    //         },{
    //             "name": "Fanta",
    //             "KJ": 399,
    //             "Kcal": 93,
    //             "image": "./assets/product_images/th-FantaMedium_product-header-desktop.jpg",
    //             "isCup": true,
    //             "available": true,
    //             "size":"M",
    //             "quantity": 2
    //         }
    //     ],
    //     burgers: [
    //         {
    //             "name": "Big Mac",
    //             "KJ": 2.191,
    //             "Kcal": 524,
    //             "price": 5.95,
    //             "image": "./assets/product_images/ngk_gui_nl_main_big_mac_product-header-desktop.jpg",
    //             "available": true,
    //             "quantity": 2
    //         },
    //         {
    //             "name": "Single Quarter Pounder",
    //             "KJ": 2.199,
    //             "Kcal": 526,
    //             "price": 5.95,
    //             "image": "./assets/product_images/gui_nl_main_quarter-pounder_product-header-desktop.jpg",
    //             "available": true,
    //             "quantity": 1
    //
    //         },{
    //             "name": "McChicken",
    //             "KJ": 1.960,
    //             "Kcal": 468,
    //             "price": 5.05,
    //             "image": "./assets/product_images/ngk_gui_nl_main_app_mcchicken_product-header-desktop.jpg",
    //             "available": true,
    //             "quantity": 1
    //         },{
    //             "name": "Spicy McChicken",
    //             "KJ": 2.158,
    //             "Kcal": 516,
    //             "price": 5.05,
    //             "image": "./assets/product_images/ngk_gui_nl_main_Spicy McChicken New_product-header-desktop.jpg",
    //             "available": true,
    //             "quantity": 1
    //         }
    //     ],
    //     fries: [
    //         {
    //             "name": "Franse Frietjes Groot",
    //             "KJ": 1.815,
    //             "Kcal": 434,
    //             "price": 3.60,
    //             "image": "./assets/product_images/gui_nl_main_frites_large_product-header-desktop.jpg",
    //             "available": true,
    //             "quantity":4
    //         }
    //     ],
    //     sauces: [],
    // });
    // await order.save()
    //     .then((result)=>{
    //         socket.send(result)
    //     })
}

module.exports.sendOrder = storeOrder;