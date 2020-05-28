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
    console.log(err);
  });
};

export const ValidateJWT = (header, token, key, cb) => {
  Axios.post("api/ValidateJWT", {
      header, token, key
  })
  .then = (function(res) {
      cb(res)
  })
  .catch = (function(err) { console.log(err)})
};