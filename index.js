const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Configuración específica de CORS
app.use(cors({
    origin: 'http://localhost:3030', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/vinil', userRoutes);




// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
