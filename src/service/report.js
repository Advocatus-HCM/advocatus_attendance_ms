const express = require("express");
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  abogado_id: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Por favor, ingresa un email válido"] // Validación de email
  },
  tipo: String, 
  rango_fechas: {
    inicio: Date,
    fin: Date,
  },
  total_inasistencias: Number,
  total_tardanzas: Number,
});


module.exports = {
  serviceGetReports: async (req, res) => {
    try {
      const { abogado_id, fecha_inicio, fecha_fin } = req.query;

      if (!abogado_id || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: "Faltan parámetros requeridos" });
      }

      console.log("Datos recibidos:", { abogado_id, fecha_inicio, fecha_fin });

      const inicio = new Date(fecha_inicio);
      const fin = new Date(fecha_fin);

      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        return res.status(400).json({ error: "Fechas inválidas" });
      }

      const db = mongoose.connection.db;

      // Contar inasistencias en la colección "absences"
      const total_inasistencias = await db.collection("absences").countDocuments({
        abogado_id,
        fecha: { $gte: inicio, $lte: fin }
      });

      // Contar asistencias en la colección "attendances"
      const total_asistencias = await db.collection("attendances").countDocuments({
        abogado_id,
        fecha: { $gte: inicio, $lte: fin }
      });

      res.json({
        abogado_id,
        total_asistencias,
        total_inasistencias
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: error.message });
    }
  }
}


