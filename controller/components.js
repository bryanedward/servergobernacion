const client = require("../config")

const component = {
    //TODO:INSERT A NEW COMPONENT (CASE - MEMORY RAM  - SWITCH)
    insertComponent: async function (req, res) {
        const { nombre_component, descrip_component, marca_component,
            model_component, numerser_component, cant_component } = req.body

        await client.query(`
        INSERT INTO tmaecomponent(nombre_component, descrip_component, marca_component, 
        model_component, numerser_component) 
        VALUES ( '${nombre_component}', '${descrip_component}', 
        '${marca_component}', '${model_component}', '${numerser_component}')   
        `, (err, data) => {
            if (err) {
                res.status(404).send({ message: "not created" })
            } else {
                res.status(200).send({ message: "created" })
            }
        })
    },
    //TODO: GET ALL COMPONENTS BUT WITH FILTER (CASE - MEMORY RAM  - SWITCH)
    getComponent:async function (req, res) {
        await client.query(`select  
        nombre_component, descrip_component, marca_component, 
        model_component, numerser_component
        from tmaecomponent`, (err, data) => {
            res.status(200).send(data.rows)
        })
    }
}

module.exports = component