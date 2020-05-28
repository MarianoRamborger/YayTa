const express = require("express");
const morgan = require("morgan")
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js"); //importar solo estas funciones especificas por razones de seguridad.

const app = express();

app.use(express.json()) //middleware, parsea incoming requests con json payloads. Popula un objeto body en la request con la data parseada
app.use(morgan("dev"))

const port = process.env.PORT || 3100;


app.get("/", (req, res) => res.send("Esto es la API."));

//Para cada endpoint, se pasa data de la request. Todas las funciones devuelven un Javascript object, so pueden ser metidas en a json response
app.post("/api/GenerateJWT", (req, res) => { 
    let {header, claims, key } = req.body;
    key = key || "$Clavesupersecreta05" //En caso de que el cliente no mande llaves, usamos una default
    res.json(GenerateJWT(header, claims, key))
 })

app.post("/api/DecodeJWT", (req, res) => {  res.json(DecodeJWT(req.body.sJWS))  })

app.post("/api/ValidateJWT", (req, res) => {
    let { header, token, key } = req.body;
    key = key || "$Clavesupersecreta05"; //idem top
    res.json(ValidateJWT(header, token, key))
 })



app.listen(port, () => console.log(`Escuchando el puerto ${port}!`));

