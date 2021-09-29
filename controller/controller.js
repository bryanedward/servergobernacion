const bcrypt = require('bcryptjs');
const client = require('../config');
const jwt = require('jsonwebtoken')

var modelUser = {
    //create user and one hour for expiration of token
    insertUser: async function (req, res) {
        const { password, name, cedul } = req.body;
        var passEncript = await bcrypt.hash(password, 10);
        var newToken = generateToken(cedul, name)
        await client.query(`INSERT INTO usuario(ced, nombre, pass, token)
            VALUES('${cedul}','${name}','${passEncript}', '${newToken}') RETURNING *`).then(data => {
                res.send(data.rows[0])
            })
    },
    loginUser: async function (req, res) {
        //update token
        var token = req.body.token || req.headers["token"];
        var jwtCedul = jwt.verify(token, process.env.TOKENKKEY)
        var updateToken = generateToken(jwtCedul.usuarced, jwtCedul.name);
        await client.query(`update usuario set token = '${updateToken}' 
        where ced = '${jwtCedul.usuarced}' and token = '${token}' RETURNING *`,(err, data) => {
            if(data.rowCount === 0){
                res.json({
                    message: "data incorrect"
                })
            }else{
                res.send(data.rows[0])
            }
        })
    }
}

function generateToken(cedul, name) {
    //generate token for one hour
    return token = jwt.sign({ usuarced: cedul, name }, process.env.TOKENKKEY, {
        algorithm: "HS256",
        expiresIn: "1h"
    });
}

module.exports = modelUser