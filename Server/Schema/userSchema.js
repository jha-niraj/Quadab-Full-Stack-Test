const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.database_url);

const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String
})
const adminSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String
})

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
    User,
    Admin
}