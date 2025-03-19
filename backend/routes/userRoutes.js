const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).populate('roles_id'); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.post('/login', async (req, res) => {
  try {
   
      console.log("Credenciales recibidas:", req.body); // 👈
      const user = await User.findOne({ email }).populate('roles_id');
      console.log("Usuario encontrado:", user);
    const { nombre, apellido, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !telefono || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newUser = new User({
      nombre,
      apellido,
      email,
      telefono,
      password,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});
router.put('/:id/update-role', async (req, res) => {
  const { id } = req.params;
  const { rol_id } = req.body;

  console.log("ID del usuario:", id); // 👈 Log para depuración
  console.log("ID del rol seleccionado:", rol_id); // 👈 Log para depuración

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { roles_id: rol_id },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
});

module.exports = router;
 