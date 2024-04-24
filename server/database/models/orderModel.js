const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    drinks: {
        type: Array,
        require: true
    },
    burgers: {
        type: Array,
        require: true
    },
    fries: {
        type: Array,
        require: true
    },
    sauces: {
        type: Array,
        require: true
    },
}, { timestamps: true })

const OrderModel = mongoose.model('orders', orderSchema);
module.exports.OrderSchema = OrderModel;