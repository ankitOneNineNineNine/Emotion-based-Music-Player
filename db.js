const mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/MusicStreamer'

mongoose.connect(dbURI, {useUnifiedTopology:true, useNewUrlParser: true})
.then(connected=>console.log('db connected'))
.catch(error=>console.log('error conecting to db'))