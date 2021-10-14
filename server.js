const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const loginRouter = require("./router/completeRouter");

const db = require("./db");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(loginRouter);

app.get('/', (req,res) => {
    res.send(`<h1>Admin Api running.</h1>`);
});

db.then(connection => {
    if(connection){
        console.log("Server connected.");
        app.listen(process.env.PORT || 4000,function(){
            console.log("Server listening at port " + process.env.PORT);
        });
    }
}).catch(err => {
    console.log(err);
});