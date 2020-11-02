var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("./index");
var cors = require("cors");
var authenticate = require("./middleware/authenticate.middleware");
var authRoute = require("./user/auth.route");
var userRoute = require("./user/user.route");
var faceDetRoute = require("./faceDetection/faceDet.route");

require("./db");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/models", express.static(path.join(__dirname, "faceDetection/model")));
// app.use('/', (req,res,next)=>{
//   res.sendFile(path.join(__dirname, "public/index.html"))
// })
app.use("/auth", authRoute);
app.use("/user", authenticate, userRoute);
app.use("/emotion", faceDetRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.status(err.status || 400);
    res.json({
        message: err.message,
        error: err,
    });
});



app.listen(8000, function(err, connected) {
    if (err) console.log("error connecting to server");
    else console.log("server connected to port", 8000);
});
module.exports = app;