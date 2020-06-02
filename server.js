const express = require("express");
const morgan = require("morgan")
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js"); //importar solo estas funciones especificas por razones de seguridad.
const Users = require('./tempDB.js')

const Main = require('./mdb')

const app = express();

app.use(express.json()) //middleware, parsea incoming requests con json payloads. Popula un objeto body en la request con la data parseada
app.use(morgan("dev"))

const port = process.env.PORT || 3100;



app.get("/", (req, res) => res.send("Esto es la API."));

app.get("/createuser", (req, res) => res.send("iser"));




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

 app.post("/api/users/signin", (req, res) => {
    const { Username, Password } = req.body
    
  if (typeof Users[req.body.Username] !== "undefined") {    
    if (Users[req.body.Username] === req.body.Password) { //Esto solo es posible porque en la fakeDB los users son keys y los passwords son value
      
        const header = { alg: "HS512", typ: "JWT"}
        const claims = { Username }
        const key = "$Clavesupersecreta05"

        res.json({ 
            Message: "Logueado exitoso",
            JWT: GenerateJWT(header, claims, key)
        });


    } else {
  
      res.status(403).json({
        Message: "Invalid Username or Password!"
      });
    }
  } else {
   
    res.status(403).json({
      Message: "User Not Found!"
    });
  }
});


app.post("/api/items/createitem", async (req, res) => {

  try {
    Main.createDocument (
      { name: "Cozy",  summary: "A new summary", bedrooms: 1, bathrooms: 1 }) ; return res.status(200).send()  }
  catch(err) { return res.status(500).send();
 } } )

app.post("/api/items/createmany", async (req, res) => {
  try {
    Main.createManyDocuments( [{
      name: "Infinite Views", summary: "Modern home with infinite views from the infinity pool", property_type: "House", bedrooms: 5, bathrooms: 4.5, beds: 5 },
      {    name: "Private room in London", property_type: "Apartment", bedrooms: 1, bathroom: 1},
  ])
    res.status(200).send()
  }
  catch {res.status(500).send()}
})

app.get("/api/dbstatus", async (req, res) => {
  try { Main.getStatus(); res.status(200).send() } catch { res.status(500).send()} 
  
})

app.get("/api/items/findone", async (req, res) => {
  let { targetDb, targetCollection, name } = req.body

  try {
    Main.findOne(targetDb, targetCollection, name) ; res.status(200).send()
  }
   catch { res.status(404).send()}
})

app.get("/api/items/findmany", async (req, res) => {
  let { targetDb, targetCollection, targetDoc } = req.body

  try {
    Main.findMany(targetDb, targetCollection, targetDoc) ; res.status(200).send()
  }
   catch { res.status(500).send()}
})

app.put("/api/items/update" , async (req, res) => {
  let {targetDb, targetCollection, name, update} = req.body

  try { Main.updateByName
    (targetDb, targetCollection, name, update)  ; res.status(200).send()}

  catch {res.status(500).send()}

})

app.put("/api/items/updateallwithproperty", async (req, res) => {
  let {targetDb, targetCollection, targetProperty, update} = req.body

  try { Main.updateAllDocumentsWithThisPropertyType(targetDb, targetCollection, targetProperty, update) ; res.status(200).send() }
  catch {res.status(500).send()}
})

app.delete("/api/items/deleteone", async (req, res) => {
  const {targetDb, targetCollection, name} = req.body

  try {
    Main.deleteOne(targetDb, targetCollection, name) ; res.status(200).send() ;
  }
  catch { res.status(500).send()}

})


app.listen(port, () => console.log(`Escuchando el puerto ${port}!`));

