const client = require("../config")

const component = {
    //FIXME:SIN UN POSBILE ELIMIMNACION
    //TODO:INSERT A NEW COMPONENT (CASE - MEMORY RAM  - SWITCH)
    insertComponent: async function (req, res) {
        const { nombre_component, descrip_component, marca_component,
            model_component, numerser_component, fechverf_component,
            pfcod_proveed, pfcod_equipo } = req.body

        await client.query(`
        INSERT INTO tmaecomponent(nombre_component, descrip_component, marca_component, 
            model_component, numerser_component, fechverf_component, 
            pfcod_proveed, pfcod_equipo) 
        VALUES ( '${nombre_component}', '${descrip_component}', 
        '${marca_component}', '${model_component}', '${numerser_component}',
        '${fechverf_component}', '${pfcod_proveed}', '${pfcod_equipo}')   
        `, (err, data) => {
            if (err) {
                res.status(404).send({ message: "not created" })
            } else {
                res.status(200).send({ message: "created" })
            }
        })
    }
}

module.exports = component