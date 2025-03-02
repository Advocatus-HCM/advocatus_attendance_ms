const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema({
  abogado_id: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Solo validar como email si el documento es nuevo
        return this.isNew ? /.+@.+\..+/.test(value) : true;
      },
      message: "Por favor, ingresa un email válido"
    }
  },
  fecha: { type: Date, required: true },
  tipo: { type: String, required: true },
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
        const { _id } = req.body; // Ahora recibimos el _id de la ausencia

        if (!_id) {
            return res.status(400).json({ error: "Falta el _id de la ausencia" });
        }

        // Convertir _id a ObjectId
        const objectId = new mongoose.Types.ObjectId(_id);

        // Eliminar la ausencia con ese _id
        const deletedAbsence = await Absence.findOneAndDelete({ _id: objectId });

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
    const { _id, ...updateData } = req.body; // Obtener _id y los datos a actualizar

    if (!_id) {
      return res.status(400).json({ error: "Falta el _id de la ausencia" });
    }

    // Convertir _id a ObjectId
    const objectId = new mongoose.Types.ObjectId(_id);

    if (updateData.fecha) {
      updateData.fecha = new Date(updateData.fecha);
    }

    // Buscar por _id y actualizar la ausencia
    const updatedAbsence = await Absence.findOneAndUpdate(
      { _id: objectId }, 
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
