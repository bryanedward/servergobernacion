const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    //validar de
    var token = req.body.token || req.headers["token"];

    if (!token) return res.json({ message: "empyy token" })

    jwt.verify(token, process.env.TOKENKKEY, (err, decoded) => {
        if (err) {
            res.json({
                message: "token expired"
            })
        } else {
            next()
        }
    })

}