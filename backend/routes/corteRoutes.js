const express = require('express');
const router = express.Router();
const Corte = require('../models/Corte.js');

// Endpoint para agregar un corte
router.post('/', async (req, res) => {
  try {
    const { usuario_id, tipo_corte_id, cantidad } = req.body;

    if (!usuario_id || !tipo_corte_id || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newCorte = new Corte({
      usuario_id,
      tipo_corte_id,
      cantidad,
    });

    await newCorte.save();
    res.status(201).json(newCorte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el corte' });
  }
});

// Endpoint para obtener los cortes de un usuario
router.get('/usuario/:usuario_id', async (req, res) => {
    try {
      const { usuario_id } = req.params;
  
      const cortes = await Corte.find({ usuario_id }).populate('tipo_corte_id'); // 👈 Usa populate
      res.json(cortes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los cortes' });
    }
  });

// Endpoint para eliminar un corte
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCorte = await Corte.findByIdAndDelete(id);

    if (!deletedCorte) {
      return res.status(404).json({ error: 'Corte no encontrado' });
    }

    res.json(deletedCorte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el corte' });
  }
});

module.exports = router;