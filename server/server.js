const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const fs = require('fs');
const {json} = require("express");
const {sendOrder} = require("./js/storeOrder.js")
const mongoose = require('mongoose');
let db = undefined;

app.use(express.static('client'))
const hostname = '10.52.4.30';

const port = process.env.PORT||8181;

//attach http server to the socket io
const io = require('socket.io')(http);

//connect to database
const dbURI = 'mongodb+srv://garryenderson76:S6vq0QCqnFMPktaP@web-game.xt7azp0.mongodb.net/game-data?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => http.listen(port, hostname, ()=>{
        db = result;
        console.log(`Server running at http://${hostname}:${port}`)
    }))
    .catch((err) => console.log(err))




let orders = loadJson('server/database/orders.json')
let kiosksConnected = 0;
io.on('connection', socket =>{
    kiosksConnected++
    console.log('kiosks Connected ' + kiosksConnected)
    // https://www.snack-nieuws.nl/wat-kost-een-bezoek-aan-mcdonalds-in-2024/
    // https://www.vrouwers.nl/mcdonalds-prijzen-complete-prijslijst/
    let products = loadJson('server/database/products.json');
    socket.emit('productsItems', products)
    socket.emit('orders', orders)



    socket.on('disconnect', ()=>{
        kiosksConnected--
        console.log('kiosk disconnected');
    })
});


function loadJson(filePath) {
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonString);
}
