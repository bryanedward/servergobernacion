const client = require("../config")

var modelCloseRed = {

    saveReportCerradRed: async function (req, res) {
        const { cod_fichared, observacion_fichared,
            pfced_usuario, pfcedtec_usuario,
            pfcedjef_usuario, componentesred } = req.body
        var tipo_fichared = "circuitocerrado"
        await client.query(`
            call guardarreportcerradored(
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

    }
}

module.exports = modelCloseRed