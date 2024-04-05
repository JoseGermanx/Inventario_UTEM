const router = require('express').Router();
const path = require('path');
const express = require('express');

const usuarioRoutes = require('../routes/user.routes');
// const articuloRoutes = require('./services/articulo/artRoutes/artRoutes');
// const categoriaRoutes = require('./services/categoria/categoriaRoutes/categoriaRutasGeneral');
// const departamentoRoutes = require('./services/departamento/departamentoRoutes/departamentoRoutes');
// const sedeRoutes = require('./services/sede/sedeRoutes/sedeRoutes');
// const articuloEstadoRoutes = require('./services/articulo_estado/articuloEstadoRoutes/articuloEstadoRoutes');
// const oficinaRoutes = require('./services/oficina/oficinaRoutes/oficinaRoutes');
// const infGenerator = require('./services/articulo/artRoutes/artGeneratorInfoRoutes');
// const vistaRoutes = require('./services/V_InfoGenerator/V_Routes/V_Routes');
// const vistaUsersRoutes = require('./services/V_Users/V_UserRoutes/V_UserRoutes');


 
// Rutas
router.use('/uploads/articulos/', express.static(path.join('uploads/articulos/')))
router.use('/uploads/public/', express.static(path.join('uploads/public/')))
// router.use('/api/vistaUsers', vistaUsersRoutes);
// router.use('/api/vista', vistaRoutes);
// router.use('/api/informe', infGenerator);
// router.use('/api/articulo', articuloRoutes);
router.use('/usuario', usuarioRoutes);
// router.use('/api/categoria', categoriaRoutes); 
// router.use('/api/departamento', departamentoRoutes);
// router.use('/api/sede', sedeRoutes);
// router.use('/api/articuloEstado', articuloEstadoRoutes);
// router.use('/api/oficina', oficinaRoutes);

// Ruta para errores no especificados
router.use("/*", (req, res) => {
    res.status(400).json({ status: 400, message: "ruta no especificada" });
  });
  
module.exports = router;