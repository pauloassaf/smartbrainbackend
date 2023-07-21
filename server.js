const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'zxc',
      database : 'smart-brain'
    }
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



app.get("/", (req,res) => {res.send("sucess");})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, knex, bcrypt, salt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt, salt)})

app.get("/profile/:id", (req,res) => {profile.handleProfile(req, res, knex)})

app.put('/image', (req,res) => {image.handleImage(req,res,knex)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log("app is running on port 3000")
});