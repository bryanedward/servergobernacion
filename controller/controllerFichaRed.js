const client = require("../config")

var modelRed = {

    saveReportRed: async function (req, res) {
        //TODO: save report red
        const { cod_fichared, observacion_fichared,
            pfced_usuario, pfcedtec_usuario,
            pfcedjef_usuario, componentesred } = req.body
        var tipo_fichared = "componenteRed"

        await client.query(`
                call guardareportRed(
                    '${cod_fichared}', '${observacion_fichared}',
                    '${tipo_fichared}',
                    '${pfced_usuario}', '${pfcedtec_usuario}',
                    '${pfcedjef_usuario}', '${JSON.stringify(componentesred)}')
                `, (err, data) => {
            if (err) {
                res.status(404).send({ message: err.detail })
            } else {
                res.status(200).send({ message: "created" })
            }
        })
    },

    getAllReportRed: async function (req, res) {
        //TODO:get list of the report red create for users
        await client.query(`select * from componentred('${req.body.cedul_usuar}')`, (err, data) => {
            res.json(data.rows)
        })
    }
}


module.exports = modelRed