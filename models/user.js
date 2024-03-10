const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cant be black']
    },
    password: {
        type: String,
        required: [true, 'pwd cant be black']
    }
})

module.exports = mongoose.model('User', userSchema);