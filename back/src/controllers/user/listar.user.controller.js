const userModel = require("../../models/user.model");

const listarUsuarios = async (req, res) => {
  try {
    const results = await userModel.listar();

    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        mensaje: "No se encontraron usuarios",
      });
    }

    // Mapear los resultados
    const userList = results.map((user) => ({
      user_id: user.user_id,
      username: user.username,
      password: user.password,
      email: user.email,
      campus_id: user.campus_id,
      rol_id: user.rol_id,
      user_state: user.user_state,
    }));

    res.status(200).json({
      status: 200,
      data: userList,
      mensaje: "Lista de usuarios obtenida correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Error interno del servidor al obtener la lista de usuarios",
    });
  }
};

module.exports = { listarUsuarios };
