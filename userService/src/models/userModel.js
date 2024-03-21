const mongoose = require('../services/dbConection');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    telf: {type: Number},
    password: {type: String, required: true}
})

const User = mongoose.model('User', userSchema);
module.exports = User;