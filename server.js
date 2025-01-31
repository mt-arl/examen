const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const userRoutes2 = require('./routes/userRoutes2');

const microphoneRoutes = require('./routes/microphoneRoutes'); 

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api/vinil', userRoutes2);
app.use('/api/users', userRoutes);
app.use('/api/microphones', microphoneRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
