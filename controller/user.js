const client = require("../config")

const user = {
    getUser: async function (req, res) {
        await client.query(`select  
        cedul_usuar,nomb_usuar,telef_usuar,rol_usuar 
        from tmaeusuar`, (err, data) => {
            res.status(200).send(data.rows)
        })
    }
}

module.exports = user