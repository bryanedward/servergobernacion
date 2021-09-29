const express = require('express')
const cors = require('cors')
const router = require('./route/route')
const app = express()
const port = process.env.PORT || process.env.API_PORT

app.use(express.json())
app.use(cors())
app.use(router)
app.listen(port, () => console.log(`connect ${port}` ))