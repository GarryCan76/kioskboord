const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
// const mongoose = require('mongoose');
let db = undefined;

app.use(express.static('client'))
const hostname = 'localhost';

const port = process.env.PORT||8181;

//attach http server to the socket io
const io = require('socket.io')(http);


http.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})

let kiosksConnected = 0;
io.on('connection', socket =>{
    kiosksConnected++
    console.log('kiosks Connected ' + kiosksConnected)
    // https://www.snack-nieuws.nl/wat-kost-een-bezoek-aan-mcdonalds-in-2024/
    // https://www.vrouwers.nl/mcdonalds-prijzen-complete-prijslijst/
    let products = loadJson('server/database/products.json');
    socket.emit('productsItems', products)

    socket.on('disconnect', ()=>{
        kiosksConnected--
        console.log('kiosk disconnected');
    })
});



const fs = require('fs');

function loadJson(filePath) {
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonString);
}
