// Hola! No se si la tecnología JWT vaya a seguir siendo usada cuando (y si) alguien más ve este código. Por si acaso, voy a dejar anotaciones. Espero sean utiles.
const JSRSASign = require("jsrsasign"); // para los JWT. Compuesto de Header, Payload y Signature.

//JWT SECTION//
//el Payload de JWT suele llamarse Claims so..
// const claims = {
//     Username: "guest",
//     age: 27,
//     FullName: "guest"
// }
// const key = "$supersecretclave05" ; const header = { alg: "HS512", type: "JWT" }
// var sHeader = JSON.stringify(header) ; var sPayload = JSON.stringify(claims) //Remember de stringificar header y payload.

// const sJWT = token = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);
// // Hasta acá tenemos el JWT token, falta validarlo para asegurar que no haya sido tampereado with (nunca client-side):
// console.log(JSRSASign.jws.JWS.verifyJWT(token, key, {alg: [header.alg]})) //la sintaxis del verificador toma un objeto en alg, porque puede iterar por distintos algoritmos para verificar.

// //Como JWT es un string, para decodificarlo hay que pasar el algoritmo (1ra parte) y el payload (2da parte)

// const aJWT = token.split(".")
// const uHeader = JSRSASign.b64utos(aJWT[0]) ; const uClaim = JSRSASign.b64utos(aJWT[1]) //la u es porque todavia son untrusted. b64utos los convierte en string.
// const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader); const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim); //p de parseados.

//JWT SECTION//

//toma los parametros, stringifea y firma con la llave.
const GenerateJWT = (header, claims, key) => { 
    const sHeader = JSON.stringify(header);  const sPayload = JSON.stringify(claims);
    const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);
    return sJWT
}

//Splitea el en sus partes, las parsea, devuelve el payload
const DecodeJWT = (sJWS) => {
    const aJWT = sJWS.split(".")
    const uHeader = JSRSASign.b64utos(aJWT[0]) ; const uClaim = JSRSASign.b64utos(aJWT[1]); const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader) ; const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);
    return pClaim
 }

 // Valida el JWT, para asegurarse que no haya sido tampereado.
const ValidateJWT = (header, token, key) => { 
    return JSRSASign.jws.JWS.verifyJWT(token, key, header)
}

module.exports = {
    GenerateJWT,
    DecodeJWT,
    ValidateJWT
}
