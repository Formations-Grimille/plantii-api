const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const database = readDatabase();

dotenv.config();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/plants', function(req, res) {
    return res.json(database.plants);
});

app.post('/api/plants/search', function(req, res) {
    return res.json({message: "Search"})
});

app.get('/api/user/plants/tasks', function (req, res) {
    return res.json(database.tasks);
});


app.listen(3009, function() {
    console.log("Listening on port 3009");
});

function readDatabase() {
    const raw = fs.readFileSync(path.resolve(__dirname, 'database.json'));
    return JSON.parse(raw);
}