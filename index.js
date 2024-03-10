const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


const bcrypt = require('bcrypt');


main()

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/loginDemo')
        .then(() => {
            console.log('MONGO connection is open') 
        })
        .catch(err => {
            console.log('MONGO connection error', err);
    })
} 




app.get('/', (req, res) => {
    res.send('Home page');
})

app.post('/register', async (req, res) => {
    // res.render('register');
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.send(hash);
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.get('/secret', (req, res) => {
    res.send('you cant access')
})
app.listen(3000, () => {
    console.log('Workin at 3000 boss');
})