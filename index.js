require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
const { response } = require('express');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json())

// Base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'))


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto http://localhost:' + process.env.PORT);
});