const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema({
  abogado_id: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Por favor, ingresa un email válido"] // Validación de email
  },
  fecha: { type: Date, required: true },
  tipo: { type: String, required: true }, // "justificada", "injustificada"
  motivo: { type: String, required: true },
  documento_respaldo: { type: String },
});

const Absence = mongoose.model("Absence", AbsenceSchema);

module.exports = {
  serviceGetAbsence: async (req, res) => {
    try {
      const absences = await Absence.find();
      res.json(absences);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  serviceDeleteAbsences: async (req, res) => {
    try {
        const { abogado_id } = req.body;
        console.log("Request body:", req.body);
        
        if (!abogado_id) {
            return res.status(400).json({ error: "Falta el abogado_id" });
        }

        const deletedAbsence = await Absence.findOneAndDelete({ abogado_id });

        if (!deletedAbsence) {
            return res.status(404).json({ error: "Ausencia no encontrada" });
        }

        res.json({ message: "Ausencia eliminada correctamente", deletedAbsence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},


serviceUpdateAbsence: async (req, res) => {
  try {
    const { abogado_id } = req.params; // Obtener abogado_id desde la URL
    const updateData = req.body; // Obtener datos a actualizar
    
    // Validar que abogado_id esté presente
    if (!abogado_id) {
      return res.status(400).json({ error: "Falta el abogado_id" });
    }

    // Convertir la fecha si está presente
    if (updateData.fecha) {
      updateData.fecha = new Date(updateData.fecha);
    }

    // Buscar y actualizar la ausencia por abogado_id
    const updatedAbsence = await Absence.findOneAndUpdate(
      { abogado_id }, // Buscar por abogado_id
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAbsence) {
      return res.status(404).json({ error: "Ausencia no encontrada" });
    }

    res.json({ 
      message: "Ausencia actualizada correctamente", 
      absence: updatedAbsence 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},



  serviceInsertAbsences: async (req, res) => {
    try {
      const { abogado_id, fecha, tipo, motivo, documento_respaldo, validado_por } = req.body;

      // Validar que abogado_id sea un email válido
      if (!/.+@.+\..+/.test(abogado_id)) {
        return res.status(400).json({ error: "El abogado_id debe ser un email válido" });
      }

      const absenceData = {
        abogado_id,
        fecha: new Date(fecha),
        tipo,
        motivo,
        documento_respaldo,
      };

      const absence = new Absence(absenceData);
      await absence.save();
      res.status(201).json(absence);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
