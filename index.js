const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'asecrettobekeptasone' }));


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

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();

}




app.get('/', (req, res) => {
    res.send('Home page');
})

app.post('/login', async (req, res) => {
    // res.render('login');
    const { password, username } = req.body;
    const u = await User.findOne({ username });
    const validPwd = await bcrypt.compare(password, u.password);
    if (validPwd) {
        req.session.user_id = u._id
        // res.send("Whelcome");
        res.redirect('/secret');
    }
    else {
        res.redirect('/login');
    }

    
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    //we can just destroy the session by 
    req.session.destroy();
    res.redirect('/login');
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
    // res.send(hash);
    res.send('Hompage');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.get('/secret',requireLogin, (req, res) => {
    res.render('secret')
})

app.get('/topsecret', requireLogin,(req, res) => {
    res.send('heloa')
})
app.listen(3000, () => {
    console.log('Workin at 3000 boss');
})