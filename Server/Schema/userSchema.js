const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.database_url);

const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ]
})
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})
const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: Number
})

const adminSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String
})


const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
    User,
    Admin,
    Product,
    Cart
}