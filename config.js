const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

connectionString = process.env.DATABASE_URL
var client
//TODO:WHEN IN SERVER IS IN PRODUDCTION U NEED THE SSL IN FALSE(HEROKU)
if (process.env.DEPLOY === "true") {

    client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    })
}else{
    client = new Client({
        connectionString
    })
}

client.connect()

module.exports = client