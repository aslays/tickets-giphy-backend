const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const ticketRoutes = require('./routes/ticketRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());

// Endpoint base de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Rutas de los tickets
app.use('/api/tickets', ticketRoutes);

// Sincronización con la base de datos y arranque del servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
