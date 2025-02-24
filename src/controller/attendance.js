const assistanceSchema = new mongoose.Schema({
    abogado_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    fecha: { type: Date, required: true },
    entrada: { type: Date, required: true },
    salida: { type: Date, required: true },
    tardanza: { type: Boolean, required: true },
    horas_trabajadas: { type: Number, required: true },
    tipo: { 
      type: String, 
      enum: ["presencial", "remoto", "vacaciones", "permiso", "inasistencia"], 
      required: true 
    },
    motivo: { type: String },
    validado_por: { type: mongoose.Schema.Types.ObjectId }
  });
  
  const Assistance = mongoose.model("Assistance", assistanceSchema);
  
  module.exports = Assistance;
  