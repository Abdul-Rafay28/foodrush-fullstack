import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    food: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
    },

    price: {
        type: Number,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    
    createdAt:{
        type: Date,
        default: Date.now,
    },
})


const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;