const client = require("../config")

const component = {
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
    },
    //TODO: GET ALL COMPONENTS BUT WITH FILTER (CASE - MEMORY RAM  - SWITCH)
    getComponent: async function (req, res) {
        await client.query(`select  
        nombre_component, descrip_component, marca_component, 
        model_component, numerser_component
        from tmaecomponent`, (err, data) => {
            res.status(200).send(data.rows)
        })
    },

    getOneComponent: async function (req, res) {
        //TODO: get one component for the cedul
      await client.query(`select * from consultComponent('1315554475')`,(err, data) => {
          res.send(data.rows)
      })  
    }
}

module.exports = component