//importación de los módulos
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const cors = require("cors");

//Levantar un servidor local usando Express Js (tiene un puerto alternativo)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(cors());

app.use(express.json());

//Devolver una página web como respuesta a una consulta GET
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
//Ofrecer diferentes rutas con diferentes métodos HTTP que permitan las operaciones CRUD de datos alojados en un archivo JSON local
//Manipular los parámetros obtenidos en la URL
app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("data/repertorio.json"));
  res.json(canciones);
});
app.post("/canciones", (req, res) => {
  const cancion = req.body;

  const canciones = JSON.parse(fs.readFileSync("data/repertorio.json"));

  canciones.push(cancion);

  fs.writeFileSync("data/repertorio.json", JSON.stringify(canciones));

  res.send("Cancion agregada al repertorio!");
});
//Manipular el payload de una consulta HTTP al servidor
app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("data/repertorio.json"));
  const index = canciones.findIndex((c) => c.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("data/repertorio.json", JSON.stringify(canciones));
  res.send("Canción modificada exitosamente");
});
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("data/repertorio.json"));
  const index = canciones.findIndex((c) => c.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("data/repertorio.json", JSON.stringify(canciones));
  res.send("Canción eliminada con éxito");
});
