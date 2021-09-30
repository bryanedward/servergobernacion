const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    //validate token 
    var token = req.body.token || req.headers["token"];

    if (!token) return res.json({ message: "empty token" })

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