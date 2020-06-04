import Axios from "axios";

export const GenerateJWT = (header, claims, key, cb) => {
  Axios.post("/api/GenerateJWT", {
      header, claims, key
  })
  .then(function(res) {
    cb(res);
  })
  .catch(function(err) {
    console.log(err);
})}


export const DecodeJWT = (sJWS, cb) => {

  Axios.post("/api/DecodeJWT", {
    sJWS
  })
  .then(function(res) {
    cb(res);
  })
  .catch(function(err) {
    console.log(`El error es ${err}`);
  });
};

export const ValidateJWT = (j, cb) => {
  
  

  let JWT = j

  Axios.post("api/ValidateJWT", {
      JWT
  })
  .then((res) => {
    cb(res)
  },
  (err) => {
    cb(err)
  }  )
  .catch ((err) => { console.log("MUMUMUUU")}) 
};