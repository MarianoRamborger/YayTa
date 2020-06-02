const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://yayta:mocasin1@cluster0-gyc6q.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })



async function main(){
  
    try {
        // Connect to the MongoDB cluster
        await client.connect(); //awaits a conectarse..

        // Make the appropriate DB calls

        // Create a single new listing //
     
    }
        
    
    finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
    }

    main().catch(console.error);



    

// Here starts my code.


//CRUD : CREATE
    

//Create new Document
    
    async function createDocument(newListing){    

        let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
        try {
            await newClient.connect()

            const result = await newClient.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
            console.log(`DA NIU AIDI: ${result.insertedId}`);
        }
        catch (err) { console.log(err) }

        finally {
            // Close the connection to the MongoDB cluster
            await newClient.close();
            console.log("connection successfuly closed bby")
        }
    }

  
    // Create Many Documents
    async function createManyDocuments(newDocuments) {
    
        let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
        
        try {
            await newClient.connect()
            const result = await newClient.db("sample_airbnb").collection("listingsAndReviews").insertMany(newDocuments);
            console.log(`${result.insertedCount}`) ; console.log(result.insertedIds)
            }
        catch(err) {console.log(err)}
        finally { closeConnection(newClient) }

    }

//CRUD READ

    async function findOne(targetDB, targetCollection, name) {   
        let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
        
        try {
            await newClient.connect()
            result = await newClient.db(`${targetDB}`).collection(targetCollection)
            .findOne ({ name: name})

            if (result) {console.log(result)}
            else {console.log("not found")}
        }
        catch (err) {console.log(err)} finally { closeConnection(newClient) }  
        
    }

//CRUD READ MULTIPLE

async function findMany(targetDB, targetCollection, targetDoc) {   
    let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
    
    try {
        await newClient.connect()
        const cursor = await newClient.db(`${targetDB}`).collection(targetCollection) // Ojo que lo primero que crea es un cursor
        .find (
            {
                bedrooms: { $gte: targetDoc }, // los $ operator son las condiciones
                bathrooms: { $gte: targetDoc}
            })
                .sort({ last_review: -1})   //Aca a la promesa van los sorts
                .limit(5)   ;           
        if (cursor) { 
            const results = await cursor.toArray()      //Esto es vital
                if (results.length > 0)
            
            results.forEach((results, i) => { 
                date = new Date(results.last_review).toDateString();
                console.log(`${i + 1}. name: ${results.name}. id: ${results._id}. bedrooms: ${results.bedrooms}. bathrooms: ${results.bathrooms}`)
            })
        }
        else {console.log("not found")}
    }
    catch (err) {console.log(err)} finally { closeConnection(newClient) }  
    
}
  

// CRUD UPDATE FILE
async function updateByName(targetDB, targetCollection, name, update){
    let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

    
    try {
        await newClient.connect()
        result = await newClient.db(targetDB).collection(targetCollection)
            .updateOne(                 //updatea el primer match
                {name: name},           //nombre por el que busca
                {$set: update},         // $set actualiza o cambia valores para un campo nuevo o existente en el documento. Cualquier atributo nuevo se va agregar o existente modificar.
                {upsert: true})         // upsert significa que, si está lo updatea, else lo inserta.
                console.log(`${result.matchedCount} document(s) matched the query criteria.`);
                console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
    catch (err) { console.log(err) }
    finally {closeConnection(newClient)}

}

//Update todos con una propiedad

async function updateAllDocumentsWithThisPropertyType (targetDb, targetCollection, targetProperty, update) {
   
    let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await newClient.connect() 
        
        result = await newClient.db(targetDb).collection(targetCollection)
            .updateMany({ targetProperty : {  $exists: false } }, //Updatea la property buscada donde la encuentre. $exists = true se asegura que si el objeto no tiene esa property, la cree
                        { $set: { targetProperty: update }}   //Reemplaza el contente de la property por update
                        )
                        // TO DO VER COMO LOGRAR METER EN targetProperty contenido dinámico
                       
                        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
                        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
    catch (err) { console.log(err) } finally { closeConnection(newClient) }
}

// Delete uno

async function deleteOne (targetDb, targetCollection, name) {
    let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await newClient.connect()
        result= await newClient.db(targetDb).collection(targetCollection)
        .deleteOne({ name: name })

        console.log(`${result.deletedCount} document(s) was/were deleted.`);

        }   
    catch (err) {console.log(err)} finally{closeConnection(newClient)}

}

// Delete todos los anteriores a una fecha.

async function deleteListingsScrapedBeforeDate(client, date) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}



// Otras funciones importantes.

    const getStatus = async () => {
        let newClient = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
        try {
            await newClient.connect() 

                const adminDb = newClient.db("dbName").admin();

                adminDb.serverStatus()
                
          
                adminDb.serverStatus(function(err, status) {
                    console.log( status.connections)
                    newClient.close();
                });

        }
        catch (err) { console.log(err)} 
    }


    

const closeConnection = async (client) => {
    await client.close()
    console.log("Connection closed")
}




  module.exports = {
      main ,
    //  listDatabases, 
     createManyDocuments,
     createDocument,
     getStatus,
     findOne,
     findMany,
     updateByName,
     updateAllDocumentsWithThisPropertyType,
     deleteOne,
     
    }
  
  

 //https://developer.mongodb.com/quickstart/node-crud-tutorial#node-tutorial-read