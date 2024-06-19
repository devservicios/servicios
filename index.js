const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const scrapeDniInfo = require('./scrapeDni'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '192.168.1.29';

 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"));

 

app.get('/datos', (req, res) => {
  // Simulando datos de ejemplo
  const data = {
      titular: 'Juan',
      alias: 'pijita.mp',
      cbu: '000000221212',
      email:'furtive.apk@gmail.com',
      pagina:'https://bit.ly/furtive-oficial'


  };
  res.json(data); // Devuelve los datos en formato JSON
});

app.get('/getDni/:dni', async (req, res) => {
  const dni = req.params.dni;

  try {
      const data = await scrapeDniInfo(dni);
      res.json(data);
       
  } catch (error) {
      console.error('Error al obtener la información del DNI:', error);
      res.status(500).json({ error: 'Error al obtener la información del DNI' });
  }
});



// Middleware de error para manejar errores no capturados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
