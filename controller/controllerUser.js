const bcrypt = require('bcryptjs');
const client = require('../config');
const jwt = require('jsonwebtoken')

var modelUser = {
    insertUser: async function (req, res) {
        //TODO:create user and one hour for expiration of token
        //FIXME: ADD COLUMN ROL
        const { pass, nombre, cedul, telef } = req.body;
        if (pass.trim().length === 0 ||
            nombre.trim().length === 0 ||
            cedul.trim().length === 0 || telef.trim().length === 0) {
            res.json({ message: "campos faltantes" })
        } else {
            var passEncript = await bcrypt.hash(pass, 10);
            var newToken = generateToken(cedul, pass)
            await client.query(`INSERT INTO tmaeusuar(cedul_usuar, nomb_usuar, telef_usuar, pass_usuar, token_usuar)
                VALUES('${cedul}','${nombre}','${telef}', '${passEncript}', '${newToken}') RETURNING *`, (err, data) => {
                if (err) {
                    res.json({ message: "user exists" })
                } else {
                    res.status(200).send(data.rows[0])
                }
            })
        }
    },
    loginUser: async function (req, res) {
        //TODO:update token of the user 
        const { pass, cedul } = req.body
        var queryUsuario = await client.query(`select pass_usuar from tmaeusuar 
        where cedul_usuar = '${cedul}'`)

        var validatePass = await bcrypt.compare(pass, queryUsuario.rows[0].pass_usuar)

        if (validatePass) {
            var updateToken = generateToken(cedul, pass);
            await client.query(`update tmaeusuar set token_usuar = '${updateToken}' 
            where cedul_usuar = '${cedul}' RETURNING *`, (err, data) => {
                if (data.rowCount === 0) {
                    res.json({ message: "data incorrect" })
                } else {
                    res.status(200).send(data.rows[0])
                }
            })
        } else {
            res.status(200).json({ message: "verific datas" })
        }
    }
}

function generateToken(cedul, pass) {
    //generate token for one hour
    return token = jwt.sign({ usuarced: cedul, pass }, process.env.TOKENKKEY, {
        algorithm: "HS256",
        expiresIn: "90s"
    });
}

module.exports = modelUser