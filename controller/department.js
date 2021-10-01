const client = require("../config")

const departament = {
    getDepartament: async function (req, res) {
        await client.query(`select  
        cod_departament,nomb_departament,descrip_departament 
        from tmaedepartament`, (err, data) => {
            res.status(200).send(data.rows)
        })
    }
}

module.exports = departament