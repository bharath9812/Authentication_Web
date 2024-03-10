const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // to not hash every time even why logging in
    this.password = await bcrypt.hash(this.password,12)
    next();
}) 

module.exports = mongoose.model('User', userSchema);

