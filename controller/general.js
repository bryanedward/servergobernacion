const client = require("../config")

const general = {

    //TODO:IMPLEMENTACION DE UNA VISTA
    getGeneral: async function (req, res) {
        await client.query(
            `select * from vtmaegeneral`, (err, data) => {
            res.status(200).send(data.rows)
        })
    }
}


module.exports = general