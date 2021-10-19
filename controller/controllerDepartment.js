const client = require("../config")

const departament = {
    getDepartament: async function (req, res) {
        await client.query(`select  
        cod_departament,nomb_departament,descrip_departament 
        from tmaedepartament`, (err, data) => {
            res.status(200).send(data.rows)
        })
    },
    insertDepartment: async function (req, res) {
        const { nomb_departament, descrip_departament } = req.body
        var validate = nomb_departament === undefined || descrip_departament === undefined ? false : true;
        if (validate) {
            await client.query(`INSERT INTO tmaedepartament (nomb_departament,descrip_departament)
            VALUES('${nomb_departament}','${descrip_departament}')`,(err, result) => {
                res.json({message:'create departament'})
            })
        }else{
            res.json({message: 'not create departament'})
        }

    }
}

module.exports = departament