var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var mongoose = require('mongoose');
var cors = require('cors');
dotenv.config({ path: "../.env" })
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


async function connectDB() {
    try {
        console.log("Connecting to MongoDB")
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection failed", error)
    }
}

connectDB()
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);

module.exports = app;
