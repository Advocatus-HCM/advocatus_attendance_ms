const reportSchema = new mongoose.Schema({
    abogado_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    tipo: { type: String, enum: ["reporte_mensual"], required: true },
    rango_fechas: {
      inicio: { type: Date, required: true },
      fin: { type: Date, required: true }
    },
    detalle_asistencias: [
      {
        fecha: { type: Date, required: true },
        entrada: { type: Date, required: true },
        salida: { type: Date, required: true },
        tardanza: { type: Boolean, required: true },
        tipo: { type: String, required: true }
      }
    ],
    total_inasistencias: { type: Number, required: true },
    total_tardanzas: { type: Number, required: true },
    total_horas_trabajadas: { type: Number, required: true }
  });
  
  const Report = mongoose.model("Report", reportSchema);
  
  module.exports = Report;
  