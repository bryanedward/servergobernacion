const {Client} = require('pg')
const dotenv = require('dotenv')
dotenv.config()

connectionString = process.env.DATABASE_URL

const client = new Client({
    connectionString
})

client.connect()

module.exports = client