const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbconecc } = require('./databases/config')


const port = process.env.port;
//Servidor de express
const app = express();

//configuracion de cords
app.use(cors())

//Base de datos
dbconecc();

app.get('/', (req, res) => {
    res.json({ ok: true, msg: 'Hola mundo' })
});


app.listen(port, () => {
    console.log(`Sevidor en http://localhost:${port}`)
});