const bcrypt = require('bcryptjs');
const client = require('../config');

var modelAttendance = {

    getAllAttendance : async function (req,res) {
        await client.query(`select tmaeusuar.cedul_usuar, nomb_usuar, telef_usuar, rol_usuar, fecha_asistencia 
        from tmaeusuar inner join thistasistencia 
        on thistasistencia.cedul_usuar = tmaeusuar.cedul_usuar`,(err, data) => {
            console.log(data);
        })
    }
}

module.exports = modelAttendance