const express = require('express')
const app = express()
const routesUrl = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect("mongodb://wundereats:HkwH9OfzuxZYVa0QCIboBZC6eaFmH2FngwUNHEuroPHl1zAqGKxqH9s8xDtSpPhwaWOFrxp6J8F1mbi9dMbm9w==@wundereats.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@wundereats@", () => {
        console.log("connected to database.")
    });

app.use(express.json())
app.use(cors())
app.use('/api', routesUrl)
app.listen(4000, () => console.log("server is up and running"))
