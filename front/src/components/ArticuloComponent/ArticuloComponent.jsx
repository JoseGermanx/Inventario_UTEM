import React, { useState, useEffect } from "react";
import AgregarArticulo from './AgregarArticulo';
import axios from 'axios';
import moment from 'moment';

function ArticuloComponent() {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [vistaData, setVistaData] = useState([]); // Estado para almacenar los datos de la vista

  const toggleModal = () => {
    setModalVisible(!modalVisible); // Cambia el estado de visibilidad del modal
    console.log("ha pasado algo");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC', // Específicamente para fechas en formato UTC
    };
    return date.toLocaleDateString('es-CL', options); // Cambia 'es-CL' al locale que necesites
  };
  

  const darDeBaja = (id_articulo) => {
    // Lógica para dar de baja el artículo
    console.log("Dando de baja el artículo con ID:", id_articulo);
  };

  const Editar = (id_articulo) => {
    // Lógica para editar el artículo
    console.log("Editando el artículo con ID:", id_articulo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vista/readVista');
        setVistaData(response.data.data); // Aquí asumimos que los datos están en response.data.data
        console.log(response.data.data)
      } catch (error) {
        console.error('Error al obtener datos de la vista:', error);
      }
    };

    fetchData();
  }, []);


  
  



  return (
    <div>
      <h1>Articulo Component</h1>
 
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Año</th>
            <th>Dimensión</th>
            <th>Número</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Glosa</th>
            <th>Fecha ingreso</th>
            <th>Campus</th>
            <th>Departamento</th>
            <th>Oficina</th>
            <th>Categoria</th>
            <th>imagen articulo</th>
            <th>Articulo estado</th>
            <th className="acciones-header" style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>Acciones</span> 
              <AgregarArticulo
                modalVisible={modalVisible}
                toggleModal={toggleModal}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {vistaData.map((item) => (
            <tr key={item.ID}>
            <td>{item.anio}</td>
              <td>{item.dimension}</td>
              <td>{item.art_num}</td>
              <td>{item.art_nombre}</td>
              <td>{item.art_codigo}</td>
              <td>{item.art_glosa}</td>
              <td>{formatDate(item.art_Ingreso)}</td>
              <td>{item.campus}</td>
              <td>{item.departament}</td>
              <td>{item.office}</td>
              <td>{item.categoria}</td>
              <td>{item.art_image_path}</td>
              <td>{item.articulo_estado}</td>
              <td>
                <button className="btn btn-danger" style={{ marginRight: "20px" }} onClick={() => darDeBaja(item.id_articulo)}>Dar de Baja</button>
                <button className="btn btn-warning" style={{ marginRight: "20px" }} onClick={() => Editar(item.id_articulo)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticuloComponent;