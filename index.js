const PORT = process.env.PORT || 3000
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const responseTime = require('response-time')
const router = express.Router();

let corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors());
app.options("*", cors()); // include before other routes

app.use(function(req, res, next) { // kolpa magkiorika poy de ta kserw
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

app.use(responseTime(function(req, res, time) {
    console.log(req.url)
}))

require('./controllers/studentController')(router)
require('./controllers/classController')(router)
app.use(router)

app.listen(PORT, () => console.log('server running on port http://localhost:' + PORT))