const bcrypt = require('bcryptjs');
const client = require('../config');
const jwt = require('jsonwebtoken')

var modelUser = {
    insertUser: async function (req, res) {
        //TODO:create user and one hour for expiration of token
        //FIXME: ADD COLUMN ROL
        try {
            const { pass_usuar, cedul_usuar, nomb_usuar, telef_usuar } = req.body;
            console.log(req.body);
            var passEncript = await bcrypt.hash(pass_usuar, 10);
            var newToken = generateToken(cedul_usuar, pass_usuar)
            await client.query(`INSERT INTO tmaeusuar(cedul_usuar, nomb_usuar, telef_usuar, pass_usuar, token_usuar)
            VALUES('${cedul_usuar}','${nomb_usuar}','${telef_usuar}', '${passEncript}', '${newToken}') RETURNING token_usuar`, (err, data) => {
                if (err) {
                    res.json({ message: "user exists" })
                } else {
                    res.status(200).send(data.rows[0])
                }
            })

        } catch (error) {
            console.log(error);
            res.status(404).send({ message: "variables incorrrect" })
        }
    },
    loginUser: async function (req, res) {
        //TODO:update token of the user 
        try {
            const { pass_usuar, cedul_usuar } = req.body
            var queryUsuario = await client.query(`select pass_usuar from tmaeusuar where cedul_usuar = '${cedul_usuar}'`)
            var validatePass = await bcrypt.compare(pass_usuar, queryUsuario.rows[0].pass_usuar)
            if (validatePass) {
                var updateToken = generateToken(cedul_usuar, pass_usuar);
                await client.query(`update tmaeusuar set token_usuar = '${updateToken}' 
                where cedul_usuar = '${cedul_usuar}' RETURNING token_usuar`, (err, data) => {
                    if (data.rowCount === 0) {
                        res.json({ message: "data incorrect" })
                    } else {
                        res.status(200).send(data.rows[0])
                    }
                })
            } else {
                res.status(200).json({ message: "verific datas" })
            }
        } catch (error) {
            res.status(404).send({ message: "variables incorrrect" })
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