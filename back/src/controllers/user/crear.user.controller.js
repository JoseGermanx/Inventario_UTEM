
const { db } = require("../../../utils/utils.helpers");
const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
    try {
      // Datos del cuerpo de la solicitud
      const { username, email, campus_id, rol_id, user_state, password } =
        req.body;

      // Verificar si todos los campos necesarios están
      //tuve que cambiar user_state para que valide que tenga un valor porque si solo compruebo si es falso no me acepta el 0 pero con undefinied sirve aunque hay que verificar que no sea null
      if (
        !username ||
        !email ||
        !rol_id ||
        user_state === undefined ||
        user_state === null ||
        !password ||
        !campus_id
      ) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios",
        });
      }

      // Verificar si campus_id existe en la tabla sede
      const checkCampusQuery =
        "SELECT COUNT(*) AS count FROM sede WHERE campus_id = ?";
      const [campusCheckResult] = await db
        .promise()
        .query(checkCampusQuery, [campus_id]);

      if (campusCheckResult[0].count === 0) {
        return res.status(400).json({
          status: 400,
          error: "El campus_id proporcionado no existe en la tabla sede",
        });
      }

      // Iniciar una transacción
      await db.promise().beginTransaction();

      try {
        const salt = bcrypt.genSaltSync();

        const passWordEncripted = bcrypt.hashSync(password, salt);

        // Consulta SQL para insertar un nuevo usuario
        const insertUserQuery =
          "INSERT INTO usuario (username, email, rol_id, user_state, password, campus_id) VALUES (?, ?, ?, ?, ?, ?)";
        const userCreateData = [
          username,
          email,
          rol_id,
          user_state,
          passWordEncripted,
          campus_id,
        ];

        // Ejecutar la consulta con los valores proporcionados
        const [resultDB] = await db
          .promise()
          .query(insertUserQuery, userCreateData);

        // Confirmar la transacción
        await db.promise().commit();

        res.status(200).json({
          status: 200,
          data: {
            message: "Usuario agregado con éxito",
            user_id: resultDB.insertId,
          },
        });
      } catch (error) {
        // Revertir la transacción en caso de error
        await db.promise().rollback();

        console.error(error);
        res.status(500).json({
          status: 500,
          error: "Error interno del servidor",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor",
      });
    }
  }

  module.exports = { crearUsuario };