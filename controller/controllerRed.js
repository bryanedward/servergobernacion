const client = require("../config")

var modelRed = {

    saveReportRed: async function (req, res) {
        try {
            const { cod_fichared, observacion_fichared,
                pfced_usuario, pfcedtec_usuario,
                pfcedjef_usuario, componentesred } = req.body
            await client.query(`
                call guardareportRed(
                    '${cod_fichared}', '${observacion_fichared}',
                    '${pfced_usuario}', '${pfcedtec_usuario}',
                    '${pfcedjef_usuario}', '${JSON.stringify(componentesred)}')
                `, (err, data) => {
                if (err) {
                    res.status(404).send({ message: err.detail })
                } else {
                    res.status(200).send({ message: "created" })
                }
            })

        } catch (error) {

        }
    }
}


module.exports = modelRed