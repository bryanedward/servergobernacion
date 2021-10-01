const client = require("../config")

const ctrolequipo = {
    insertCtrolEquipk: async function (req, res) {

        try {
            const { descrip_equipo, fechactrol_equipo,
                firma_equipo, pfced_usuario, pfcod_departament } = req.body
            await client.query(`
                INSERT INTO thistctrolequipo
                (descrip_equipo, fechactrol_equipo, 
                firma_equipo, pfced_usuario, pfcod_departament) 
                VALUES ( '${descrip_equipo}', '${fechactrol_equipo}', '${firma_equipo}', 
                '${pfced_usuario}', '${pfcod_departament}')`, (err, data) => {
                if (err) {
                    res.status(404).send({ message: "not created" })
                } else {
                    res.status(200).send({ message: "created" })
                }
            })
        } catch (error) {
            res.status(404).send({ message: "variables incorrrect" })
        }

    }
}

module.exports = ctrolequipo