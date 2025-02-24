require("dotenv").config({ path: "../.env" }); // Ajusta la ruta al nivel correcto
process.loadEnvFile()
console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI); // Depuración


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes.js")



const app = express();
const PORT = process.env.PORT || 8003;


app.use(cors({ origin: true }));
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor conectado a MongoDB Atlas!");
});

app.use(routes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

