// userController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');


const userController = {



       getVinilById: async (req, res) => {
            try {
                const [user] = await pool.query(
                    'SELECT id, model, brand, description, origin FROM vinyl WHERE id = ?',
                    [req.params.id]
                );
    
                if (user.length === 0) {
                    return res.status(404).json({ message: 'Vinyl not found' });
                }
    
                res.json(user[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching vinil', error: error.message });
            }
        },

    

   
     //deleteVinil
    deleteVinil: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },

   
};

module.exports = userController;createUser: async (req, res) => {
    try {
        const { cedula, first_name, last_name, address, phone, email, password, gender, google_id } = req.body;
        const defaultRoleId = 2; // Define el ID de rol por defecto (por ejemplo, 2 para "usuario")

        // Validar campos requeridos
        if (!cedula || !first_name || !last_name || !email || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Por favor complete todos los campos requeridos (cédula, nombre, apellido, email, contraseña, género)'
            });
        }

        // Verificar si el email o la cédula ya existen
        const [existingUser] = await pool.query(
            'SELECT id FROM users WHERE email = ? OR cedula = ?',
            [email, cedula]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un usuario con este email o cédula'
            });
        }

        // Insertar el usuario en la base de datos
        const [result] = await pool.query(
            `INSERT INTO users (cedula, first_name, last_name, address, phone, email, password, gender, id_rol, google_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cedula,
                first_name,
                last_name,
                address || null, // Si no hay dirección, insertar como NULL
                phone || null,   // Si no hay teléfono, insertar como NULL
                email,
                password,
                gender,
                defaultRoleId,   // Rol por defecto
                google_id || null // Si el usuario viene de Google, almacenar su google_id
            ]
        );

        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            user: {
                id: result.insertId,
                cedula,
                first_name,
                last_name,
                email,
                role: defaultRoleId
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};
