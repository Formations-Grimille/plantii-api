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

app.post('/api/plant', function(req, res) {
    const plant = getPlantById(req.body.id);

    return res.json({plant});
});

app.post('/auth/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if(username === "admin@plantii.fr" && password === "admin") {// Testing purpose obviously
        return res.json({
            success: true,
            message: "Vous êtes maintenant connectés à Plantii ! 🌱",
        })
    }
    return res.json({
        success: false,
        message: "Identifiant ou mot de passe incorrect."
    });
}),

app.post('/api/plants/search', function(req, res) {
    const results = searchPlant(req.body.search);

    return res.json({results});
});

app.get('/api/user/plants/tasks', function (req, res) {
    const tasks = database.tasks;

    for(let i = 0; i < tasks.length; i++) {
        tasks[i].plant = getPlantById(tasks[i].plant);
    }
    
    return res.json(tasks);
});


app.listen(3009, function() {
    console.log("Listening on port 3009");
});

function readDatabase() {
    const raw = fs.readFileSync(path.resolve(__dirname, 'database.json'));
    return JSON.parse(raw);
}

function searchPlant(haystack) {
    return database.plants.filter(plant => plant.name.toLowerCase().startsWith(haystack));
}

function getPlantById(id) {
    const idCast = Number.parseInt(id);
    const results = database.plants.filter(plant => plant.id === idCast);

    return results === null ? null : results[0];
}