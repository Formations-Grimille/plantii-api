const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/plants', function(req, res) {
    return res.json({message: "Plants"})
});

app.get('/api/user/plants/tasks', function (req, res) {
    return res.json({message: "Tasks"})
});

app.post('/api/plants/search', function(req, res) {
    return res.json({message: "Search"})
});


app.listen(3009, function() {
    console.log("Listening on port 3009");
});