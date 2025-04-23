const express = require("express");
const app = express(); // Inicializar servidor
const port = 3000;

//Rutas
const entriesRoutes = require("./routes/entries.routes")
const authorsRoutes = require("./routes/authors.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

//API rutas a ejecutar --------------
app.use('/api/entries',entriesRoutes);
app.use('/api/authors',authorsRoutes);

//Levanto Servidor 
app.listen(port, () => {
  console.log('Iniciando servidor');
});
