const express = require('express');
const router = express.Router();
const Horario = require('../models/Horario');
// Usar PUT para actualizar o crear horarios
router.put('/guardar-horarios', async (req, res) => {
  try {
    const { usuarios, horarios } = req.body;
    console.log('Datos recibidos:', { usuarios, horarios });

    if (!usuarios || !Array.isArray(usuarios) || !horarios || !Array.isArray(horarios)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const horariosActualizados = [];
    for (const usuario_id of usuarios) {
      for (const horario of horarios) {
        const horarioExistente = await Horario.findOneAndUpdate(
          {
            usuario_id,
            fecha: new Date(horario.date),
          },
          {
            entrada: horario.entrada,
            salida: horario.salida,
            bono_minutos: horario.bonoMinutes,
            bono_monto: horario.bonoAmount,
          },
          { new: true, upsert: true } 
        );
        horariosActualizados.push(horarioExistente);
      }
    }

    res.status(200).json(horariosActualizados);
  } catch (error) {
    console.error('Error al actualizar los horarios:', error);
    res.status(500).json({ error: 'Error al actualizar los horarios' });
  }
});



module.exports = router;