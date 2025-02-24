const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema({
  abogado_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  fecha: { type: Date, required: true },
  tipo: { type: String, enum: ["justificada", "injustificada"], required: true },
  motivo: { type: String },
  documento_respaldo: { type: String },
  validado_por: { type: mongoose.Schema.Types.ObjectId }
});

const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;
