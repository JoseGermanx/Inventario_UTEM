const db = require('../database/conexion')

module.exports = {
    listar() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM usuario`,
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    crear() {
    },
    editarerUserPassword(id) {
       
    },
    editarUserRol(id) {
    },
    editarUser(id) {
    },
    getUserInfoById(id) {
    },
    loginUser(id){
    }
}