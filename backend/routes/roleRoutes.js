const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Endpoint para obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
});

module.exports = router;