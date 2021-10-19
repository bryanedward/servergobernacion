const client = require("../config")

const general = {

    insertGeneral: async function name(req, res) {
        try {

            const { cod_equipo, descrip_equipo, fechactrol_equipo,
                firma_equipo, pfced_usuario, pfcod_departament,
                componentes, pfcod_proveed, nomb_soft, descrip_soft, licencia_soft
            } = req.body
            await client.query(`
            call guardarcompone(
                '${cod_equipo}','${descrip_equipo}','${fechactrol_equipo}', 
                '${firma_equipo}','${pfced_usuario}',  ${pfcod_departament},
                '${JSON.stringify(componentes)}', ${pfcod_proveed} ,'${nomb_soft}', '${descrip_soft}' ,'${licencia_soft}')
            `, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ message: "type data incorrect" })
                } else {
                    res.status(200).send({ message: "created" })
                }
            })
        } catch (error) {
            res.status(404).send({ message: "data incomplete" })
        }
    },

    //TODO:IMPLEMENTACION DE UNA VISTA
    getGeneral: async function (req, res) {
        const { cedul_usuar, cod_equipo } = req.body
        await client.query(
            `select thistctrolequipo.cod_equipo, 
            tmaeusuar.cedul_usuar, tmaeusuar.nomb_usuar, 
            tmaedepartament.nomb_departament, thistproveed.nombre_proveed,
                thistproveed.fechadquis_proveed, tmaecomponent.fechverf_component
                from thistctrolequipo 
                inner join tmaedepartament on tmaedepartament.cod_departament = thistctrolequipo.pfcod_departament
                inner join tmaeusuar on tmaeusuar.cedul_usuar = thistctrolequipo.pfced_usuario
                inner join tmaecomponent on tmaecomponent.pfcod_equipo = thistctrolequipo.cod_equipo
                inner join thistproveed on thistproveed.cod_proveed = tmaecomponent.pfcod_proveed
                WHERE tmaeusuar.cedul_usuar = '${cedul_usuar}' and
                thistctrolequipo.cod_equipo = '${cod_equipo}'`, (err, data) => {
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