import React, { useState, useEffect } from "react";
import axios from 'axios';

function UserComponent() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vistaUsers/readVistaUsers');
        setUsuarios(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
          {/* TABLA INFO USUARIO*/ }
      <div className="col-6">
        <h2>INFORMACION PERSONAL</h2>
        <table className="table table-bordered">
          {/* Sin contenido por ahora */}
        </table>
      </div>
      <div className="col-6">
        <h2>Tabla de Usuarios</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
            <th>ID</th>
             <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Estado del Rol</th>
            <th>Campus</th>
            <th>ID Campus</th>
            <th>ID del Departamento</th>
            <th>Departamento</th>
            <th>ID de la Oficina</th>
            <th>Oficina</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.user_id}>
                 <td>{usuario.user_id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.user_state}</td>
                <td>{usuario.rol}</td> 
                <td>{usuario.password}</td>
                <td>{usuario.rol_state}</td>
                <td>{usuario.campus}</td> 
                <td>{usuario.campus_id}</td> 
                <td>{usuario.departament_id}</td>
                <td>{usuario.departament}</td>
                <td>{usuario.office_id}</td>
                <td>{usuario.office}</td>
              
      
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TABLA AGREGAR USUARIOS*/ }
      <div className="col-6">
        <h2>Agregar usuarios</h2>
        <table className="table table-bordered">
          {/* Sin contenido por ahora */}
        </table>
      </div>
        {/* TABLA EDITAR ROLES*/ }
      <div className="col-6">
        <h2>Editar roles</h2>
        <table className="table table-bordered">
          {/* Sin contenido por ahora */}
        </table>
      </div>
    </div>
  );
}

export default UserComponent;



