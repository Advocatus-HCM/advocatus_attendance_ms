const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AssistanceSchema = new mongoose.Schema({
  abogado_id: {type: String,required: true, match: [/.+@.+\..+/, "Por favor, ingresa un email válido"]},
  fecha: Date,
  entrada: Date,
  salida: Date,
  tardanza: Boolean,
  tipo: String, 
  motivo: String,
});
const Assistance = mongoose.model("attendance", AssistanceSchema);

// 📌 Insertar una asistencia
module.exports = {
  serviceGetAttendence: async (req, res) => {
    try {
      const assistances = await Assistance.find();
      res.json(assistances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  serviceInsertAttendance: async (req, res) => {
    try {
      const assistance = new Assistance(req.body);
      await assistance.save();
      res.status(201).json(assistance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}






