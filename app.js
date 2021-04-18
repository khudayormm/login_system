const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//DB connect
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log('MongoDB connected!') })
.catch((err) => { console.log(err) });

//view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/', require('./routes/home'));
app.use('/', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));

//PORT settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`PORT ${PORT} is running...`)
});

