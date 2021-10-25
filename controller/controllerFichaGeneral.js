const client = require("../config")

const general = {

    saveReportComputer: async function (req, res) {
        //TODO: save report of the computers
        try {
            const { cod_equipo, descrip_equipo, fechactrol_equipo,
                firma_equipo, grupoctrol_equipo,pfced_usuario, pfcod_departament,
                componentes, pfcod_proveed, nomb_soft, descrip_soft, licencia_soft
            } = req.body

            await client.query(`
            call guardareportequipop(
                '${cod_equipo}','${descrip_equipo}','${fechactrol_equipo}', 
                '${firma_equipo}', '${grupoctrol_equipo}','${pfced_usuario}',  ${pfcod_departament},
                '${JSON.stringify(componentes)}', ${pfcod_proveed} ,'${nomb_soft}', '${descrip_soft}' ,'${licencia_soft}')
            `, (err, data) => {
                if (err) {
                    res.status(404).send({ message: err.detail })
                } else {
                    res.status(200).send({ message: "created" })
                }
            })
        } catch (error) {
            res.status(404).send({ message: "data incomplete" })
        }
    },

    getAllReportComputer: async function (req, res) {
        //TODO: list of report of one user
        const { cedul_usuar, cod_equipo } = req.body
        await client.query(
            `
            select distinct thistctrolequipo.cod_equipo, thistctrolequipo.grupoctrol_equipo, 
            tmaeusuar.cedul_usuar, tmaeusuar.nomb_usuar, 
            tmaedepartament.nomb_departament, thistproveed.nombre_proveed,
                thistproveed.fechadquis_proveed, tmaecomponent.fechverf_component
                from thistctrolequipo 
                inner join tmaedepartament on tmaedepartament.cod_departament = thistctrolequipo.pfcod_departament
                inner join tmaeusuar on tmaeusuar.cedul_usuar = thistctrolequipo.pfced_usuario
                inner join tmaecomponent on tmaecomponent.pfcod_equipo = thistctrolequipo.cod_equipo
                inner join thistproveed on thistproveed.cod_proveed = tmaecomponent.pfcod_proveed
                WHERE tmaeusuar.cedul_usuar = '${cedul_usuar}' AND
                thistctrolequipo.cod_equipo = '${cod_equipo}'
				 limit 1
            `, (err, data) => {
            if (err) {
                console.log(err);
                res.status(404).send({ message: "type data incorrect" })
            } else {
                res.status(200).send(data.rows)
            }
        })
    }
}


module.exports = general