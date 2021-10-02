const { verify } = require("jsonwebtoken");
const client = require('../config');

var company = {

    //FIXME: VALIDAR USUARIO
    insertVendor: async function (req, res) {
        const {nombre_proveed, descrip_proveed, fechcompr_proveed} = req.body

        await client.query(`INSERT INTO thistproveed(nombre_proveed, descrip_proveed, 
            fechadquis_proveed) VALUES ('${nombre_proveed}', '${descrip_proveed}', 
        '${fechcompr_proveed}')`, (err, data) => {
            if(err){
                res.status(404).json({message: "err"})
            }else{
                res.status(200).json({message: "create"})
            }
        })

    },
    getVendor : async function (req, res) {
        //TODO: get all the companies
        await client.query('select * from thistproveed', (err, data) => {
            res.status(200).send(data.rows)
        })
    }
}

module.exports = company