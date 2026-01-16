import mongoose from "mongoose";

const addSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    }
})

const addProducts = mongoose.model('Product', addSchema)

export default addProducts;